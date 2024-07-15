export interface MessagesType {
  sender_id: string;
  reciever_id?: string;
  sender_name: string;
  id: string;
  senttime: string;
  language: string;
  interests: string[];
  read: string;
  contact: string;
}

export interface MessagesQueryType {
  reciever_id?: string;
  read?: string;
}
