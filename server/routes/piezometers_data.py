from flask import Blueprint, jsonify
from flask_cors import cross_origin
from app import db, dict_helper
from datetime import datetime, timedelta, date
from sqlalchemy import text
import kml2geojson
import os
import routes.wwl_functions as wwl

piezometers_data_routes = Blueprint("piezometers_data_routes", __name__)


class piezometer_details(db.Model):
    __tablename__ = "piezometer_details"

    id = db.Column(db.String(length=50), primary_key=True)
    paddock = db.Column(db.String(length=50))
    section = db.Column(db.String(length=50))
    cptu = db.Column(db.String(length=50))

    datalogger = db.Column(db.Integer())
    channel = db.Column(db.Integer())
    serial = db.Column(db.BigInteger())
    depth = db.Column(db.Numeric(10, 5))
    lat = db.Column(db.Numeric(20, 14))
    lon = db.Column(db.Numeric(20, 14))
    status = db.Column(db.Integer(), nullable=False)


    east_utm = db.Column(db.Numeric(12,3))
    north_utm = db.Column(db.Numeric(12,3))
    elevation = db.Column(db.Numeric(10,3))
    initial_depth = db.Column(db.Numeric(10,5))
    tarps_value = db.Column(db.Numeric(12,6))
    time_threshold_wrong = db.Column(db.String(length=50))

    def obj_to_dict(self):
        return {
            "id": self.id,
            "paddock": self.paddock,
            "section": self.section,
            "cptu": self.cptu,
            "datalogger": self.datalogger,
            "channel": self.channel,
            "serial": self.serial,
            "depth": self.depth,
            "lat": self.lat,
            "lon": self.lon,
            "status": self.status,

            "east_utm": self.east_utm,
            "north_utm": self.north_utm,
            "elevation": self.elevation,
            "initial_depth": self.initial_depth,
            "tarps_value": self.tarps_value,
            "time_threshold_wrong": self.time_threshold_wrong,
        }

    # def __repr__(self):
    #     return f'Item {self.name}'


class Last_readings(db.Model):
    __tablename__ = "last_readings"

    node = db.Column(db.Integer(), primary_key=True)
    channel = db.Column(db.Integer(), primary_key=True)
    time = db.Column(db.DateTime())

    pressure = db.Column(db.Numeric(12, 6))
    temperature = db.Column(db.Numeric(12, 6))

    def obj_to_dict(self):
        return {
            "node": self.node,
            "channel": self.channel,
            "time": self.time,
            "pressure": self.pressure,
            "temperature": self.temperature,
        }

    # def __repr__(self):
    #     return f'Item {self.name}'


@piezometers_data_routes.route("/api/v1/piezometers-data", methods=["GET"])
@cross_origin()
def get_piezometers_data():
    users = []

    result = piezometer_details.query.all()

    piezos = dict_helper(result)

    return jsonify(
        {
            "message": "success",
            "results": len(piezos),
            "grret": "Hello!",
            "piezos": piezos,
        }
    )


@piezometers_data_routes.route("/api/v1/last-readings", methods=["GET"])
@cross_origin()
def get_last_readings():
    users = []

    result = Last_readings.query.all()

    readings = dict_helper(result)

    return jsonify(
        {"message": "success", "results": len(readings), "readings": readings}
    )


@piezometers_data_routes.route(
    "/api/v1/piezometers-data/<paddock>/<piezo>", methods=["GET"]
)
@cross_origin()
def getOnePiezoInfo(paddock, piezo):
    users = []
    fixed_paddock = paddock

    if paddock == "E1-E2":
        fixed_paddock = "E1/E2"
    elif paddock == "Y1-Y2":
        fixed_paddock = "Y1/Y2"
    else:
        fixed_paddock = paddock

    result = piezometer_details.query.filter_by(paddock=fixed_paddock, id=piezo).all()

    piezos = dict_helper(result)

    return jsonify({"message": "success", "piezos": piezos})


# GET THE LECTURES OF A GIVEN PIEZOMETER IN AN INTERVAL OF DAYS
@piezometers_data_routes.route("/api/v1/lectures/<node>/<daysAgo>", methods=["GET"])
@cross_origin()
def getLectures(node, daysAgo):
    d = datetime.today() - timedelta(days=int(daysAgo))
    date = d.strftime("%Y-%m-%d 00:00:00")
    # connection = db.session.connection()
    result = db.session.execute(
        text(f"SELECT time,pressure FROM public.{node} WHERE time >= '{date}'")
    )

    lectures = [dict(r._mapping) for r in result]

    return jsonify({"message": "success", "lectures": lectures})


@piezometers_data_routes.route("/api/v1/get_geojson_<folder>-<name>", methods=["GET"])
@cross_origin()
def get_geojson(folder, name):
    try:
        name = "data/" + folder + "/" + name.upper() + ".kml"
        data = kml2geojson.main.convert(name)
        # print(data)
        return jsonify({"data": data, "name": name})

    except Exception:
        return jsonify({"error": Exception})

    # else:
    #     return render_template('no_authorized.html')


@piezometers_data_routes.route("/api/v1/get_graphics_<node>-<channel>", methods=["GET"])
@cross_origin()
def get_graphics(node, channel):
    try:
        natural_ground = "data/sections/natural_ground/"
        new_ground = "data/sections/new_ground/"

        pizometers, levels = wwl.get_data_by_section(
            node, channel, natural_ground, new_ground
        )

        return jsonify({"data": pizometers, "name": levels})

    except Exception:
        return jsonify({"error": Exception})


@piezometers_data_routes.route("/api/v1/get_finance_stocks_<company>-<interval>", methods=["GET"])
@cross_origin()
def get_stock(company, interval):
    try:
        folder = "data/Finance/"
        #example company_stock = wwl.stock_data("601985.SS",7)
        company_stock = wwl.stock_data(company,interval)
        data, history = company_stock.load_stock_data('./Finance')

        return jsonify({"data": data, "hist": history})

    except Exception:
        return jsonify({"error": Exception})

@piezometers_data_routes.route("/api/v1/get_finance_currency_<currency>", methods=["GET"])
@cross_origin()
def get_currency(currency):
    try:
        folder = "data/Finance/"
        #example: wwl.currency_data('uranium')
        spec_currency = wwl.currency_data(currency)
        data = spec_currency.load_currency('./Finance')

        return jsonify({"data": data})

    except Exception:
        return jsonify({"error": Exception})

