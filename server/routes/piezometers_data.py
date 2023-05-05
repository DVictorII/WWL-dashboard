from flask import Blueprint, jsonify
from flask_cors import  cross_origin
from app import  db, dict_helper
from datetime import datetime, timedelta, date
from sqlalchemy import text
import kml2geojson

piezometers_data_routes = Blueprint('piezometers_data_routes', __name__)


class piezometer_details(db.Model):

    __tablename__ = 'piezometer_details'

    id = db.Column(db.String(length=50), primary_key=True) 
    paddock = db.Column(db.String(length=50))
    section = db.Column(db.String(length=50))
    cptu = db.Column(db.String(length=50))

    datalogger = db.Column(db.Integer())
    channel = db.Column(db.Integer())
    serial = db.Column(db.BigInteger())
    depth = db.Column(db.Numeric(10,5))
    lat = db.Column(db.Numeric(20,14))
    lon = db.Column(db.Numeric(20,14))
    status = db.Column(db.Integer(),nullable=False)
   
    def obj_to_dict(self):
        return {"id":self.id,
        "paddock":self.paddock,
        "section":self.section,
        "cptu":self.cptu,
        "datalogger":self.datalogger,
        "channel":self.channel,
        "serial":self.serial,
        "depth":self.depth,
        "lat":self.lat,
        "lon":self.lon,
        "status":self.status
        }
    
    # def __repr__(self):
    #     return f'Item {self.name}'

class Last_readings(db.Model):

    __tablename__ = 'last_readings'

    node = db.Column(db.Integer(), primary_key=True) 
    channel = db.Column(db.Integer(), primary_key=True)
    time = db.Column(db.DateTime())

    pressure = db.Column(db.Numeric(12,6))
    temperature = db.Column(db.Numeric(12,6))
    
    def obj_to_dict(self):
        return {"node":self.node,
        "channel":self.channel,
        "time":self.time,
        "pressure":self.pressure,
        "temperature":self.temperature,
        }
    
    # def __repr__(self):
    #     return f'Item {self.name}'


@piezometers_data_routes.route('/api/v1/piezometers-data', methods=['GET'])
@cross_origin()
def get_piezometers_data():
    users=[]
    
    result = piezometer_details.query.all()
    
    
    piezos = dict_helper(result)
    

    
    return jsonify({
        "message":"success",
        "results": len(piezos),
        "piezos": piezos
    })

@piezometers_data_routes.route('/api/v1/last-readings', methods=['GET'])
@cross_origin()
def get_last_readings():
    users=[]
    
    result = Last_readings.query.all()
    
    readings = dict_helper(result)
    

    
    return jsonify({
        "message":"success",
        "results": len(readings),
        "readings": readings
    })

@piezometers_data_routes.route('/api/v1/piezometers-data/<paddock>/<piezo>', methods=['GET'])
@cross_origin()
def getOnePiezoInfo(paddock,piezo):
    users=[]
    fixed_paddock = paddock

    if paddock == 'E1-E2':
        fixed_paddock = 'E1/E2'
    elif paddock == 'Y1-Y2':
        fixed_paddock = 'Y1/Y2'
    else:
        fixed_paddock = paddock
    
    
    result = piezometer_details.query.filter_by(paddock=fixed_paddock,id=piezo).all()
    
    
    piezos = dict_helper(result)
    

    
    return jsonify({
        "message":"success",
        "piezos":piezos       
    })



# GET THE LECTURES OF A GIVEN PIEZOMETER IN AN INTERVAL OF DAYS
@piezometers_data_routes.route('/api/v1/lectures/<node>/<daysAgo>', methods=['GET'])
@cross_origin()
def getLectures(node,daysAgo):
    d = datetime.today() - timedelta(days=int(daysAgo))
    date = d.strftime("%Y-%m-%d 00:00:00")
    # connection = db.session.connection()
    result = db.session.execute(text(f"SELECT time,pressure FROM public.{node} WHERE time >= '{date}'"))
    

    lectures = [dict(r._mapping) for r in result]

    return jsonify({"message":"success","lectures":lectures})


@piezometers_data_routes.route('/api/v1/get_geojson_<folder>-<name>', methods=['GET'])
def get_geojson(folder,name):
    
        name = 'data/'+folder+'/'+name.upper()+'.kml'
        data = kml2geojson.main.convert(name)
        return jsonify(data)
    # else:
    #     return render_template('no_authorized.html')
