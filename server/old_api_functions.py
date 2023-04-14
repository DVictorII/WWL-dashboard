# STILL USEFUL

# @app.route('/api/report/modify_excel')
# def modify_excel():
#     now = datetime.now()
#     dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
#     data = ef.read_excel()
#     print("report download by %s at %s"%(session.get('user'),dt_string))
#     return jsonify('nothing')



# @app.route('/api/v1/piezometer_readings_<node>_<ch>_<t>')
# def piezometer_readings(node,ch,t):
#     #if session.get('user'):
#         #_title = request.form('')
#     con = dbconnect()
#     cursor = con.cursor()
#     query = "SELECT time,pressure,temperature FROM node_"+str(node)+"_"+str(ch)+\
#         " WHERE time >= (CURRENT_DATE - INTERVAL '"+str(t)+"' DAY) ORDER BY time ASC"
#     cursor.execute(query)
#     data = cursor.fetchall()
#     last_node = node
#     if len(data) > 0:
#         con.commit()
#         data = jsonify(data)
#         return data
#     else:
#         return 0
#     #else:
#     #    return render_template('error.html', error = 'Unauthorized Access')


# @app.route('/api/database/get_delay_reading_<node>_<channel>')
# def get_delay_reading(node,channel):
#     con = dbconnect()
#     cursor = con.cursor()
#     query = "SELECT max(time) FROM node_"+str(node)+"_"+str(channel)
#     cursor.execute(query)
#     con.commit()
#     res = cursor.fetchall()
#     return json.dumps(res,default=str)



# @app.route('/api/database/get_last_reading-<node>-<channel>')
# def get_last_reading(node,channel):
#     con = dbconnect()
#     cursor = con.cursor()
#     query = "SELECT max(time) FROM node_"+str(node)+"_"+str(channel)
#     cursor.execute(query)
#     con.commit()
#     res = cursor.fetchall()
#     return jsonify(res)

# @app.route('/api/database/piezometer_elements_<tp>_<paddock>')
# def piezometer_elements(tp,paddock):
#     if session.get('user'):
#         #_title = request.form('')
#         con = dbconnect()
#         cursor = con.cursor()
#         if paddock=="all":
#             query = "SELECT paddock, id, depth, lat, lon, status, datalogger, channel FROM piezometer_details "+\
#                 "WHERE status>0"
#         else:
#             if paddock == "Y1Y2":
#                 paddock = "Y1/Y2"
#             if paddock == "E1E2":
#                 paddock = "E1/E2"
#             if paddock == "SiltTrap":
#                 paddock = "Silt Trap"
#             query = "SELECT paddock, id, depth, lat, lon, status, datalogger, channel  FROM piezometer_details "+\
#                 "WHERE paddock='"+paddock+"'"
#         if tp!='0':
#             query = query+ " AND status="+tp
#         cursor.execute(query)
#         con.commit()
#         data = cursor.fetchall()
#         return jsonify(data)
#     else:
#         return render_template('no_authorized.html')

# @app.route('/api/database/getNodeChannel_<paddock>_<id>')
# #@app.route('charts_<paddock>_<id>')
# def getNodeChannel(paddock,id):
#     if session.get('user'):
#         con = dbconnect()
#         cursor = con.cursor()
#         query = "SELECT datalogger,channel FROM piezometer_details WHERE paddock='"+paddock+\
#                 "' AND id='"+id+"'"
#         cursor.execute(query)
#         con.commit()
#         res = cursor.fetchall()
#         return jsonify(res)
#     else:
#         return render_template('no_authorized.html')

# @app.route('/api/database/piezometer_status')
# def piezometer_status():
#     if session.get('user'):
#         con = dbconnect()
#         cursor = con.cursor()
#         data = []
#         for i in range(3):
#             query = "SELECT count(status) FROM piezometer_details WHERE status="+str(i+1)
#             cursor.execute(query)
#             con.commit()
#             res = cursor.fetchall()
#             data.append(res)
#         return jsonify(data)
#     else:
#         return render_template('no_authorized.html')

# @app.route('/api/database/get_paddocks')
# def get_paddocks():
#     if session.get('user'):
#         con = dbconnect()
#         cursor = con.cursor()
#         query = "SELECT DISTINCT ON (paddock) paddock FROM piezometer_details WHERE status<3"
#         cursor.execute(query)
#         con.commit
#         res = cursor.fetchall()
#         return jsonify(res)
#     else:
#         return render_template('no_authorized.html')


# @app.route('/api/validateLogin',methods=['POST'])
# def validateLogin():
#     con = dbconnect()
#     cursor = con.cursor()
#     print(request)
#     try:
#         _username = request.form['username']
#         _password = request.form['inputPassword']
#         print(_username,_password)
#         # connect to database 
#         query = "SELECT name,username,password,picture FROM users where username = '"+_username+"'"
#         cursor.execute(query)
#         data = cursor.fetchall()
#         if len(data) > 0:
#             if check_password_hash(str(data[0][2]),_password):
#             #if (str(data[0][0])==_password):
#                 now = datetime.now()
#                 dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
#                 print("Date :", dt_string)	
#                 print("User logged "+data[0][0])
#                 session['name'] = data[0][0]
#                 session['user'] = data[0][1]
#                 session['picture'] = data[0][3]
#                 return redirect('../index')
#             else:
#                 print('Wrong Email address or Password!')
#                 return redirect('../no_authorized')
#         else:
#             print('Wrong Email address or Password!!')
#             return redirect('../no_authorized')
#     except Exception as e:
#         print(e)
#         return redirect('../no_authorized')
#     finally:
#         cursor.close()
#         con.close()


# commented by security
# """@app.route('/signup')
# def signup():
#     return render_template('signup.html')
# """
# @app.route('/api/v1/get_username')
# def get_username():
#     return jsonify(session['name'])

# @app.route('/api/v1/get_picture')
# def get_picture():
#     return jsonify(session['picture'])



# NOT USEFUL ANYMORE

# def dbconnect():
#     conn = psycopg2.connect(host=host,
#                             database=dbname,
#                             user=user,
#                             password=password)
#     return conn



# @app.route('/no_authorized')
# def no_authorized():
#     now = datetime.now()
#     dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
#     print("Something wrong at %s"%(dt_string))
#     return render_template('no_authorized.html')

# @app.route('/charts')
# def charts():
#     if session.get('user'):
#         return render_template('charts.html')
#     else:
#         return render_template('no_authorized.html')

# @app.route('/index2')
# @cross_origin()
# def userHome2(): 
#     # if session.get('user'):
#         return render_template('index2.html')
#     # else:
#     #     return render_template('no_authorized.html')

# @app.route("/prueba")
# def prueba():
#     print("Probando")
#     return render_template('prueba.html')

# @app.route('/index')
# def userHome():
#     if session.get('user'):
#         return render_template('index.html')
#     else:
#         return render_template('no_authorized.html')

# @app.route('/logout')
# def logout():
#     now = datetime.now()
#     dt_string = now.strftime("%Y/%m/%d %H:%M:%S")
#     print("logout user %s at %s"%(session.get('user'),dt_string))
#     session.pop('user',None)
#     return redirect('/')

# @app.route("/api/hello")
# @cross_origin()
# def prueba2():
#     print("Hello!")
#     return jsonify({"msg":"hello"})





