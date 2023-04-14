from flask import Flask, request, jsonify, send_from_directory

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from datetime import datetime, timedelta


from flask_cors import CORS, cross_origin
import kml2geojson
import os
from werkzeug.utils import secure_filename
from uuid import uuid4

app = Flask(__name__)


CORS(app)

@app.route("/api/v1/login", methods=["POST"])
@cross_origin()
def login_user():
    

    attemptedUsername = request.json["username"]
    attemptedPassword = request.json["password"]

    return jsonify({'message':"success",'username':attemptedUsername,'password':attemptedPassword})


@app.route('/api/v1/piezometers-data/<paddock>/<piezo>', methods=['GET'])
@cross_origin()
def getOnePiezoInfo(paddock,piezo):
    # users=[]
    
    # result = piezometer_details.query.filter_by(paddock=paddock,id=piezo).all()
    
    
    # piezos = dict_helper(result)
    
    return jsonify({
        "message":"success",
        "piezos":[{"channel":1,"cptu":"CPT18-30","datalogger":10230,"depth":"20.00000","id":"VW-CD3-06","lat":"-22.45815573000000","lon":"15.02184437000000","paddock":"CDIII","section":"Section-2","serial":1833531,"status":1}] ,   
        "paddock":paddock,
        "piezo":piezo
    })

@app.route('/api/v1/lectures/<node>/<daysAgo>', methods=['GET'])
@cross_origin()
def getuwuLectures(node,daysAgo):
    # d = datetime.today() - timedelta(days=int(daysAgo))
    # date = d.strftime("%Y-%m-%d 00:00:00")
    # # connection = db.session.connection()
    # result = db.session.execute(text(f"SELECT time,'pressure' FROM public.{node} WHERE time >= '{date}'"))
    # print(result)

    # lectures = [dict(r._mapping) for r in result]

    return jsonify({"message":"success","lectures":[
  
  { 'pressure': "52.405497", 'time': "Tue, 07 Feb 2023 14:00:00 GMT" },
  { 'pressure': "52.594272", 'time': "Tue, 07 Feb 2023 18:00:00 GMT" },
  { 'pressure': "52.405463", 'time': "Tue, 07 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.594284", 'time': "Thu, 09 Feb 2023 14:00:00 GMT" },
  { 'pressure': "52.405478", 'time': "Thu, 09 Feb 2023 18:00:00 GMT" },
  { 'pressure': "52.405454", 'time': "Thu, 09 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.405468", 'time': "Fri, 10 Feb 2023 02:00:00 GMT" },
  { 'pressure': "52.216697", 'time': "Fri, 10 Feb 2023 14:00:00 GMT" },
  { 'pressure': "52.216685", 'time': "Fri, 10 Feb 2023 18:00:00 GMT" },
  { 'pressure': "52.216655", 'time': "Fri, 10 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.216671", 'time': "Sat, 11 Feb 2023 02:00:00 GMT" },
  { 'pressure': "52.405462", 'time': "Sat, 11 Feb 2023 10:00:00 GMT" },
  { 'pressure': "52.216680", 'time': "Sat, 11 Feb 2023 14:00:00 GMT" },
  { 'pressure': "52.216653", 'time': "Sat, 11 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.405464", 'time': "Sun, 12 Feb 2023 10:00:00 GMT" },
  { 'pressure': "52.216679", 'time': "Sun, 12 Feb 2023 18:00:00 GMT" },
  { 'pressure': "52.405459", 'time': "Sun, 12 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.594257", 'time': "Mon, 13 Feb 2023 02:00:00 GMT" },
  { 'pressure': "52.026283", 'time': "Mon, 13 Feb 2023 10:00:00 GMT" },
  { 'pressure': "52.405481", 'time': "Mon, 13 Feb 2023 14:00:00 GMT" },
  { 'pressure': "52.405494", 'time': "Mon, 13 Feb 2023 18:00:00 GMT" },
  { 'pressure': "52.026275", 'time': "Mon, 13 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.405470", 'time': "Tue, 14 Feb 2023 02:00:00 GMT" },
  { 'pressure': "52.216671", 'time': "Tue, 14 Feb 2023 06:00:00 GMT" },
  { 'pressure': "52.216672", 'time': "Tue, 14 Feb 2023 10:00:00 GMT" },
  { 'pressure': "52.216696", 'time': "Tue, 14 Feb 2023 14:00:00 GMT" },
  { 'pressure': "52.026304", 'time': "Tue, 14 Feb 2023 18:00:00 GMT" },
  { 'pressure': "52.216657", 'time': "Tue, 14 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.216694", 'time': "Wed, 15 Feb 2023 06:00:00 GMT" },
  { 'pressure': "52.026289", 'time': "Wed, 15 Feb 2023 18:00:00 GMT" },
  { 'pressure': "51.648633", 'time': "Wed, 15 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.026280", 'time': "Thu, 16 Feb 2023 02:00:00 GMT" },
  { 'pressure': "52.026280", 'time': "Thu, 16 Feb 2023 06:00:00 GMT" },
  { 'pressure': "52.026281", 'time': "Thu, 16 Feb 2023 14:00:00 GMT" },
  { 'pressure': "51.837468", 'time': "Thu, 16 Feb 2023 18:00:00 GMT" },
  { 'pressure': "52.026274", 'time': "Thu, 16 Feb 2023 22:00:00 GMT" },
  { 'pressure': "51.837450", 'time': "Fri, 17 Feb 2023 02:00:00 GMT" },
  { 'pressure': "52.216672", 'time': "Fri, 17 Feb 2023 10:00:00 GMT" },
  { 'pressure': "52.216676", 'time': "Fri, 17 Feb 2023 14:00:00 GMT" },
  { 'pressure': "52.026278", 'time': "Fri, 17 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.026263", 'time': "Sat, 18 Feb 2023 02:00:00 GMT" },
  { 'pressure': "51.837467", 'time': "Sat, 18 Feb 2023 06:00:00 GMT" },
  { 'pressure': "52.216663", 'time': "Sat, 18 Feb 2023 10:00:00 GMT" },
  { 'pressure': "52.216671", 'time': "Sat, 18 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.026278", 'time': "Sun, 19 Feb 2023 02:00:00 GMT" },
  { 'pressure': "51.837466", 'time': "Sun, 19 Feb 2023 06:00:00 GMT" },
  { 'pressure': "52.216672", 'time': "Sun, 19 Feb 2023 10:00:00 GMT" },
  { 'pressure': "51.837472", 'time': "Sun, 19 Feb 2023 14:00:00 GMT" },
  { 'pressure': "52.026291", 'time': "Sun, 19 Feb 2023 18:00:00 GMT" },
  { 'pressure': "52.026278", 'time': "Sun, 19 Feb 2023 22:00:00 GMT" },
  { 'pressure': "52.216650", 'time': "Mon, 20 Feb 2023 02:00:00 GMT" },
  { 'pressure': "51.837464", 'time': "Mon, 20 Feb 2023 06:00:00 GMT" },
  { 'pressure': "51.648613", 'time': "Mon, 20 Feb 2023 10:00:00 GMT" },
],
    "node":node,
    "days":daysAgo
})

def upload_photo():
    file = request.files['photo']
    print(file)
    print("name",file.filename)
    if file.filename == "":
        return jsonify({"error":"bad"})

    filename = secure_filename(file.filename)
    new_filename = os.path.join("src/assets",f'{uuid4()}-{filename}')
    file.save(new_filename)
    return new_filename

@app.route('/api/v1/new-incident-report', methods=['POST'])
@cross_origin()
def new_incident_report():
    
    photo_db = upload_photo()

    return jsonify({"success":"photo uploaded"})

    

@app.route('/api/v1/get_geojson_<folder>-<name>')
@cross_origin()
def get_geojson(folder,name):
    upper = name.upper()
    url = f'backend/src/data/{folder}/{upper}.kml'
    data = kml2geojson.main.convert(url)
    return jsonify(data)



if __name__ == '__main__':
    app.run(debug=True)

