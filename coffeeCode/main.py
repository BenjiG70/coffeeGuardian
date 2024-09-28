from mfrc522 import SimpleMFRC522
import database
import ledaction

reader = SimpleMFRC522() 

def readNFC():
    
    check = bool
    uid = reader.read()
    check = database.checkData(uid)
    print("check: ", check, "UID: ", uid)
    if(check):
        ledaction.blinkOnce(False, True, False)
        database.addCoffee(uid)
    else:
        ledaction.blinkThreeTimes(True, True, True)
        # mail.sendMailToAdmin(uid)
        database.Registration(uid)

while(True):
    readNFC()

