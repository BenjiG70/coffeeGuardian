import smtplib
from email.message import EmailMessage
# ToDo: Mail process 

msg = EmailMessage()
admins = [""]

def sendMailToAdmin(uid:str):
    msg.set_content = ""

    msg['Subject'] = "test"
    msg['From'] = "me"
    msg['To'] = "you"

    smtp = smtplib.SMTP('localhost') #Server has to be defined
    smtp.send_message(msg)
    smtp.quit