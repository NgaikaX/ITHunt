import request from "../utils/request";
import { UserQueryType, UserType } from "../type";
import qs from "qs";
import axios from "axios";

export async function getUserList(params?: UserQueryType) {
  return request.get(`/api/user?${qs.stringify(params)}`);
}
export async function userAdd(params: UserType) {
  return request.post("/api/user", params);
}

export async function getUserDetails(id: string) {
  return request.get(`/api/user/${id}`);
}

export async function userDelete(id: string) {
  return request.delete(`/api/user/${id}`);
}

export async function userUpdate(params: UserType) {
  return request.put(`/api/user`, params);
}
