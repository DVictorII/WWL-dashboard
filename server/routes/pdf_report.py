from flask import Blueprint, jsonify, request
from flask_cors import  cross_origin
from app import  db, dict_helper
from datetime import datetime, timedelta, date
from sqlalchemy import text
import kml2geojson

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from fpdf import FPDF

import os

pdf_report_routes = Blueprint('pdf_report_routes', __name__)


class PDF(FPDF):
    def header(self):
        self.image(os.path.abspath("../client/public/media/img/photos") + "\\" + "rossing_logo.png", 10,8, 30)
        
        self.image(os.path.abspath("../client/public/media/img/photos") + "\\" + "wwl-black.png", (self.w -40) ,14, 30)

        self.ln(40)

last_node = 0


def create_chart(paddock, piezo, days, initial_pressure,dates):
    def get_pressure_as_float(p):
        return float(p)

    # def getDate(obj): 
    #     return obj['time']

    pressure = list(map(get_pressure_as_float, initial_pressure))
    # dates = list(map(getDate, lectures))

    # Data for plotting
    t = dates
    s = pressure

    plt.plot(t,s)

    plt.xlabel('Dates')
    plt.ylabel('Pressure (KPa)')
    plt.xticks(visible=False)
    plt.fill_between(t, s, min(pressure), color=['#477C9A'], alpha=.1)

    plt.grid()

    now = datetime.now()
    dt_string = now.strftime("%Y%m%d%H%M%S")

    
    filename = os.path.abspath( "../client/public/media/charts") + "\\" + f"{paddock}_{piezo}_{days}_{dt_string}.png"
    chart_filename = f"{paddock}_{piezo}_{days}_{dt_string}.png"
    print("FILENAME", filename)

    
    plt.savefig(filename)
    return chart_filename



def create_pdf(title,description,paddock, piezo, date, averagePWP, inoperativeDates,days, chart_filename, sectionURL, lecturesDates):
    pdf = PDF('P','mm','Letter')

    pdf.set_auto_page_break(auto=True, margin=15)
    #Add a page
    pdf.add_page()
    pdf.set_text_color(34,34,34)


    #TITLE
    pdf.set_font('helvetica','',20)
    pdf.cell(0,10,title)
    pdf.ln(18)

    #SEPARATION LINE
    pdf.set_fill_color(241,245,249)
    pdf.cell(0,0.5,'', fill=True)
    pdf.ln(18)


    #DESCRIPTION
    pdf.set_font('helvetica','',12)
    pdf.cell(0,10,description)
    pdf.ln(24)

    #SUBTITLE
    pdf.set_font('helvetica','U',16)
    pdf.cell(0,10,'Piezo information')
    pdf.ln(18)


    pdf.set_font('helvetica','',14)
    pdf.cell(50,10,'Paddock section: ')

    pdf.set_font('helvetica','',12)
    pdf.cell(20,10,paddock)
    pdf.ln(20)


    pdf.set_font('helvetica','',14)
    pdf.cell(50,10,'Piezometer ID: ')

    pdf.set_font('helvetica','',12)
    pdf.cell(20,10,piezo)
    pdf.ln(20)


    pdf.set_font('helvetica','',14)
    pdf.cell(50,10,'Inspection date: ')

    pdf.set_font('helvetica','',12)
    pdf.cell(20,10,date)
    pdf.ln(20)


    if len(lecturesDates) !=0:
        pdf.set_font('helvetica','',14)
        pdf.cell(50,10, f'Average PWP (From {lecturesDates[0]} to {lecturesDates[len(lecturesDates)-1]}): ')

        pdf.ln(12)

        pdf.set_font('helvetica','',12)
        pdf.cell(20,10, f'{averagePWP} KPa')
        pdf.ln(20)
    else:
        pdf.set_font('helvetica','',14)
        pdf.cell(20,10, f'No recent lectures for {days} days span')
        pdf.ln(20)

    if len(inoperativeDates) != 0:
        pdf.set_font('helvetica','',14)
        pdf.cell(50,10, f'Inoperative dates (From {inoperativeDates[0]["currentDate"]} to today): ')

        pdf.ln(12)

        pdf.set_font('helvetica','',12)

        for obj in inoperativeDates:        
            pdf.cell(20,10,f'{obj["inoperativeDays"]} days: from {obj["currentDate"]} to {obj["nextDate"]}')
        

    pdf.ln(500)

    if chart_filename != "None":
        #SUBTITLE
        pdf.set_font('helvetica','U',16)
        pdf.cell(0,10,f'Latest piezometer lectures ( last {days} days )')
        pdf.ln(20)

        pdf.image(os.path.abspath("../client/public/media/charts") + "\\" + chart_filename,10,60,pdf.w-20)
        pdf.ln(500)

    if sectionURL != "None":
    #SUBTITLE
        pdf.set_font('helvetica','U',16)
        pdf.cell(0,10,'Section graph')
        pdf.ln(20)

    #SECTION IMG
    

        pdf.image(os.path.abspath("../client/public/media/img/sections") + "\\" + sectionURL,10,80,pdf.w-20)

    now = datetime.now()
    dt_string = now.strftime("%Y%m%d%H%M%S")

    
    save_filename = os.path.abspath("../client/public/report_pdf") + "\\" + f"{paddock}_{piezo}_{days}_{dt_string}.pdf"
    download_filename = f"{paddock}_{piezo}_{days}_{dt_string}.pdf"
    pdf.output(save_filename)

    return download_filename


@pdf_report_routes.route('/api/v1/create-pdf', methods=['POST'])
@cross_origin()
def save_pdf():

    title = request.json["title"]
    description = request.json["description"]
    paddock = request.json["paddock"]
    piezo = request.json["piezo"]
    days = request.json["days"]
    date = request.json["date"]
    averagePWP = request.json["averagePWP"]
    inoperativeDates = request.json["inoperativeDates"]
    lecturesDates = request.json["lecturesDates"]
    lecturesPressure = request.json["lecturesPressure"]
    sectionURL = request.json["sectionURL"]
    photo = request.json["photo"]
    supervisors=request.json["supervisors"].split(",")

    # print({"supervisors":supervisors,
    #        "title":title,
    #        "description":description,
    #        "paddock":paddock,
    #        "piezo":piezo,
    #        "days":days,
    #        "date":date,
    #        "averagePWP":averagePWP,
    #        "inoperativeDates":inoperativeDates,
    #        "lecturesPressure":lecturesPressure,
    #        "sectionURL":sectionURL,
    #        "photo":photo
    #        })

    # print("lecturesDates", lecturesDates)
  
    if len(lecturesDates) != 0 and len(lecturesPressure) != 0:
        chart_filename = create_chart(paddock, piezo, days,lecturesPressure,lecturesDates)
        filename = create_pdf(title, description, paddock, piezo, date, averagePWP, inoperativeDates, days, chart_filename, sectionURL, lecturesDates)
        
        return jsonify({
            "filename": filename,
            # "chart_filename": chart_filename
        })
    else:
        chart_filename ="None"
        filename = create_pdf(title, description, paddock, piezo, date, averagePWP, inoperativeDates, days, chart_filename, sectionURL, lecturesDates)
        return jsonify({
            "filename": filename,
        })
    
    