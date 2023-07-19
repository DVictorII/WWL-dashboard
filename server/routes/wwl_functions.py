import psycopg2
from os.path import dirname, join
import math
import numpy as np
from scipy.interpolate import interp1d

dbname = "wwlengineering_rossing"
user = "WWL_ADMIN"
password = "WWL#2023"
host = "wwl-rossing.crnkanilun4m.ap-southeast-2.rds.amazonaws.com"
dev = True


def dbconnect():
    conn = psycopg2.connect(host=host, database=dbname, user=user, password=password)
    return conn


def get_data_by_section(datalogger, channel, na_ground, new_ground):
    """
    Return an array to graph the:
        pizometer [[id,Lp,ep,ept],...] >> output
        natural and artificial level [L,nl,al,e3] >> dict_graph[<section.txt>]
    """

    def coordinates_generatee3(points):
        # Conditions
        output = []
        if len(points) == 1:
            _, xmax = find_closest_numbers(points[0][0], 5)
            for i in range(0, 401, 5):
                if i <= xmax:
                    output.append([i, points[0][1]])
                else:
                    output.append([i, 0])
            return output

        if len(points) == 0:
            print("No value")
            return None

        # Begin processing
        sorted_points = sorted(points, key=lambda p: p[0])
        x = [p[0] for p in sorted_points]
        y = []
        for p in sorted_points:
            if math.isnan(p[1]):
                y.append(0)
            else:
                y.append(p[1])

        xmin, _ = find_closest_numbers(x[0], 5)
        _, xmax = find_closest_numbers(x[-1], 5)
        x[0] = xmin
        x[-1] = xmax
        interp_func = interp1d(x, y, kind="linear")
        x_new = list(range(xmin, xmax + 1, 5))
        y_new = interp_func(x_new)

        j = 1
        for i in range(0, 401, 5):
            if i <= xmin:
                output.append([i, y_new[0]])
            elif i >= xmax:
                output.append([i, y_new[-1]])
            else:
                output.append([i, y_new[j]])
                j += 1
        return output

    def coordinates_norm(diag0, diag):
        x_project = round(np.linalg.norm(diag - diag0))
        if x_project < 0:
            return 0
        elif x_project > 400:
            return 400
        return x_project

    def coordinates_projections(l_start, l_end, xp, yp):
        point = np.array([xp, yp])
        line_start = l_start
        line_end = l_end
        point_vector = point - line_start
        line_vector = line_end - line_start
        projection = (
            line_start
            + np.dot(point_vector, line_vector)
            / np.dot(line_vector, line_vector)
            * line_vector
        )
        return coordinates_norm(line_start, projection)

    def coordinates_generateept(y1, y2, x1, point):
        interval = 5
        if point < x1:
            print("Error: the point must be greater than x1")
            return None
        slope = (y2 - y1) / interval
        y_interpol = y1 + slope * (point - x1)
        return round(y_interpol, 2)

    def find_closest_numbers(number, interval):
        closest_min = number - (number % interval)
        closest_max = closest_min + interval
        return closest_min, closest_max

    def graph_coordinates_calculate(filename, filename2):
        diagonal = []
        flag = True

        print("FILENAMES: ", filename, filename2)

        # e1
        with open(filename, "r") as fp:
            for line in fp:
                coordinates = line.strip().split(",")
                # Convert coordinates to float
                if flag == True:
                    l0 = np.array((float(coordinates[0]), float(coordinates[1])))
                    z = float(coordinates[2])
                    flag = False
                    diagonal.append([0, z])
                else:
                    l1 = np.array((float(coordinates[0]), float(coordinates[1])))
                    z = float(coordinates[2])
                    diagonal.append([coordinates_norm(l0, l1), z])
        # e2
        with open(filename2, "r") as fp:
            for count, line in enumerate(fp):
                coordinates = line.strip().split(",")
                z = float(coordinates[2])
                diagonal[count].append(z)

        return diagonal, [l0, l1]

    def graph_createdictionarypersection(na_g, new_g, i):
        dict_graphsection = {}
        dict_graphpizometer = {}
        name = na_g
        name2 = new_g
        # name='./natural_ground/'
        # name2='./new_ground/'
        # for i in os.listdir('./natural_ground'):
        dict_graphsection[i], dict_graphpizometer[i] = graph_coordinates_calculate(
            name + i, name2 + i
        )
        print("SECTION", dict_graphpizometer)
        return dict_graphsection, dict_graphpizometer

    conn = dbconnect()
    cur = conn.cursor()
    interval = 5
    # Given specific pizometer (datalogger, channel)

    query = """
    SELECT id, section, depth, serial, lat, lon
    FROM piezometer_details
    WHERE datalogger = %s AND channel = %s
    """
    cur.execute(query, (datalogger, channel))

    row = cur.fetchone()
    # Validate
    if row is None:
        print("Not found in DB")
        cur.close()
        conn.close()
        return None
    # Save information
    piezometer_id = row[0]
    piezometer_section = row[1]
    piezometer_depth = row[2]
    piezometer_elevation = row[3]
    piezometer_ccmlat = row[4]
    piezometer_ccmlon = row[5]
    # Information to calculate the projections (vectors)
    dict_graph, dict_pizometer = graph_createdictionarypersection(
        na_ground, new_ground, piezometer_section + ".txt"
    )

    lstart = dict_pizometer[piezometer_section + ".txt"][0]
    lend = np.array([400, 0])

    # Get information of the selected pizometer
    query = """
    SELECT pressure
    FROM last_readings
    WHERE node= %s AND channel= %s
    """
    cur.execute(query, (datalogger, channel))
    row = cur.fetchone()
    # Validation
    if row is None:
        print("Not found in DB")
        cur.close()
        conn.close()
        return None
    # Save information
    piezometer_pressure = float(row[0])

    # Artificial_data: Expecting update BD
    piezometer_cx = 503519.09
    piezometer_cy = 7517616.47

    # Obtain information of related pizometers in the same section
    query = """
    SELECT piezometer_details.id, piezometer_details.depth, piezometer_details.serial, piezometer_details.lat, piezometer_details.lon, last_readings.pressure
    FROM piezometer_details
    JOIN last_readings ON piezometer_details.datalogger = last_readings.node AND piezometer_details.channel = last_readings.channel
    WHERE piezometer_details.section = %s
    """
    # BD Over
    cur.execute(query, (piezometer_section,))
    rows = cur.fetchall()
    cur.close()
    conn.close()

    # Generate output [id,Lp,ep,ept]
    output = [
        [
            piezometer_id,
            coordinates_projections(lstart, lend, piezometer_cx, piezometer_cy),
            float(piezometer_depth),
        ]
    ]
    e3 = [
        [
            coordinates_projections(lstart, lend, piezometer_cx, piezometer_cy),
            piezometer_pressure,
        ]
    ]
    for row in rows:
        if row != (piezometer_id, piezometer_depth):
            output.append(
                [
                    row[0],
                    coordinates_projections(lstart, lend, piezometer_cx, piezometer_cy),
                    float(row[1]),
                ]
            )
            e3.append(
                [
                    coordinates_projections(lstart, lend, piezometer_cx, piezometer_cy),
                    float(row[5]),
                ]
            )
    for i in range(len(output)):
        x3 = output[i][1]
        x1, x2 = find_closest_numbers(x3, interval)
        print("X1", x1)
        print("X2", x2)

        print("ATTEMPTED INDEX", int(x2 / 5))
        print("DICT_GRAPH_LENGTH", len(dict_graph[piezometer_section + ".txt"]))
        y1, y2 = (
            dict_graph[piezometer_section + ".txt"][int(x1 / 5)][2],
            dict_graph[piezometer_section + ".txt"][int(x2 / 5)][2],
        )

        """ EL INDEX PARA Y2 SOBREPASA EL RANGO DEL ARRAY dict_graph. AL REDUCIR EL INDEX EN 1 SE CORRIGE EL
         ERROR, PERO NO SÉ EN QUE AFECTA ESO A LA FUNCIÓN FINAL """

        print("Y1", y1)

        print("Y2", y2)
        y3 = coordinates_generateept(y1, y2, x1, x3)
        output[i].append(y3)

    # Calculate e3 and update the information of Graph (Natural and Artificial Level)
    output2 = coordinates_generatee3(e3)
    for i in range(len(output2)):
        dict_graph[piezometer_section + ".txt"][i].append(output2[i][1])

    return output, dict_graph[piezometer_section + ".txt"]
