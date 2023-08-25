import psycopg2
import os
import math
import numpy as np
from scipy.interpolate import interp1d
import yfinance as yf
import pickle
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import requests
import pandas as pd

dbname = "wwlengineering_rossing"
user = "WWL_ADMIN"
password = "WWL#2023"
host = "wwl-rossing.crnkanilun4m.ap-southeast-2.rds.amazonaws.com"
dev = True


def dbconnect():
    conn = psycopg2.connect(host=host, database=dbname, user=user, password=password)
    return conn


def get_data_by_section_front(datalogger, channel, na_ground, new_ground):
    """
    Input
        Datalogger,channel
        Natural Ground: path where is located the .txt files
        New Ground: path where is located the .txt files
    Return an array to graph the:
        pizometer [[id,status,x,ep,lectura],...] >> output
        natural and artificial level [L,nl,al,<e3>] >> dict_graph[<section.txt>]
    """

    """
    FUNCTIONS
    """

    

    def coordinates_norm(diag0, diag):
        x_project = round(np.linalg.norm(diag - diag0))
        if x_project < 0:
            return 0
        elif x_project > 400:
            return 400
        return x_project

    def coordinates_projections(l_start, l_end, xp, yp):
        # Calculate the projection of each point, and return the x value in the graphics
        point = np.array([xp, yp])
        point_vector = point - l_start
        line_vector = l_end - l_start
        projection = (
            l_start
            + np.dot(point_vector, line_vector)
            / np.dot(line_vector, line_vector)
            * line_vector
        )
        return coordinates_norm(l_start, projection)

    def find_closest_numbers(number, interval):
        # Given a <number> return the interval [min,max]
        if number >= 400:
            return 395, 400
        if number <= 0:
            return 0, 5
        closest_min = number - (number % interval)
        closest_max = closest_min + interval
        return closest_min, closest_max

    def graph_coordinates_calculate(filename, filename2):
        diagonal = []
        flag = True
        # e1
        # Given the files with information on natural and artificial levels, the function returns the [L, Natural_Level, New_Level]

        try:
            with open(filename, "r") as fp:
                for line in fp:
                    coordinates = line.strip().split(",")
                    if flag == True:  # Point 0
                        l0 = np.array((float(coordinates[0]), float(coordinates[1])))
                        z = float(coordinates[2])
                        diagonal.append([0, z])
                        flag = False
                    else:
                        l1 = np.array((float(coordinates[0]), float(coordinates[1])))
                        z = float(coordinates[2])
                        diagonal.append([coordinates_norm(l0, l1), z])

            # New Level added
            with open(filename2, "r") as fp:
                for count, line in enumerate(fp):
                    coordinates = line.strip().split(",")
                    z = float(coordinates[2])
                    diagonal[count].append(z)
            return diagonal, [l0, l1]
        except FileNotFoundError as e:
            print("File not found: ", str(e))
            return [], []
        except IOError as e:
            print("I/O error occurred:", str(e))
            return [], []
        except Exception as e:
            print("An error occurred:", str(e))
            return [], []

    def graph_createdictionarypersection(na_g, new_g, i):
        dict_graphsection = {}
        dict_graphpizometer = {}
        l1, l2 = graph_coordinates_calculate(na_g + i, new_g + i)
        if bool(l1) and bool(l2):
            dict_graphsection[i], dict_graphpizometer[i] = graph_coordinates_calculate(
                na_g + i, new_g + i
            )
        return dict_graphsection, dict_graphpizometer

    """
    DB Connection and global variables
    """
    conn = dbconnect()
    cur = conn.cursor()
    interval = 5
    lstart = None
    lend = None

    # Given specific piezometer (datalogger, channel)
    query = """
    SELECT id, section, status, elevation, east_utm, north_utm
    FROM piezometer_details
    WHERE datalogger = %s AND channel = %s
    """
    cur.execute(query, (datalogger, channel))
    row = cur.fetchone()

    # Validate
    if row is None:
        print("Not found piezometer in DB")
        cur.close()
        conn.close()
        return None, None

    # Save information
    piezometer_id = row[0]
    piezometer_section = row[1]
    piezometer_status = int(row[2])
    piezometer_elevation = row[3]
    piezometer_eastutm = row[4]
    piezometer_northutm = row[5]
    # Information to calculate the projections (vectors)
    dict_graph, dict_pizometer = graph_createdictionarypersection(
        na_ground, new_ground, piezometer_section + ".txt"
    )

    if not (bool(dict_graph) and bool(dict_pizometer)):
        print("No information about the section coordinates")
        print("Check .txt files")
        return None, None

    lstart = dict_pizometer[piezometer_section + ".txt"][0]
    lend = dict_pizometer[piezometer_section + ".txt"][1]

    # Get information on the selected piezometer
    query = """
    SELECT pressure
    FROM last_readings
    WHERE node= %s AND channel= %s
    """
    cur.execute(query, (datalogger, channel))
    row = cur.fetchone()
    # Validation
    if row is None or piezometer_status == 2:
        piezometer_pressure = 0
    else:
        piezometer_pressure = float(row[0])

    # Obtain information on related piezometers in the same section
    query = """
    SELECT piezometer_details.id, piezometer_details.status, piezometer_details.elevation, piezometer_details.east_utm, piezometer_details.north_utm, COALESCE(last_readings.pressure, 0) AS pressure
    FROM piezometer_details
    LEFT JOIN last_readings ON piezometer_details.datalogger = last_readings.node AND piezometer_details.channel = last_readings.channel
    WHERE piezometer_details.section = %s
    """
    # BD Over
    cur.execute(query, (piezometer_section,))
    rows = cur.fetchall()
    cur.close()
    conn.close()

    if piezometer_pressure != 0 and not np.isnan(piezometer_pressure):
        valuee3 = float(piezometer_elevation) + piezometer_pressure / 10
    else:
        valuee3 = 0
        # e3.append([coordinates, valuee3]
    output = [
        [
            piezometer_id,
            piezometer_status,
            coordinates_projections(
                lstart, lend, float(piezometer_eastutm), float(piezometer_northutm)
            ),
            float(piezometer_elevation),
            valuee3,
            0
        ]
    ]
    index_pos = 0
    for row in rows:
        if row[0] != piezometer_id:
            # coordinates = coordinates_projections(
            #    lstart, lend, float(row[3]), float(row[4])
            # )
            index_pos += 1
            if float(row[5]) != 0 and not np.isnan(float(row[5])) and int(row[1]) != 2:
                valuee3 = float(row[2]) + float(row[5] / 10)
                # e3.append([coordinates, valuee3])

            output.append(
                [
                    row[0],
                    int(row[1]),
                    coordinates_projections(lstart, lend, float(row[3]), float(row[4])),
                    float(row[2]),
                    valuee3,
                    index_pos
                ]
            )
    
    piezometers = sorted(output, key=lambda x: x[2])
    
    #Create a function that change the coordinates if there are duplicates, and make sure not repeat again.
    for i in range(len(piezometers)):
        for j in range(i+1, len(piezometers)):
            if abs(piezometers[i][2] - piezometers[j][2]) <=5:
                piezometers[j][2] = piezometers[j][2] + 5
    
    piezometers = sorted(piezometers, key=lambda x: x[5])

    return piezometers, dict_graph[piezometer_section + ".txt"]


def get_data_by_section(na_ground, new_ground):
    def coordinates_norm(diag0, diag):
        # Calculate the x value given two points
        x_project = round(np.linalg.norm(diag - diag0))
        if x_project < 0:
            return 0

        if x_project > 400:
            return 400

        return x_project

    def coordinates_projections(l_start, l_end, xp, yp):
        # Calculate the projection of each point, and return the x value in the graphics
        point = np.array([xp, yp])
        point_vector = point - l_start
        line_vector = l_end - l_start
        projection = (
            l_start
            + np.dot(point_vector, line_vector)
            / np.dot(line_vector, line_vector)
            * line_vector
        )
        return coordinates_norm(l_start, projection)

    def graph_coordinates_calculate(filename, filename2):
        diagonal = []
        flag = True
        # Given the files with information of natural and artificial levels, the function return the [L,Natural_Level, New_Level]
        # Natural Level and L projected
        try:
            with open(filename, "r") as fp:
                for line in fp:
                    coordinates = line.strip().split(",")
                    if flag == True:  # Point 0
                        l0 = np.array((float(coordinates[0]), float(coordinates[1])))
                        z = float(coordinates[2])
                        diagonal.append([0, z])
                        flag = False
                    else:
                        l1 = np.array((float(coordinates[0]), float(coordinates[1])))
                        z = float(coordinates[2])
                        diagonal.append([coordinates_norm(l0, l1), z])

            # New Level added
            with open(filename2, "r") as fp:
                for count, line in enumerate(fp):
                    coordinates = line.strip().split(",")
                    z = float(coordinates[2])
                    diagonal[count].append(z)
            return diagonal, [l0, l1]
        except FileNotFoundError as e:
            print("File not found: ", str(e))
            return [], []
        except IOError as e:
            print("I/O error occurred:", str(e))
            return [], []
        except Exception as e:
            print("An error occurred:", str(e))
            return [], []

        # Also return the coordinates of the begin and the end of the section for future uses

    def graph_createdictionarypersection(na_g, new_g, i):
        """
        Given the paths of the files and the section needed, return a dictionary with the coordinates
        """
        dict_graphsection = {}
        dict_graphpizometer = {}
        l1, l2 = graph_coordinates_calculate(na_g + i, new_g + i)
        if bool(l1) and bool(l2):
            dict_graphsection[i], dict_graphpizometer[i] = graph_coordinates_calculate(
                na_g + i, new_g + i
            )
        return dict_graphsection, dict_graphpizometer

    conn = dbconnect()
    cur = conn.cursor()
    lstart = None
    lend = None

    query = """
        SELECT
            pd.paddock,pd.section,pd.id,pd.status,pd.elevation,pd.east_utm,pd.north_utm,COALESCE(lr.pressure,0)
        FROM
            piezometer_details pd
        LEFT JOIN
            last_readings lr ON pd.datalogger = lr.node AND pd.channel = lr.channel
        WHERE pd.status != 4
        ORDER BY
            pd.paddock, pd.section;
    """
    cur.execute(
        query,
    )
    rows = cur.fetchall()
    column_names = [desc[0] for desc in cur.description]
    df = pd.DataFrame(rows, columns=column_names)
    paddock_list = []

    for paddock_name in df["paddock"].unique():
        paddock_data = {"name": paddock_name, "sections": []}

        # Filter the DataFrame for the current paddock
        paddock_df = df[df["paddock"] == paddock_name]

        # Iterate through each unique section within the current paddock
        for section_name in paddock_df["section"].unique():
            dict_graph, dict_pizometer = graph_createdictionarypersection(
                na_ground, new_ground, section_name + ".txt"
            )
            lstart = dict_pizometer[section_name + ".txt"][0]
            lend = dict_pizometer[section_name + ".txt"][1]
            section_data = {
                "name": section_name,
                "coordinates": dict_graph[section_name + ".txt"],
                "piezometers": [],
            }

            # Filter the DataFrame for the current paddock and section
            section_df = paddock_df[paddock_df["section"] == section_name]

            # Iterate through each row within the current paddock and section
            for _, row in section_df.iterrows():
                # Create a list of [id, status] for each piezometer in the section
                xcoord = coordinates_projections(
                    lstart, lend, float(row["east_utm"]), float(row["north_utm"])
                )
                if int(row["status"]) == 1:
                    valuee3 = round(
                        float(row["elevation"]) + float(row["coalesce"]) / 10, 1
                    )
                else:
                    valuee3 = 0
                piezometer_info = [
                    row["id"],
                    int(row["status"]),
                    xcoord,
                    float(row["elevation"]),
                    valuee3,
                ]

                section_data["piezometers"].append(piezometer_info)
            paddock_data["sections"].append(section_data)

        paddock_list.append(paddock_data)
    return paddock_list

class stock_data:
    def __init__(self, symbol, interval):
        self.symbol = symbol
        self.interval = interval

    def get_stock_detail(self):
        ticker_data = yf.Ticker(self.symbol)
        fieldsneeded = [
            "previousClose",
            "open",
            "bid",
            "ask",
            "dayLow",
            "dayHigh",
            "exDividendDate",
            "fiftyTwoWeekLow",
            "fiftyTwoWeekHigh",
            "volume",
            "averageVolume",
            "marketCap",
            "beta",
            "trailingPE",
            "trailingEps",
            "dividendRate",
            "dividendYield",
            "exDividendDate",
            "targetMeanPrice",
        ]
        dict_values = {}
        for i in fieldsneeded:
            if i in ticker_data.info:
                dict_values[i] = ticker_data.info[i]
            else:
                dict_values[i] = ""
        return dict_values

    def get_stock_history(self):
        current_date = datetime.today().date()
        workdays_ago = self.interval
        delta = timedelta(days=1)
        workdays = 0
        date_7_workdays_ago = current_date
        while workdays < int(workdays_ago):
            date_7_workdays_ago -= delta
            if date_7_workdays_ago.weekday() < 5:
                workdays += 1
        data = yf.download(self.symbol, date_7_workdays_ago, current_date)

        df = pd.DataFrame(data)

        return df

    def dataframe_to_list(self, df):
        data_list = []
        decimals = 3
        for index, row in df.iterrows():
            date = index.strftime("%Y-%m-%d")
            open_price = round(row["Open"], decimals)
            high = round(row["High"], decimals)
            low = round(row["Low"], decimals)
            close = round(row["Close"], decimals)
            adj_close = round(row["Adj Close"], decimals)
            volume = row["Volume"]
            data_list.append((date, open_price, high, low, close, adj_close, volume))
        return data_list

    def load_stock_data(self, folder_path):
        files = os.listdir(folder_path)
        today_date = datetime.today().strftime("%Y%m%d")
        file_name = f"{today_date}_stdetail.pkl"
        matching_files = [f for f in files if file_name in f]
        if matching_files:
            print("Loading existing one")
            with open(os.path.join(folder_path, file_name), "rb") as f:
                dict_full = pickle.load(f)
        else:
            print("Create a new one")
            dict_full = self.get_stock_detail()
            if dict_full:
                with open(os.path.join(folder_path, file_name), "wb") as f:
                    pickle.dump(dict_full, f)

        file_name = f"{today_date}_sthistory_{self.interval}.pkl"
        matching_files = [f for f in files if file_name in f]
        if matching_files:
            print("Loading existing one")
            with open(os.path.join(folder_path, file_name), "rb") as f:
                history = pickle.load(f)
        else:
            print("Create a new one")
            history = self.get_stock_history()
            with open(os.path.join(folder_path, file_name), "wb") as f:
                pickle.dump(history, f)
        return dict_full, self.dataframe_to_list(history)


class currency_data:
    def __init__(self, ide):
        self.ide = ide
        match self.ide:
            case "uranium":
                self.url = "https://tradingeconomics.com/commodity/uranium"
            case "usdaud":
                self.url = "https://tradingeconomics.com/australia/currency"
            case _:
                self.url = ""

    def get_currency(self):
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        }
        response = requests.get(self.url, headers=headers)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            price_element = soup.find(
                "div", id="ctl00_ContentPlaceHolder1_ctl00_ctl01_Panel1"
            )
            header = price_element.find_all("th")
            info = price_element.find_all("td")
            table_data = {}
            for key, value in zip(header, info):
                keytext = key.get_text(strip=True)
                valuetext = value.get_text(strip=True)
                if keytext:
                    table_data[keytext] = valuetext
            if table_data:
                return table_data
        return None

    def load_currency(self, folder_path):
        files = os.listdir(folder_path)
        today_date = datetime.today().strftime("%Y%m%d")
        file_name = f"{today_date}_{self.ide}.pkl"
        matching_files = [f for f in files if file_name in f]
        if matching_files:
            print("Loading existing one")
            with open(os.path.join(folder_path, file_name), "rb") as f:
                data_dict = pickle.load(f)
            return data_dict
        else:
            print("Create a new one")
            data_dict = self.get_currency()
            if data_dict:
                with open(os.path.join(folder_path, file_name), "wb") as f:
                    pickle.dump(data_dict, f)
                return data_dict
            else:
                return None
