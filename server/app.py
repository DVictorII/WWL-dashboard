from flask import Flask, json
from flask_session import Session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import psycopg2
from datetime import timedelta
import os
from werkzeug.exceptions import HTTPException

os.environ["OPENBLAS_NUM_THREADS"] = "1"


def dict_helper(objlist):
    result2 = [item.obj_to_dict() for item in objlist]
    return result2


app = Flask(__name__, static_url_path="", static_folder="", template_folder="")


app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://WWL_ADMIN:WWL#2023@wwl-rossing.crnkanilun4m.ap-southeast-2.rds.amazonaws.com/wwlengineering_rossing"
app.config["SECRET_KEY"] = "SUPERSECRETWWLKEY"
app.config["SESSION_SECRET"] = "SUPERSECRETWWLKEY"
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True

app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=20)
app.config["SESSION_COOKIE_NAME"] = "user_id"
db = SQLAlchemy(app)


app.secret_key = app.config["SESSION_SECRET"]
# ma = Marshmallow(app)


Session(app)
CORS(app)

# app.config.from_pyfile('config.cfg')

BASEPATH = os.getcwd()

dbname = "wwlengineering_rossing"
user = "WWL_ADMIN"
password = "WWL#2023"
host = "wwl-rossing.crnkanilun4m.ap-southeast-2.rds.amazonaws.com"
dev = True


def dbconnect():
    conn = psycopg2.connect(host=host, database=dbname, user=user, password=password)
    return conn


from routes.excel import excel_routes

app.register_blueprint(excel_routes)

from routes.piezometers_data import piezometers_data_routes

app.register_blueprint(piezometers_data_routes)

from routes.pdf_report import pdf_report_routes

app.register_blueprint(pdf_report_routes)

from routes.auth import auth_routes

app.register_blueprint(auth_routes)

from routes.reports import reports_routes

app.register_blueprint(reports_routes)

from routes.section_chart import section_chart_routes

app.register_blueprint(section_chart_routes)


@app.errorhandler(HTTPException)
def handle_exception(e):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps(
        {
            "code": e.code,
            "name": e.name,
            "description": e.description,
        }
    )
    response.content_type = "application/json"
    return response
