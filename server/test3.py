from datetime import datetime
import utilities3 as uf
import os
import psycopg2


dbname = "wwlengineering_rossing"
user = "WWL_ADMIN"
password = "WWL#2023"
host = "wwl-rossing.crnkanilun4m.ap-southeast-2.rds.amazonaws.com"
dev = True

table_names = [
    "node_64031_1",
    "node_64218_1",
    "node_64047_1",
    "node_64038_1",
    "node_64038_2",
    "node_64050_1",
    "node_64148_1",
    "node_64037_1",
    "node_64037_2",
    "node_64068_1",
    "node_64053_1",
    "node_64033_1",
    "node_64033_2",
    "node_20696_1",
    "node_10230_1",
    "node_10262_1",
    "node_10262_2",
    "node_10262_3",
    "node_10262_4",
    "node_10317_1",
    "node_10317_2",
    "node_16301_1",
    "node_16329_1",
    "node_16444_1",
    "node_16546_1",
    "node_16564_1",
    "node_16567_1",
    "node_16596_1",
    "node_16601_1",
    "node_16629_1",
    "node_16725_1",
    "node_16752_1",
    "node_16761_1",
    "node_1815_1",
    "node_1815_2",
    "node_1815_3",
    "node_1815_4",
    "node_1815_5",
    "node_1816_1",
    "node_1816_2",
    "node_1816_3",
    "node_1816_4",
    "node_1816_5",
    "node_1817_1",
    "node_1817_2",
    "node_1817_3",
    "node_1817_4",
    "node_1817_5",
    "node_1819_1",
    "node_1819_2",
    "node_1819_3",
    "node_1819_4",
    "node_1819_5",
    "node_1821_1",
    "node_1821_2",
    "node_1821_3",
    "node_1821_4",
    "node_1821_5",
    "node_1849_1",
    "node_1849_2",
    "node_1849_3",
    "node_1849_4",
    "node_1849_5",
    "node_1853_1",
    "node_1853_2",
    "node_1853_3",
    "node_1853_4",
    "node_1853_5",
    "node_1876_1",
    "node_1876_2",
    "node_1876_3",
    "node_1876_4",
    "node_1876_5",
    "node_20618_1",
    "node_20764_1",
    "node_20775_1",
    "node_2087_1",
    "node_2087_2",
    "node_2087_3",
    "node_2087_4",
    "node_2087_5",
    "node_20892_1",
    "node_20989_1",
    "node_21008_1",
    "node_21024_1",
    "node_2115_1",
    "node_2115_2",
    "node_2121_1",
    "node_2121_2",
    "node_2137_1",
    "node_2137_2",
    "node_2137_3",
    "node_2137_4",
    "node_2137_5",
    "node_2423_1",
    "node_2423_2",
    "node_2423_3",
    "node_2423_4",
    "node_2423_5",
    "node_3006_1",
    "node_3023_1",
    "node_3031_1",
    "node_3060_1",
    "node_9548_1",
    "node_9548_2",
    "node_9852_1",
    "node_9926_1",
]


# CHECK IF TABLE EXISTS
# def table_exists(table_name, cur, conn):
#     try:
#         cur.execute(f"SELECT 1 FROM {table_name} LIMIT 1;")
#     except psycopg2.Error as e:
#         conn.rollback()
#         return 0
#     else:
#         conn.rollback()
#         return 1


def delete_db():
    count = 0
    conn = dbconnect()
    cur = conn.cursor()

    # query = "SELECT datalogger, channel FROM piezometer_details"
    # cur.execute(query)
    # res = cur.fetchall()

    # print("RES", res)

    query2 = ""
    for tablename in table_names:
        # tablename = f"node_{row[0]}_{row[1]}"

        query2 += f"DELETE FROM {tablename} WHERE time >= '2023-01-01 00:00:00'; "
        count += 1

    print("COUNT", count)
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
    # if today.day == 1:
    #     update(today.year, today.month - 1, op=True)
    # current month

    update(today.year, today.month, op=False)
    # delete_db()
    print(
        "done updated to %d/%d/%d %d" % (today.year, today.month, today.day, today.hour)
    )
