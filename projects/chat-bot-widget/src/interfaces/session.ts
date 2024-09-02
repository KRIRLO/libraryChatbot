export interface Session {
  datetime: string;
  title: string;
  id: string;
}

export interface Sessions {
  sessions: Session[];
}
