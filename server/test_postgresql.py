from datetime import datetime
import utilities_functions as uf
import os

def update(year,month,op=True):
    try:
        uf.download_data(21545,year,month,option=op)
        nodes = uf.get_features_from_data(uf.os.path.abspath('data/data_compacted.csv'))
        print("already got features")
        uf.save_features(nodes,year,month)
        print("updated readings")
        uf.save_last_features(nodes)
        print("updated last readings")
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
    update(today.year,today.month,op=False)
    print("done updated to %d/%d/%d %d"%(today.year,today.month,today.day,today.hour))