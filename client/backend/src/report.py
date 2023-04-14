from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.image('rossing_logo.png', 10,8, 30)
        
        self.image('wwl-black.png', (self.w -40) ,14, 30)

        self.ln(40)


pdf = PDF('P','mm','Letter')

pdf.set_auto_page_break(auto=True, margin=15)
#Add a page
pdf.add_page()
pdf.set_text_color(34,34,34)



#TITLE
pdf.set_font('helvetica','',20)
pdf.cell(0,10,'First Report Test - 2023 / 03 / 01')
pdf.ln(18)

#SEPARATION LINE
pdf.set_fill_color(241,245,249)
pdf.cell(0,0.5,'', fill=True)
pdf.ln(18)


#DESCRIPTION
pdf.set_font('helvetica','',12)
pdf.cell(0,10,'Use these reports to keep track of any evaluation on a piezometer')
pdf.ln(24)

#SUBTITLE
pdf.set_font('helvetica','U',16)
pdf.cell(0,10,'Piezo information')
pdf.ln(18)




pdf.set_font('helvetica','',14)
pdf.cell(50,10,'Paddock section: ')

pdf.set_font('helvetica','',12)
pdf.cell(20,10,'CDIII')
pdf.ln(20)




pdf.set_font('helvetica','',14)
pdf.cell(50,10,'Piezometer ID: ')

pdf.set_font('helvetica','',12)
pdf.cell(20,10,'VW-CD3-02')
pdf.ln(20)




pdf.set_font('helvetica','',14)
pdf.cell(50,10,'Inspection date: ')

pdf.set_font('helvetica','',12)
pdf.cell(20,10,'2023 - 03 - 01')
pdf.ln(20)





pdf.set_font('helvetica','',14)
pdf.cell(50,10,'Average PWP (From 2022-11-28 to today): ')

pdf.ln(12)

pdf.set_font('helvetica','',12)
pdf.cell(20,10,'55.931 KPa')
pdf.ln(20)





pdf.set_font('helvetica','',14)
pdf.cell(50,10,'Inoperative dates (From 2023-01-21 to today): ')

pdf.ln(12)

pdf.set_font('helvetica','',12)
pdf.cell(20,10,'17 days: from 2023-01-21 21:00:00 to 23-02-07 13:00:00')
pdf.ln(500)






#SUBTITLE
pdf.set_font('helvetica','U',16)
pdf.cell(0,10,'Latest piezometer lectures ( last 100 days )')
pdf.ln(20)

pdf.image('test.png',10,60,pdf.w-20)
pdf.ln(500)




#SUBTITLE
pdf.set_font('helvetica','U',16)
pdf.cell(0,10,'Section graph')
pdf.ln(20)

#SECTION IMG
pdf.image('Section.png',10,80,pdf.w-20)







pdf.output('pdf_1.pdf')