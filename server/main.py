from flask import Flask, render_template, request, json, jsonify, session, redirect
import pandas as pd
import kml2geojson
import datetime
#import utilities_functions as uf
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, template_folder='',static_folder='',static_url_path='')

last_node = 0

# commented by security
"""@app.route('/api/signup',methods=['POST'])
def signUp():
    # read the posted values from the UI
    _name = request.form['inputName']
    _email = request.form['inputEmail']
    _password = request.form['inputPassword']
    # connect to mysql
    conn = mysql.connect()
    cursor = conn.cursor()
    # validate the received values
    if _name and _email and _password:
        _hashed_password = generate_password_hash(_password)
        cursor.callproc('sp_createUser',(_name,_email,_hashed_password))
        data = cursor.fetchall()
        if len(data) == 0:
            conn.commit()
            return json.dumps({'message':'User created successfully !'})
        else:
            return json.dumps({'error':str(data[0])})
    else:
        return json.dumps({'html':'<span>Enter the required fields</span>'})
"""
@app.route('/api/v1/piezometer_readings_<node>_<ch>_<t>')
def piezometer_readings(node,ch,t):
    #if session.get('user'):
        #_title = request.form('')
    data = pd.read_csv("download/node_"+str(node)+"_"+str(ch)+".csv",)
    cutoff_date = data["TIMESTAMP"].iloc[-1] - pd.Timedelta(days=int(t))
    data = data[data['TIMESTAMP'] > cutoff_date]
    last_node = node
    print(last_node)
    print(data)
    data = jsonify(data)
    #else:
    #    return render_template('error.html', error = 'Unauthorized Access')

@app.route('/api/v1/piezometer_elements<tp>')
def piezometer_elements(tp):
    #if session.get('user'):
        #_title = request.form('')
    data = pd.read_csv("data/piezometer_coordinates.csv")
    data = data[['paddock','id','depth','lat','lon','status']]
    if tp!='0':
        data = data[ (data['status']==int(tp))]
    return data.reset_index().to_json()

@app.route('/api/v1/piezometer_status')
def piezometer_status():
    st = []
    data = pd.read_csv('data/piezometer_coordinates.csv')
    data = data['status']
    for i in range(3):
        val = data[data==i+1].count()
        st.append(val)
    st = pd.DataFrame(st)
    return st.to_json()

"""@app.route('/api/validateLogin',methods=['POST'])
def validateLogin():
    try:
        _username = request.form['inputEmail']
        _password = request.form['inputPassword']
        # connect to mysql
        con = mysql.connect()
        cursor = con.cursor()
        cursor.callproc('sp_validateLogin',(_username,))
        data = cursor.fetchall()
        if len(data) > 0:
            if check_password_hash(str(data[0][3]),_password):
                session['user'] = data[0][0]
                return redirect('/userhome')
            else:
                return render_template('error.html',error = 'Wrong Email address or Password')
        else:
            return render_template('error.html',error = 'Wrong Email address or Password')
    except Exception as e:
        return render_template('error.html',error = str(e))
    finally:
        cursor.close()
        con.close()"""

####
# conectors to webpages

# commented by security
"""@app.route('/signup')
def signup():
    return render_template('signup.html')
"""

@app.route('/api/v1/get_geojson', methods=['GET'])
def get_geojson():
    data = kml2geojson.main.convert('./rossing_sbadminweb/data/sections.kml')
    return jsonify(data)

@app.route('/userhome')
def userHome():
    if session.get('user'):
        return render_template('userhome.html')
    else:
        return render_template('error.html', error = 'Unauthorized Access')

@app.route("/findings")
def finding():
    if session.get('user'):
        return render_template('findings.html')
    else:
        return render_template('error.html', error = 'Unauthorized Access')

@app.route("/map")
def map():
    if session.get('user'):
        return render_template('map.html')
    else:
        return render_template('error.html', error = 'Unauthorized Access')

@app.route('/signin')
def showSignin():
    return render_template('signin.html')

@app.route('/logout')
def logout():
    session.pop('user',None)
    return redirect('/')

@app.route("/")
def main():
    print("Running")
    return render_template('index.html')