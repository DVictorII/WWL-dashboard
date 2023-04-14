from flask import Flask, render_template, request, json, jsonify, session, redirect
from flaskext.mysql import MySQL
import utilities_functions as uf
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, template_folder='',static_folder='',static_url_path='')

mysql = MySQL()
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'admin'
app.config['MYSQL_DATABASE_PASSWORD'] = 'WWL#2022'
app.config['MYSQL_DATABASE_DB'] = 'ROSSING'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

#uf.download_data(21545,6,2022,option=1)
for m in range(1,6):
    uf.get_data_from_server(mysql,2022,m,option=0)
for m in range(1,13):
    uf.get_data_from_server(mysql,2021,m,option=0)
for m in range(8,13):
    uf.get_data_from_server(mysql,2020,m,option=0)
