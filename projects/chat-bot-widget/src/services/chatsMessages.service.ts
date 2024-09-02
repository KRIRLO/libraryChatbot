import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ResponseMessage, SessionResponse } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatsMessagesService {

  constructor(
    private http: HttpClient,
  ) {}


  private messagesSource = new BehaviorSubject<SessionResponse[]>([]);
  messages$ : Observable<SessionResponse[]>= this.messagesSource.asObservable();

  updateMessages(messages: SessionResponse[]) {
    this.messagesSource.next(messages);

  }

  updateWhenSendMessage(send: string,messages: ResponseMessage) {
    const currentMessages = this.messagesSource.getValue();
    const newMessage: SessionResponse =
    {
      input: send,
      response: messages.response,
      datetime: messages.datetime
    }

    const updatedMessages = [...currentMessages, newMessage];

    // Emitir el array actualizado
    this.messagesSource.next(updatedMessages);
  }

  newChat(){
    this.messagesSource.next([]);
  }


  getMessages(): Observable<SessionResponse[]> {
    return this.messages$;
  }

  urlBase: string = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getChatsInSession(id: string): Observable<SessionResponse[]>{
    let url = `${this.urlBase}chatbot/historial`;
    return this.http.post<SessionResponse[]>(url,{session: id}, this.httpOptions);
  }
}
