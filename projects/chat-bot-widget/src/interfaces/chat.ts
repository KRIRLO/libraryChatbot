export interface Chat {
  session: string;
}

export interface SessionResponse{
  input: string,
  response: string,
  datetime: Date
}

export interface SendMessage{
  language: string;
  request: string;
  email: string;
  session: string;
}

export interface ResponseMessage {
  response: string;
  datetime: Date;
}

export interface Messages{
  sender:string,
  content: string,
  timestamp: Date;
}

export interface GroupedMessages {
  date: string;
  messages: Messages[];
}
