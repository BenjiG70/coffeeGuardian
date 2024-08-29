from mfrc522 import SimpleMFRC522
import database
import coffeeCode.mail as mail

reader = SimpleMFRC522() 

def readNFC():
    
    check = bool
    uid = reader.read()
    check = database.checkData(uid)
    if(check):
        # green led blinks 1 time
        database.addCoffee(uid)
    else:
        # green and red led blinks 3 times (green on, green off, red on, red off, ...)
        mail.sendMailToAdmin(uid)
        database.Registration(uid)

while(True):
    readNFC()

