import database as db
import ledaction as led
import nfcactions as nfc
import mail
import RPi.GPIO as GPIO
# to be defined
def check():
    check = bool
    check = True 
    return check

while(True):
    try:
        print(nfc.read())
        nfc.writeauth()

    finally:
        GPIO.cleanup()