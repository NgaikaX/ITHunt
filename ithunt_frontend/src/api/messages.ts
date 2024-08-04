import {MessagesQueryType, MessageType} from "@/type";
import request from "@/utils/request";
import qs from "qs";

export async function getMessagesList(user_id: number) {
  return request.get("/message/getMessage",{params: { user_id } });
}
export async function messagesUpdate(id: number) {
  return request.put(`/message/updateUserMessage?id=${id}`);
}
export async function sendMessage(params: MessageType) {
  return request.post("/message/add", params);
}
export async function messagesDelete(id: number) {
  return request.delete(`/message/delete?id=${id}`);
}
