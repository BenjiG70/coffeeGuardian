
from mfrc522 import SimpleMFRC522

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
    id, text = reader.read()
    return "to be defined"
    

def write(writeval:str):
    print("Wait for NFC Card...")

    # Scanne die Karte
    reader.read_id()
    reader.write(writeval)

    print(f"written: {writeval}")
    

def writeauth(auth:bool=False):
    reader.read_id()
    reader.write("auth: " + str(auth))
    print(f"written: {auth}")