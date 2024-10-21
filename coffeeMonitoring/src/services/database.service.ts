import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiDataCof, apiDataGLS, apiDataLog, apiDataUser, generalLogStats, userData } from '../datatypes/database_interaction'


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://192.168.178.63:4202'; //API-URL

  constructor(private http: HttpClient) {}

  /**
   * Ruft alle Sensordaten von der API ab.
   */
  getAllUsers(): Observable<apiDataUser> {
    return this.http.get<apiDataUser>(`${this.apiUrl}/get/all/user`);
  }
  getAllLogs(): Observable<apiDataLog> {
    return this.http.get<apiDataLog>(`${this.apiUrl}/get/all/log`);
  }
  getAllCoffee(): Observable<apiDataCof> {
    return this.http.get<apiDataCof>(`${this.apiUrl}/get/all/coffee`);
  }
  getActualCoffee(): Observable<apiDataCof> {
    return this.http.get<apiDataCof>(`${this.apiUrl}/get/actual/coffee`);
  }
  getWeeklyCoffee(): Observable<apiDataCof> {
    return this.http.get<apiDataCof>(`${this.apiUrl}/get/week/coffee`);
  }
  getYearCoffee(): Observable<apiDataCof> {
    return this.http.get<apiDataCof>(`${this.apiUrl}/get/yearly/coffee`);
  }
  getYearRegisteredUser(): Observable<apiDataUser> {
    return this.http.get<apiDataUser>(`${this.apiUrl}/get/yearly_registered/user`);
  }
  getUnregisteredUser(): Observable<apiDataLog> {
    return this.http.get<apiDataLog>(`${this.apiUrl}/get/unregistered/user`);
  }

  updateCredit(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update/credit`, data);
  }
  updateUser(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update/user`, data);
  }
  insertUser(data: userData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insert/user`, data);
  }
  getYearLogStats():Observable<apiDataGLS> {
    return this.http.get<apiDataGLS>(`${this.apiUrl}/get/yearly/log`);
  }
}