export interface coffeeData {
  ID:number;
  UID:string;
  TIME:string;
}

export interface userData {
  UID:string;
  REGISTERED_SINCE:string;
  SURNAME:string;
  NAME:string;
  MAIL:string;
  CREDIT:number;
  COFFEE_COUNT:number;
}

export interface logData {
  ID:number;
  TagID:string;
  TIME:string;
  STATUS:boolean;
}

export interface apiDataCof {
  [key:string]: coffeeData;
}
export interface apiDataUser {
  [key:string]: userData;
}
export interface apiDataLog {
  [key:string]: logData;
}
export interface newUserLogStats {
  [key:number]: number; //month (1-12): value 
}
export interface generalLogStats {
  Status:number;
  VALUE:number;
}