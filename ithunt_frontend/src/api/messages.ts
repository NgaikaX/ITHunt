import { MessagesQueryType, MessagesType } from "@/type";
import request from "@/utils/request";
import qs from "qs";

export async function getMessagesList(params?: MessagesQueryType) {
  return request.get(`/api/messages?${qs.stringify(params)}`);
}
export async function messagesSent(params: MessagesType) {
  return request.post("/api/messages", params);
}
export async function messagesDetails(id: string) {
  return request.get(`/api/messagesdetails/${id}`);
}
export async function messagesUpdate(params: MessagesType) {
  return request.put(`/api/messages`, params);
}
