import request from "../utils/request";
import {
  SubmitQuizType,
  UserInfoQueryType,
  UserInfoType,
  UserQueryType,
  UserType,
} from "../type";
import qs from "qs";
import axios from "axios";



export async function getUserList(params?: UserQueryType) {
  return request.get(`/user/selectByPage?${qs.stringify(params)}`);
  //return request.get(`/api/user?${qs.stringify(params)}`);
}
export async function userAdd(params: UserType) {
  return request.post("/user/add", params);
}

export async function getUserDetails(id: string) {
  return request.get(`/api/user/${id}`);
}

export async function userDelete(id: string) {
  return request.delete(`/user/delete/${id}`);
}

export async function userUpdate(params: UserType) {
  return request.put(`/user/edit`, params);
}

export async function userLogin(params: Pick<UserType, "email" | "password">) {
  return request.post("/login", params);
}
export async function userLogout() {
  return request.get("/api/logout");
}
export async function userInfoAdd(params: UserInfoType) {
  return request.post("/api/userinfo", params);
}
export async function getUserInfoList(params?: UserInfoQueryType) {
  return request.get(`/api/userinfo?${qs.stringify(params)}`);
}
export async function getUserCourseList() {
  return request.get(`/api/usercourse`);
}
export async function getUserQuizList() {
  return request.get(`/api/userquiz`);
}

export async function submitQuiz(params: SubmitQuizType) {
  return request.post("/api/submitquiz", params);
}
