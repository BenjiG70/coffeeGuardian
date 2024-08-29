import sqlite3
import datetime

connection = sqlite3.connect('coffeeguardian.db')
cursor = sqlite3.Cursor(connection)

def builddatabase():
    
    sql="""
        CREATE TABLE IF NOT EXISTS 
        USER(
        UID TEXT PRIMARY KEY,
        SURNAME TEXT,
        NAME TEXT,
        MAIL TEXT,
        COFFEE_COUNT NUMBER
        );
    """
    cursor.execute(sql)
    sql = """
        CREATE TABLE IF NOT EXISTS 
        COFFEE(
        UID TEXT,
        TIME DATETIME,
        FOREIGN KEY (UID) REFERENCES USER(UID)
        )
    """
    cursor.execute(sql)
    sql="""
        CREATE TABLE IF NOT EXISTS
        REGISTRATION(
        UID TEXT,
        DATE DATETIME,
        FOREIGN KEY (UID) REFERENCES USER(UID)
    );"""
    cursor.execute(sql)
    connection.commit()

def checkData(uid:str):
    sql="""
        SELECT * FROM USER WHERE UID = ?
    """
    cursor.execute(sql, (uid,))
    response = cursor.fetchall()
    if(response != []):
        return True
    else:
        return False

def addCoffee(uid:str, date=datetime.datetime.now()):
    sql="""
        INSERT INTO COFFEE(UID,TIME)
        VALUES(?, ?)
    """
    date_str = date.isoformat()

    cursor.execute(sql, (uid, date_str))
    connection.commit()

def addUser(uid:str, name:str, surname:str, email:str, coffee_count=0):
    sql="""
        INSERT INTO USER(UID, NAME, SURNAME, MAIL, COFFEE_COUNT) 
        VALUES(?, ?, ?, ?, ?);
    """
    cursor.execute(sql, (uid, name, surname, email, coffee_count,))
    connection.commit()

def Registration(uid:str, date=datetime.datetime.now()):
    sql="""
        INSERT INTO REGISTRATION(UID,DATE)
        VALUES(?, ?)
    """
    date_str = date.isoformat()

    cursor.execute(sql, (uid, date_str))
    connection.commit()

def resetCoffee(uid:str):
    sql="""
        UPDATE TABLE USER
        SET COFFEE_COUNTER = 0
        WHERE UID = ?
    """

    cursor.execute(sql, (uid,))
    connection.commit()

def getAlltimeDataUser(uid:str):
    sql="""
        SELECT * FROM COFFEE WHERE UID = ?
    """
    cursor.execute(sql, (uid,))
    response = cursor.fetchall()
    if(response != []):
        return response
    else:
        return "[ERROR|404]: no data found"

def getLastMonthDataUser(uid:str):
    current_datetime = datetime.datetime.now()
    first = current_datetime.replace(day=1)
    current_datetime_str = current_datetime.isoformat()
    first_str = first.isoformat()
    sql="""
        SELECT * FROM COFFEE WHERE UID = ? AND DATE BETWEEN ? AND ? 
    """
    cursor.execute(sql, (uid, first_str, current_datetime_str))
    response = cursor.fetchall()
    if(response != []):
        return response
    else:
        return "[ERROR|404]: no data found"
    
def getAlltimeData():
    sql="""
        SELECT * FROM COFFEE
    """
    cursor.execute(sql)
    response = cursor.fetchall()
    if(response != []):
        return response
    else:
        return "[ERROR|404]: no data found"

def getLastMonthData():
    current_datetime = datetime.datetime.now()
    first = current_datetime.replace(day=1)
    current_datetime_str = current_datetime.isoformat()
    first_str = first.isoformat()

    sql="""
        SELECT * FROM COFFEE WHERE TIME BETWEEN ? AND ? 
    """
    cursor.execute(sql, (first_str, current_datetime_str))
    response = cursor.fetchall()
    if(response != []):
        return response
    else:
        return "[ERROR|404]: no data found"

# testdata
# builddatabase()
# print(checkData("test"))
# addCoffee("test")
# print(getAlltimeData())
connection.close()