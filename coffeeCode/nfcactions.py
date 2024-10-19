## import librarys
from mfrc522 import SimpleMFRC522
from datetime import datetime

reader = SimpleMFRC522()

def read():
    print("Wait for NFC Card...")

    # scan card, get uid and auth
    id, text= reader.read()
    #return the id
    #clean the pins
    return id
    

def readAuth():
    # scan card, get uid and auth (written on card)
    id, auth = reader.read()
    return auth

def readIdAndAuth():
    id, auth = reader.read()
    return id, auth
    

def write(writeval:str):
    print("Wait for NFC Card...")

    # Scanne die Karte
    reader.read_id()
    reader.write(writeval)

    print(f"written: {writeval}")
    

def writeauth(auth:str):
    reader.read_id()
    reader.write("auth: " + str(auth))
    print(f"written: {auth}")