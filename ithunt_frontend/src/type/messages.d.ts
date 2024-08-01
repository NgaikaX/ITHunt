import {INTEREST, LANGUAGE} from "@/constants";

export interface MessageType {
  senderId: number;
  recieverId: number;
  senderName: string;
  contact: string;
  interest: INTEREST;
  language: LANGUAGE;
}

export interface MessagesQueryType {
  recieverId?: number;
  senderId?:number;
}
