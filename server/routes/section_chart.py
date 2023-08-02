from flask import Blueprint, jsonify
from flask_cors import cross_origin
from datetime import datetime, timedelta
from sqlalchemy import text, create_engine, inspect
import numpy as np

from app import db, dict_helper
from docx import Document
from docx.shared import Cm

import routes.wwl_functions as wwl
import matplotlib.pyplot as plt
import matplotlib.dates as mdates

from routes.piezometers_data import piezometer_details
import os
import psycopg2

section_chart_routes = Blueprint("section_chart_routes", __name__)

dbname = "wwlengineering_rossing"
user = "WWL_ADMIN"
password = "WWL#2023"
host = "wwl-rossing.crnkanilun4m.ap-southeast-2.rds.amazonaws.com"
dev = True


def dbconnect():
    conn = psycopg2.connect(host=host, database=dbname, user=user, password=password)
    return conn


tables = [
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
    "position",
    "task_details",
    "task_list",
    "users",
    "incident_reports",
    "last_readings",
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
    "node_20696_1",
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
    "piezometer_data",
    "piezometer_details",
    "piezometer_reports",
]


def build_word_report(piezos):
    document = Document()

    document.add_heading("Appendix: Piezometer Information")
    document.add_paragraph("")

    paddockList = list(set(list(map(lambda x: x["paddock"], piezos))))

    for i in range(0, len(paddockList)):
        paddock = paddockList[i]

        # PUT PADDOCK TITLE INTO PDF, START NEW SECTION
        p = document.add_paragraph("")
        p.add_run(f"{i+1}. Paddock: {paddock}").bold = True

        ################################################################

        sectionsList = list(
            filter(
                lambda z: z != None and z != "?",
                list(
                    set(
                        list(
                            map(
                                lambda x: x["section"],
                                list(filter(lambda y: y["paddock"] == paddock, piezos)),
                            )
                        )
                    )
                ),
            )
        )

        for j in range(0, len(sectionsList)):
            section = sectionsList[j]

            # PENDING ADD SECTION MAP AND START NEW PART IN THE PDF HERE

            ps = document.add_paragraph("")
            ps.add_run(f"{i+1}.{j+1} {section.replace('-', ' ', 1)}").bold = True

            document.add_picture(
                os.path.abspath(
                    f"../client/public/sectionReport/maps/{section.lower()}.png"
                ),
                width=Cm(15.24),
                height=Cm(9.4),
            )

            ################################################################

            piezo_list_by_section = list(
                filter(lambda y: y["section"] == section, piezos)
            )

            for k in range(0, len(piezo_list_by_section)):
                piezometer = piezo_list_by_section[k]

                if k == 0:
                    filtered_list = list(
                        filter(
                            lambda x: x["section"] == section
                            and x["datalogger"] != None
                            and x["channel"] != None,
                            piezos,
                        )
                    )

                    first_piezo_with_datalogger_and_channel = filtered_list[0]

                    # if first_piezo_with_datalogger_and_channel:
                    # print(
                    #     section,
                    #     first_piezo_with_datalogger_and_channel["id"],
                    #     first_piezo_with_datalogger_and_channel["section"],
                    # )
                    # filename = plot_section_chart(
                    #     first_piezo_with_datalogger_and_channel
                    # )
                    # BUILD SECTION CHART WITH THE FIRST PIEZOMETER THAT HAS DATALOGGER AND CHANNEL

                    document.add_picture(
                        os.path.abspath(
                            f"../client/public/sectionReport/sections/{first_piezo_with_datalogger_and_channel['section'].lower() }.png"
                        ),
                        width=Cm(17),
                        height=Cm(8.5),
                    )
                    document.add_page_break()
                    #################################################################################

                ps = document.add_paragraph(f"{piezometer['id']}")

                if (
                    piezometer["datalogger"] != None
                    and piezometer["channel"] != None
                    and (
                        f"node_{piezometer['datalogger']}_{piezometer['channel']}"
                        in tables
                    )
                ):
                    filename = plot_readings_chart(
                        piezometer["datalogger"], piezometer["channel"], 90
                    )

                    document.add_picture(
                        os.path.abspath(
                            f"../client/public/sectionReport/readings/{filename}"
                        ),
                        width=Cm(17),
                        height=Cm(8.5),
                    )

                    print(filename)

                else:
                    p_no_readings = document.add_paragraph("")
                    p_no_readings.add_run(
                        f"No readings for the current piezometer"
                    ).bold = True

            document.add_page_break()

            # GET PIEZO READINGS FOR EACH PIEZOMETER IN EACH SECTION

    document.save(os.path.abspath(f"../client/dist/report_word/word_report.docx"))
    document.save(os.path.abspath(f"../client/public/report_word/word_report.docx"))


# def plot_section_chart(piezometer):
#     try:
#         natural_ground = "data/sections/natural_ground/"
#         new_ground = "data/sections/new_ground/"

#         nodes, data = wwl.get_data_by_section(
#             piezometer["datalogger"], piezometer["channel"], natural_ground, new_ground
#         )

#         print(piezometer["id"])
#         # Extract x and y values from the list
#         x = [item[0] for item in data]
#         y1 = [item[1] for item in data]
#         y2 = [item[2] for item in data]
#         y3 = [item[3] for item in data]

#         node_x = [item[2] for item in nodes]
#         node_y4 = [item[3] for item in nodes]
#         node_y5 = [item[4] for item in nodes]
#         node_names = [item[0] for item in nodes]
#         node_status = [item[1] for item in nodes]

#         plt.figure(figsize=(16, 6))
#         # Plot the data
#         plt.plot(x, y1, color="#7b8831", label="Original ground")
#         plt.plot(x, y2, color="#876538", label="Tailing surface")
#         # plt.plot(x, y3, label="e3")

#         plt.scatter(node_x, node_y4, color="red", label="Piezometer location")
#         plt.scatter(node_x, node_y5, color="blue", label="Current PWP level")

#         # FIRST OPTION
#         # for i, name in enumerate(node_names):
#         #     plt.text(node_x[i], node_y4[i], name, ha="center", va="bottom")

#         for i, name in enumerate(node_y5):
#             plt.text(
#                 node_x[i],
#                 node_y4[i],
#                 node_names[i] + "," + str(name),
#                 ha="center",
#                 va="bottom",
#             )

#         # Draw a line between y4 and y5
#         for i in range(len(nodes)):
#             if node_status[i] == 1:
#                 color = "green"
#             elif node_status[i] == 2:
#                 color = "red"
#             elif node_status[i] == 3:
#                 color = "gray"
#             else:
#                 color = "black"
#             plt.plot([node_x[i], node_x[i]], [node_y4[i], node_y5[i]], color=color)

#         # Add labels and title to the plot
#         plt.xlabel("x")
#         plt.ylabel("y")
#         plt.title(f"Graph of {piezometer['section'].replace('-',' ',1)} ")

#         # Add a legend to distinguish the lines
#         plt.legend()

#         # Save chart picture
#         file_path_to_save = os.path.abspath(
#             f"../client/public/sectionReport/sections/{piezometer['section'].lower()}.png"
#         )

#         plt.savefig(file_path_to_save, bbox_inches="tight")

#         plt.close("all")

#         filename = f"{piezometer['section'].lower()}.png"

#         return filename

#         # Show the plot
#         # plt.show()

#     except Exception:
#         print({"error": Exception})


def plot_section_chart(piezometer):
    natural_ground = "data/sections/natural_ground/"
    new_ground = "data/sections/new_ground/"

    nodes, data, section = wwl.get_data_by_section(
        piezometer["datalogger"], piezometer["channel"], natural_ground, new_ground
    )

    nodes = sorted(nodes, key=lambda x: x[2])
    x = [item[0] for item in data]
    y1 = [item[1] for item in data]
    y2 = [item[2] for item in data]

    piezometer_x = [item[2] for item in nodes]
    piezometer_location = [item[3] for item in nodes]
    piezometer_reading = [item[4] for item in nodes]
    piezometer_name = [item[0] for item in nodes]
    piezometer_status = [item[1] for item in nodes]

    plt.figure(figsize=(16, 6))

    plt.plot(x, y1, color="#7b8831", label="Original ground")
    plt.plot(x, y2, color="#876538", label="Tailing surface")

    # plt.scatter(
    #     piezometer_x, piezometer_location, color="red", label="Piezometer location"
    # )
    # plt.scatter(
    #     piezometer_x, piezometer_reading, color="blue", label="Current PWP level"
    # )

    index = 1
    for i, reading in enumerate(piezometer_reading):
        print("READING", reading)
        if piezometer_status[i] == 1:
            color = "blue"
        elif piezometer_status[i] == 2:
            color = "red"
        elif piezometer_status[i] == 3:
            color = "yellow"

        if piezometer_status[i] == 1:
            tag = str(index) + ") " + piezometer_name[i] + " - " + str(reading) + " KPa"
            plt.scatter(piezometer_x[i], reading, marker="v", color=color)
            plt.scatter(
                piezometer_x[i],
                piezometer_location[i],
                marker="o",
                color=color,
                label=tag,
            )
            if int(reading) == 0:
                plt.plot(
                    [piezometer_x[i], piezometer_x[i]],
                    color=color,
                )
            else:
                plt.plot(
                    [piezometer_x[i], piezometer_x[i]],
                    [piezometer_location[i], reading],
                    color=color,
                )
            # plt.text(piezometer_x[i], piezometer_location[i], "("+ str(index) + ")" , ha='center', va='bottom',bbox=dict(facecolor='white', alpha=0.5))
            plt.annotate(
                "(" + str(index) + ")",
                (piezometer_x[i], piezometer_location[i]),
                textcoords="offset points",
                xytext=(5, 5),
                ha="center",
                fontsize=8,
            )
            index += 1
        elif piezometer_status[i] == 2 or piezometer_status[i] == 3:
            tag = str(index) + ") " + piezometer_name[i]
            plt.scatter(
                piezometer_x[i],
                piezometer_location[i],
                marker="o",
                color=color,
                label=tag,
            )
            plt.annotate(
                "(" + str(index) + ")",
                (piezometer_x[i], piezometer_location[i]),
                textcoords="offset points",
                xytext=(5, 5),
                ha="center",
                fontsize=8,
            )
            index += 1

    plt.xlabel("Chainage (m)")
    plt.ylabel("Elevation (m)")
    plt.title(f"Graph of {piezometer['section'].replace('-',' ',1)} ")

    plt.legend()
    plt.xticks(range(min(x), max(x) + 1, 50))
    plt.yticks(range(int(min(y1)), int(max(y2) + 1), 5))
    plt.grid(True)

    # Save chart picture
    file_path_to_save = os.path.abspath(
        f"../client/public/sectionReport/sections/{piezometer['section'].lower()}.png"
    )

    plt.savefig(file_path_to_save, bbox_inches="tight")

    plt.close("all")

    filename = f"{piezometer['section'].lower()}.png"

    return filename


def plot_readings_chart(datalogger, channel, daysAgo):
    # try:
    d = datetime.today() - timedelta(days=int(daysAgo))
    date = d.strftime("%Y-%m-%d 00:00:00")
    # connection = db.session.connection()

    result = db.session.execute(
        text(
            f"SELECT time,pressure FROM public.node_{datalogger}_{channel} WHERE time >= '{date}';"
        )
    )

    lectures = [dict(r._mapping) for r in result]

    # if len(lectures) > 1:
    #     print(datalogger, channel, lectures[0], lectures[1])

    # else:
    #     print(datalogger, channel, lectures)

    timeArr = list(map(lambda x: x["time"].strftime("%Y-%m-%d %H:%M:%S"), lectures))
    pressureArr = list(
        map(
            lambda x: float(x["pressure"]) if str(float(x["pressure"])) != "nan" else 0,
            lectures,
        )
    )

    # Data for plotting
    t = timeArr
    s = pressureArr

    def testFunc(idx_and_item):
        index, item = idx_and_item

        if index % 20 == 0:
            return item
        else:
            return ""

    spacedTime = list(map(testFunc, enumerate(t)))

    fig = plt.figure(figsize=(16, 6))

    ax = fig.add_subplot(1, 1, 1)

    plt.plot(t, s)

    # ax.xaxis.set_major_locator(
    #     mdates.DayLocator(interval=(5))
    # )  # to get a tick every 15 minutes
    # ax.xaxis.set_major_formatter(
    #     mdates.DateFormatter("%Y-%m-%d")
    # )  # optional formatting

    plt.xticks(np.arange(len(spacedTime)), spacedTime, rotation=45)
    plt.xlabel("Dates")
    plt.ylabel("Pressure (KPa)")

    plt.grid(True)

    if len(pressureArr) != 0:
        plt.fill_between(t, s, min(pressureArr), color=["#477C9A"], alpha=0.1)

    plt.grid()

    now = datetime.now()
    dt_string = now.strftime("%Y%m%d%H%M%S")

    # filename = os.path.abspath(
    #     f"../client/dist/media/charts/{paddock}_{piezo}_{days}_{dt_string}.png"
    # )

    file_path = os.path.abspath(
        f"../client/public/sectionReport/readings/{datalogger}_{channel}.png"
    )

    filename = f"{datalogger}_{channel}.png"

    plt.savefig(file_path, bbox_inches="tight")

    plt.close("all")

    return filename


# except:
#     return "no readings"


@section_chart_routes.route("/api/v1/paddock-chart", methods=["GET"])
@cross_origin()
def build_paddocks_information_chart():
    result = piezometer_details.query.all()

    print("got piezos")

    piezos = dict_helper(result)

    print("processed piezos, entering build word function")

    build_word_report(piezos)
    return jsonify(
        {
            "message": "success",
            "results": len(piezos),
            "piezos": list(filter(lambda x: x["paddock"] == "E1/E2", piezos)),
        }
    )