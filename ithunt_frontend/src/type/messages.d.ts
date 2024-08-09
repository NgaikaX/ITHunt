import {INTEREST, LANGUAGE} from "@/constants";

export interface MessageType {
  senderId: number;
  recieverId: number;
  senderName: string;
  contact: string;
  interest: INTEREST;
  language: LANGUAGE;
  read:boolean;
  id?:number;
}

export interface MessagesQueryType {
  recieverId?: number;
  senderId?:number;
}
