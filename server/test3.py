from datetime import datetime
import utilities3 as uf
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


def update(year, month, op=True):
    try:
        conn = dbconnect()
        cur = conn.cursor()

        query = ""

        uf.download_data(21545, year, month, option=op)
        nodes = uf.get_features_from_data(os.path.abspath("data/data_compacted.csv"))
        print("NODES", len(nodes))
        print("already got features")
        # query += uf.save_features(nodes, year, month, cur)
        # print("updated readings")
        # query += uf.save_last_features(nodes, cur)
        # print("updated last readings")

        # print("FINAL QUERY", query)

        # cur.execute(query)
        # conn.commit()

        """else:
            name = "data\\compacted-readings-21545-%d-%02d.dat"%(year,month)
            nodes = uf.get_features_from_data(name)
            uf.save_features(nodes,year,month)
            print("done %d %d"%(year,month))"""
    except Exception as e:
        print(e)
        # conn.rollback()


if __name__ == "__main__":
    # print(os.path.abspath("data/calibration_data.csv"))
    today = datetime.today()
    print("\n")
    print("job running: ", today)
    if today.day == 1:
        update(today.year, today.month - 1, op=True)
    # current month
    update(today.year, today.month, op=False)
    print(
        "done updated to %d/%d/%d %d" % (today.year, today.month, today.day, today.hour)
    )
