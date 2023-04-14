import yagmail
import os
import psycopg2
os.environ['OPENBLAS_NUM_THREADS'] = '1'
import numpy as np
import pandas as pd
import utilities_functions as uf

BASEPATH = os.getcwd()+"/"
#BASEPATH = "clients.wwlengineering.com/public_html/"

dbname = 'wwlengineering_rossing'
user = 'wwlengineering_admin_rossing'
password = 'yf=R(qH7Q#fG'
host = 'localhost'
dev = True

def dbconnect():
    conn = psycopg2.connect(host=host,
                            database=dbname,
                            user=user,
                            password=password)
    return conn

def check_time():
    con = dbconnect()
    cursor = con.cursor()
    query = "SELECT time,paddock,id,NOW()-TIME FROM" \
        " last_readings AS a LEFT JOIN piezometer_details AS b"+ \
        " ON a.channel = b.channel AND b.datalogger = a.node"+ \
        " WHERE NOW() - time >= INTERVAL '48' HOUR AND status = 1"
    cursor.execute(query)
    data = cursor.fetchall()
    df = pd.DataFrame(data,columns=["last_reading","paddock","piezometer","no-reading time"])
    if len(df.index)>0:
        df.to_csv(BASEPATH+"no_reading_data.csv",index=False)
        sendEmail(BASEPATH+"no_reading_data.csv")

def sendEmail(path):
    yag = yagmail.SMTP('_mainaccount@wwlengineering.com','*s48sQ48#W')
    contents = [
        "The report of piezometer with no readings on 2 days or more is attached."]
    attachments = [path]
    #print(os.path.exists(path + "/img/section_1.png"))
    yag.send('cynthia.pogisho@rossing.com.na', 'ALERT DASHBOARD', contents, attachments = attachments)
    yag.send('vayala@wwlengineering.com', 'ALERT DASHBOARD', contents, attachments = attachments)
    yag.send('rugaz@wwlengineering.com', 'ALERT DASHBOARD', contents, attachments = attachments)

    print("mail sent successfully")
    # Alternatively, with a simple one-liner:
    #yagmail.SMTP('mygmailusername').send('to@someone.com', 'subject', contents)

def main():
    try:
        check_time()
        print("checked active piezometer")
        #nodes = uf.get_features_from_data(BASEPATH+'data/data_compacted.csv')
        #uf.save_last_features(nodes)
    except Exception as e:
        print(e)

if __name__ == "__main__":
    main()