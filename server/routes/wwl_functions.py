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
        pizometer [[id,Lp,ep,ept],...] >> output
        natural and artificial level [L,nl,al,e3] >> dict_graph[<section.txt>]
    """

    """
    FUNCTIONS
    """

    def calculate_mean(list_coord):
        indices_dict = {}  # Dictionary to store indices and their sum of values
        count_dict = {}  # Dictionary to store the count of values for each index
        for index, value in list_coord:
            if index not in indices_dict:
                indices_dict[index] = 0
                count_dict[index] = 0
            indices_dict[index] += value
            count_dict[index] += 1

        # Calculate the mean for each index
        mean_indices = [
            [index, indices_dict[index] / count_dict[index]] for index in indices_dict
        ]
        return mean_indices

    def correct_e3_version2(items, graph):
        def find_closest_index(items, graph, index, direction):
            if index < 0 or index >= len(items):
                return None
            xpos = int(items[index][0] / 5)
            minrange, maxrange = graph[xpos][1], graph[xpos][2]
            if items[index][1] >= minrange - 10 and items[index][1] <= maxrange:
                return index
            new_index = index + direction
            return find_closest_index(items, graph, new_index, direction)

        def closest_item_with_good_value(items, graph, index=0):
            if index >= len(items):
                return items
            xpos = int(items[index][0] / 5)
            minrange, maxrange = graph[xpos][1], graph[xpos][2]

            if items[index][1] < minrange - 10 or items[index][1] > maxrange:
                left_index = find_closest_index(items, graph, index - 1, -1)
                right_index = find_closest_index(items, graph, index + 1, 1)

                if left_index is not None and right_index is not None:
                    closest_index = (
                        left_index
                        if abs(index - left_index) <= abs(index - right_index)
                        else right_index
                    )
                elif left_index is not None:
                    closest_index = left_index
                elif right_index is not None:
                    closest_index = right_index
                else:
                    closest_index = None

                if closest_index is not None:
                    npos = int(items[closest_index][0] / 5)
                    value = items[closest_index][1]
                    n_minrange, n_maxrange = graph[npos][1], graph[npos][2]
                    relation = (value - n_minrange) / (n_maxrange - n_minrange)
                    items[index][1] = minrange + relation * (abs(maxrange - minrange))
                    # items[index][1] = items[closest_index][1]

            return closest_item_with_good_value(items, graph, index + 1)

        updated_list = closest_item_with_good_value(items, graph)
        return updated_list

    def coordinates_generatee3(points, graph):
        # Generate the line e3
        output = []

        if len(points) == 0:
            for i in range(0, 401, 5):
                output.append([i, graph[int(i / 5)][1] + 0.25])
            return output

        # Pizometers in the same place, calculate mean value.
        sorted_points = sorted(points, key=lambda p: p[0])
        points = calculate_mean(sorted_points)

        # If there is only one pizometer, project the hall list from only one point
        #
        if len(points) == 1:
            _, xmax = find_closest_numbers(points[0][0], 5)
            npos = int(xmax / 5)
            n_minrange, n_maxrange = graph[npos][1], graph[npos][2]
            relation = (points[0][1] - n_minrange) / (n_maxrange - n_minrange)

            for i in range(0, 401, 5):
                if i != xmax:
                    minrange, maxrange = graph[int(i / 5)][1], graph[int(i / 5)][2]
                    distance = relation * abs(maxrange - minrange)
                    output.append([i, minrange + distance])
                else:
                    output.append([i, points[0][1]])

            if points[0][0] != xmax:
                output.append([points[0][0], points[0][1]])

            sorted_points = sorted(output, key=lambda p: p[0])
            x = [p[0] for p in output]
            y = [p[1] for p in output]

            interp_func = interp1d(x, y, kind="linear")
            xnew = list(range(0, 401, 5))
            ynew = interp_func(xnew)
            output = []
            for i in range(0, 401, 5):
                output.append([i, round(ynew[int(i / 5)], 3)])

            return output

        # If there are more than 02 piezometers per section
        # 1st: Create an array with projected values at the left and right of the last values.
        # 2nd: Interpolate and create a list with the possible values.
        """
        1st step
        """
        sorted_points = sorted(points, key=lambda p: p[0])
        x = [p[0] for p in sorted_points]
        y = [p[1] for p in sorted_points]
        xmin, _ = find_closest_numbers(x[0], 5)
        _, xmax = find_closest_numbers(x[-1], 5)
        # print(xmin, xmax)
        for i in range(0, 401, 5):
            if i in x:
                output.append([i, y[x.index(i)]])
            elif i < xmin:
                npos = int(xmin / 5)
                n_minrange, n_maxrange = graph[npos][1], graph[npos][2]
                relation = (y[0] - n_minrange) / (n_maxrange - n_minrange)
                minrange, maxrange = graph[int(i / 5)][1], graph[int(i / 5)][2]
                distance = relation * abs(maxrange - minrange)
                output.append([i, minrange + distance])
            elif i > xmax:
                npos = int(xmax / 5)
                n_minrange, n_maxrange = graph[npos][1], graph[npos][2]
                relation = (y[-1] - n_minrange) / (n_maxrange - n_minrange)
                minrange, maxrange = graph[int(i / 5)][1], graph[int(i / 5)][2]
                distance = relation * abs(maxrange - minrange)
                output.append([i, minrange + distance])

        for i in range(len(x)):
            if x[i] % 5 != 0:
                output.append([x[i], y[i]])

        """
        2nd step
        """
        sorted_points = sorted(output, key=lambda p: p[0])
        # print(sorted_points)
        x = [p[0] for p in sorted_points]
        y = [p[1] for p in sorted_points]
        interp_func = interp1d(x, y, kind="linear")
        x_new = list(range(0, 401, 5))
        y_new = interp_func(x_new)
        output = []
        for i in range(0, 401, 5):
            output.append([i, round(y_new[int(i / 5)], 3)])
        return output

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

    def coordinates_generateept(y1, y2, x1, point, interval):
        # Calculate the value of ept for given a value in x
        if point < x1:
            print("Error: the point must be greater than x1")
            return None
        slope = (y2 - y1) / interval
        y_interpol = y1 + slope * (point - x1)
        return round(y_interpol, 2)

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
    e3 = []

    # Generate output [id,Lp,ep,ept]
    output = [
        [
            piezometer_id,
            piezometer_status,
            coordinates_projections(
                lstart, lend, float(piezometer_eastutm), float(piezometer_northutm)
            ),
            float(piezometer_elevation),
        ]
    ]
    coordinates = coordinates_projections(
        lstart, lend, float(piezometer_eastutm), float(piezometer_northutm)
    )
    if piezometer_pressure != 0 and not np.isnan(piezometer_pressure):
        valuee3 = float(piezometer_elevation) + piezometer_pressure / 10
        e3.append([coordinates, valuee3])
    for row in rows:
        if row[0] != piezometer_id:
            output.append(
                [
                    row[0],
                    int(row[1]),
                    coordinates_projections(lstart, lend, float(row[3]), float(row[4])),
                    float(row[2]),
                ]
            )
            coordinates = coordinates_projections(
                lstart, lend, float(row[3]), float(row[4])
            )
            if float(row[5]) != 0 and not np.isnan(float(row[5])) and int(row[1]) != 2:
                valuee3 = float(row[2]) + float(row[5] / 10)
                e3.append([coordinates, valuee3])

    for i in range(len(output)):
        x3 = output[i][2]
        x1, x2 = find_closest_numbers(x3, interval)
        y1, y2 = (
            dict_graph[piezometer_section + ".txt"][int(x1 / 5)][2],
            dict_graph[piezometer_section + ".txt"][int(x2 / 5)][2],
        )
        y3 = coordinates_generateept(y1, y2, x1, x3, interval)
        output[i].append(y3)

    # In case there are more than 1 pizometer and the value of e3 is outside the range, the value is corrected accordingly their neighbors
    if len(e3) > 1:
        e3 = sorted(e3, key=lambda p: p[0])
        e3 = correct_e3_version2(e3, dict_graph[piezometer_section + ".txt"])

    # Generate arrange of e3 for the 80 points
    output2 = coordinates_generatee3(e3, dict_graph[piezometer_section + ".txt"])

    # Add to the final output the values of e3
    for i in range(len(output2)):
        dict_graph[piezometer_section + ".txt"][i].append(output2[i][1])
    return output, dict_graph[piezometer_section + ".txt"]


def get_data_by_section(datalogger, channel, na_ground, new_ground):
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

    # START#

    """
    DB Connection and global variables
    """
    conn = dbconnect()
    cur = conn.cursor()
    interval = 5
    lstart = None
    lend = None

    # Given specific pizometer (datalogger, channel)
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
    # Extract the coordinates for the given section

    dict_graph, dict_pizometer = graph_createdictionarypersection(
        na_ground, new_ground, piezometer_section + ".txt"
    )
    # print(dict_graph)
    if not (bool(dict_graph) and bool(dict_pizometer)):
        print("No information about the section coordinates")
        print("Check .txt files")
        return None, None

    # Extract the coordinates of the initial point
    lstart = dict_pizometer[piezometer_section + ".txt"][0]
    lend = dict_pizometer[piezometer_section + ".txt"][1]
    # Get information of the selected pizometer
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

    # Obtain information of related pizometers in the same section
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

    output = [
        [
            piezometer_id,
            piezometer_status,
            coordinates_projections(
                lstart, lend, float(piezometer_eastutm), float(piezometer_northutm)
            ),
            float(piezometer_elevation),
        ]
    ]
    if piezometer_pressure != 0 and not np.isnan(piezometer_pressure):
        valuee3 = round(float(piezometer_elevation) + piezometer_pressure / 10, 1)
        output[0].append(valuee3)
    else:
        output[0].append(0)

    index = 1
    for row in rows:
        if row[0] != piezometer_id:
            output.append(
                [
                    row[0],
                    int(row[1]),
                    coordinates_projections(lstart, lend, float(row[3]), float(row[4])),
                    float(row[2]),
                ]
            )

            if float(row[5]) != 0 and not np.isnan(float(row[5])) and int(row[1]) != 2:
                valuee3 = round(float(row[2]) + float(row[5] / 10), 1)
                output[index].append(valuee3)
            else:
                output[index].append(0)
            index += 1
    return output, dict_graph[piezometer_section + ".txt"], piezometer_section


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

    def dataframe_to_list(self,df):
        data_list = []
        decimals = 3
        for index, row in df.iterrows():
            date = index.strftime('%Y-%m-%d')
            open_price = round(row['Open'], decimals)
            high = round(row['High'], decimals)
            low = round(row['Low'], decimals)
            close = round(row['Close'], decimals)
            adj_close = round(row['Adj Close'], decimals)
            volume = row['Volume']
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

        file_name = f"{today_date}_sthistory.pkl"
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
