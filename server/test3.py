from datetime import datetime
import utilities3 as uf
import os
import psycopg2


dbname = "wwlengineering_rossing"
user = "WWL_ADMIN"
password = "WWL#2023"
host = "wwl-rossing.crnkanilun4m.ap-southeast-2.rds.amazonaws.com"
dev = True


# CHECK IF TABLE EXISTS
def table_exists(table_name, cur, conn):
    try:
        cur.execute(f"SELECT 1 FROM {table_name} LIMIT 1;")
    except psycopg2.Error as e:
        conn.rollback()
        return 0
    else:
        conn.rollback()
        return 1


def delete_db():
    conn = dbconnect()
    cur = conn.cursor()

    query = "SELECT datalogger, channel FROM piezometer_details"
    cur.execute(query)
    res = cur.fetchall()

    print("RES", res)

    query2 = ""
    for row in res:
        tablename = f"node_{row[0]}_{row[1]}"

        if table_exists(tablename, cur, conn):
            query2 += f"DELETE FROM {tablename} WHERE time >= '2023-08-01 00:00:00'; "

    cur.execute(query2)
    conn.commit()

    cur.close()
    conn.close()

    # cur.execute(query2)


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
        query += uf.save_features(nodes, year, month, cur)
        print("updated readings")
        query += uf.save_last_features(nodes, cur)
        print("updated last readings")

        print("FINAL QUERY", query)

        cur.execute(query)
        conn.commit()

        # Start state updating
        query = uf.update_status()
        cur.execute(query)
        conn.commit()

        cur.close()
        conn.close()

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
    # delete_db()
    print(
        "done updated to %d/%d/%d %d" % (today.year, today.month, today.day, today.hour)
    )
