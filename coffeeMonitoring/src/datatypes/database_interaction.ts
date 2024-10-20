export interface coffeeData {
  ID:number;
  UID:string;
  TIME:Date;
}

export interface userData {
  UID:string;
  REGISTERED_SINCE:Date;
  SURNAME:string;
  NAME:string;
  MAIL:string;
  CREDIT:number;
  COFFEE_COUNT:number;
}

export interface logData {
  ID:number;
  TagID:string;
  TIME:Date;
  STATUS:boolean;
}

export interface apiData {
  [key:string]: coffeeData | userData | logData;
}
