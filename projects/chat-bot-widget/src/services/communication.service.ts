import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { SendMessage, ResponseMessage} from '../interfaces/chat';


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(
    private http: HttpClient,
  ) { }

  urlBase: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  sendMessage(question: SendMessage): Observable<ResponseMessage>{
    let url = `${this.urlBase}chatbot/chat`;
    return this.http.post<ResponseMessage>(url, question, this.httpOptions);
  }

  // getConversation(): Observable<getConversation>{
  //   let url = `${this.urlBase}getConversation`;
  //   return this.http.get<getConversation>(url, this.httpOptions);
  // }



}
