import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loginUrl = `${environment.apiUrl}user/login`;

  constructor(private http: HttpClient) { }

  login(email: string): Observable<any> {
    const body = { email: email };
    return this.http.post<any>(this.loginUrl, body);
  }
}
