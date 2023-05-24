from datetime import datetime
import utilities2 as uf
import os
import psycopg2

dbname = "wwlengineering_rossing"
user = "WWL_ADMIN"
password = "WWL#2023"
host = "wwl-rossing.crnkanilun4m.ap-southeast-2.rds.amazonaws.com"
dev = True

def dbconnect():
    conn = psycopg2.connect(host=host, database=dbname, user=user, password=password)
    return conn

def update(year,month,op=True):
    try:
        conn = dbconnect()
        cur = conn.cursor()
        
        query = ""
        
        uf.download_data(21545,year,month,option=op)
        nodes = uf.get_features_from_data(uf.os.path.abspath('data/data_compacted.csv'))
        print("already got features")
        uf.save_features(nodes,year,month, cur, query)
        print("updated readings")
        uf.save_last_features(nodes, cur, query)
        print("updated last readings")

        print("FINAL QUERY", query)

        conn.commit()

        """else:
            name = "data\\compacted-readings-21545-%d-%02d.dat"%(year,month)
            nodes = uf.get_features_from_data(name)
            uf.save_features(nodes,year,month)
            print("done %d %d"%(year,month))"""
    except Exception as e:
        print(e)

if __name__ == "__main__":
    print(os.path.abspath( "data/calibration_data.csv"))
    today = datetime.today()
    print('\n')
    print('job running: ',today)
    if today.day == 1:
        update(today.year,today.month-1,op=True)
    #current month
    update(today.year,4,op=True)
    print("done updated to %d/%d/%d %d"%(today.year,today.month,today.day,today.hour))