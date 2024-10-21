## import extra files
import ledaction as led
import nfcactions as nfc

## import librarys
import sqlite3
from datetime import datetime
import os

current_dir = os.path.dirname(__file__)
db_path = os.path.join(current_dir, '../database/coffeeguardian.sqlite')

def connect():
    connection = sqlite3.connect(db_path)
    cursor = sqlite3.Cursor(connection)
    return connection, cursor

## init tables if they doesn´t exists already
def builddatabase():
    connection, cursor = connect()
    sql="""
        CREATE TABLE IF NOT EXISTS 
        USER(
        UID NUMBER PRIMARY KEY,
        REGISTERED_SINCE DATETIME,
        SURNAME TEXT,
        NAME TEXT,
        MAIL TEXT,
        CREDIT NUMBER,
        COFFEE_COUNT NUMBER
        );
    """
    cursor.execute(sql)
    sql = """
        CREATE TABLE IF NOT EXISTS 
        COFFEE(
        ID NUMBER PRIMARY KEY,
        UID NUMBER,
        TIME DATETIME,
        FOREIGN KEY (UID) REFERENCES USER(UID)
        )
    """
    cursor.execute(sql)
    sql = """
        CREATE TABLE IF NOT EXISTS 
        LOG(
        ID NUMBER PRIMARY KEY,
        TagID NUMBER,
        TIME DATETIME,
        STATUS BOOLEAN
        )
    """
    cursor.execute(sql)
    connection.commit()
    connection.close()
## check if user is registered
def checkUser(uid:str):
    connection, cursor = connect()
    sql="""
        SELECT * FROM USER WHERE UID = ?
    """
    cursor.execute(sql, (uid,))
    response = cursor.fetchall()
    connection.close()
    if(response != []):
        return True
    else:
        return False

## check if auth on card is correct
def checkAuth(uid:str, authToken:str):
    connection, cursor = connect()
    sql="""
        SELECT ID FROM LOG WHERE TagID = ? AND TIME = ?
    """
    cursor.execute(sql,(uid, authToken))
    response = cursor.fetchall()
    connection.close()
    if(response != []):
        return True
    else:
        return False

## add coffee to user in coffee table
def addCoffee(uid:str, date=datetime.now()):
    connection, cursor = connect()
    sql="""
        INSERT INTO COFFEE(UID,TIME)
        VALUES(?, ?)
    """
    date_str = date.isoformat()

    cursor.execute(sql, (uid, date_str))
    connection.commit()
    connection.close()
## write every input with tagID, time and status
def writeLog(uid:str, status:bool, current_time:datetime):
    connection, cursor = connect()
    l_id = getMaxID("LOG") +1 
    sql="""
        INSERT INTO LOG(ID, TagID, TIME, STATUS) VALUES(?,?,?,?)
    """
    cursor.execute(sql,(l_id, uid, current_time, status))
    connection.commit()
    connection.close()
## get maximum ID from given table
def getMaxID(table:str):
    connection, cursor = connect()
    sql = f"SELECT MAX(id) FROM {table}"
    cursor.execute(sql)
    result = cursor.fetchone()
    connection.close()
    return result[0] if result[0] is not None else 0

## get all unregistered cards from logs
def unregisteredUser():
    connection, cursor = connect()
    sql="""
        SELECT l.* 
        FROM LOG l
        LEFT JOIN USER u ON l.TagID = u.UID
    """
    cursor.execute(sql)
    response = cursor.fetchall()
    connection.close()
    return response

## add user 
def addUser(uid:str, name:str, surname:str, email:str, coffee_count=0):
    connection, cursor = connect()
    sql="""
        INSERT INTO USER(UID, NAME, SURNAME, MAIL, COFFEE_COUNT) 
        VALUES(?, ?, ?, ?, ?);
    """
    cursor.execute(sql, (uid, name, surname, email, coffee_count,))
    connection.commit()
    connection.close()

## add coffee-credit by defined amount
def addCrediByUID(uid:str, amount:float):
    connection, cursor = connect()
    sql="""
        UPDATE USER
        SET CREDIT = CREDIT + ?
        WHERE UID = ?
    """
    cursor.execute(sql, (amount, uid,))
    connection.commit()
    connection.close()

def addCreditByMail(mail:str, amount:float):
    connection, cursor = connect()
    sql="""
        UPDATE USER
        SET CREDIT = CREDIT + ?
        WHERE Mail = ?
    """
    cursor.execute(sql, (amount, mail,))
    connection.commit()
    connection.close()
## remove / subtract coffee-credit by defined amount
def rmCrediByUID(uid:str, amount:float):
    connection, cursor = connect()
    sql="""
        UPDATE USER
        SET CREDIT = CREDIT - ?
        WHERE UID = ?
    """
    cursor.execute(sql, (amount, uid,))
    connection.commit()
    connection.close()

def rmCreditByMail(mail:str, amount:float):
    connection, cursor = connect()
    sql="""
        UPDATE USER
        SET CREDIT = CREDIT - ?
        WHERE Mail = ?
    """
    cursor.execute(sql, (amount, mail,))
    connection.commit()
    connection.close()

def cardOnReader(uid:str, authToken:str):
    check = checkUser(uid)
    auth = checkAuth(uid, authToken)
    now = datetime.now()
    writeLog(uid, check, now)
    if(check and auth):
        addCoffee(uid, now)
        rmCrediByUID(uid, 0.25)
        led.valid()
        nfc.writeauth(now)
    else:
        led.invalid()
    
    # connection.close()
## functions for statistics
def getAlltimeDataUser(uid:str):
    connection, cursor = connect()
    sql="""
        SELECT * FROM COFFEE WHERE UID = ?
    """
    cursor.execute(sql, (uid,))
    response = cursor.fetchall()
    connection.close()
    if(response != []):
        return response
    else:
        return "[ERROR|404]: no data found"

def getLastMonthDataUser(uid:str):
    connection, cursor = connect()
    current_datetime = datetime.now()
    first = current_datetime.replace(day=1)
    current_datetime_str = current_datetime.isoformat()
    first_str = first.isoformat()
    sql="""
        SELECT * FROM COFFEE WHERE UID = ? AND DATE BETWEEN ? AND ? 
    """
    cursor.execute(sql, (uid, first_str, current_datetime_str))
    response = cursor.fetchall()
    connection.close()
    if(response != []):
        return response
    else:
        return "[ERROR|404]: no data found"
    
    
def getAlltimeData():
    connection, cursor = connect()
    sql="""
        SELECT * FROM COFFEE
    """
    cursor.execute(sql)
    response = cursor.fetchall()
    connection.close()
    if(response != []):
        return response
    else:
        return "[ERROR|404]: no data found"
    

def getLastMonthData():
    connection, cursor = connect()
    current_datetime = datetime.now()
    first = current_datetime.replace(day=1)
    current_datetime_str = current_datetime.isoformat()
    first_str = first.isoformat()

    sql="""
        SELECT * FROM COFFEE WHERE TIME BETWEEN ? AND ? 
    """
    cursor.execute(sql, (first_str, current_datetime_str))
    response = cursor.fetchall()
    connection.close()
    if(response != []):
        return response
    else:
        return "[ERROR|404]: no data found"
    
    
