import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiData } from '../datatypes/database_interaction'


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://192.168.178.63:4202'; //API-URL

  constructor(private http: HttpClient) {}

  /**
   * Ruft alle Sensordaten von der API ab.
   */
  getAllUsers(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/all/user`);
  }

  getAllCoffee(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/all/coffee`);
  }
  getActualCoffee(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/actual/coffee`);
  }
  getWeeklyCoffee(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/week/coffee`);
  }
  getYearCoffee(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/yearly/coffee`);
  }
  getYearRegisteredUser(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/yearly_registered/user`);
  }
  getUnregisteredUser(): Observable<apiData> {
    return this.http.get<apiData>(`${this.apiUrl}/get/unregistered/user`);
  }

  updateCredit(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update/credit`, data);
  }
  updateUser(data:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update/credit`, data);
  }
}