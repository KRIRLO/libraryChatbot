import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Session } from '../interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(
    private http: HttpClient,
  ) {}

  urlBase: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getSessions(): Observable<Session[]>{
    const email: string = localStorage.getItem('userEmail') || '';
    let url = `${this.urlBase}chatbot/sessions`;
    return this.http.post<Session[]>(url,{email}, this.httpOptions);
  }
}
