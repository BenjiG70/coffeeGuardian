## import extra files
import database as db
import nfcactions as nfc
import mail

## import librarys
import RPi.GPIO as GPIO

try:
    while(True):
            uid, auth = nfc.readIdAndAuth()
            db.cardOnReader(uid, auth)
finally:
    GPIO.cleanup()