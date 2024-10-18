import database as db
import ledaction as led
import nfcactions as nfc
import mail

# to be defined
def check():
    check = bool
    check = True 
    return check

while(True):
    print(nfc.read())
    nfc.writeauth()