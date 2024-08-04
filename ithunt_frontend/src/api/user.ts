import request from "../utils/request";
import {
  MessageType,
  SubmitQuizType,
  UserInfoType,
  UserQueryType,
  UserType,
} from "../type";
import qs from "qs";

export async function getUserList(params?: UserQueryType) {
  return request.get(`/user/selectByPage?${qs.stringify(params)}`);
}
export async function userAdd(params: UserType) {
  return request.post("/user/add", params);
}
export async function getUserDetails(id: number) {
  return request.get(`/user/details/${id}`);
}
export async function userDelete(id: number) {
  return request.delete(`/user/delete/${id}`);
}
export async function userUpdate(params: UserType) {
  return request.put(`/user/update`, params);
}
export async function userLogin(params: Pick<UserType, "email" | "password">) {
  return request.post("/login", params);
}
export async function userLogout() {
  return request.get("/api/logout");
}
/**
* User Info
* */
export async function userInfoAdd(params: UserInfoType) {
  return request.post("/userinfo/add", params);
}
export async function getUserInfoList(user_id: number) {
  return request.get("/userinfo/getStudyPartners",{params: { user_id } });
}
export async function getUserInfo(user_id: number) {
  return request.get("/userinfo/getUserInfo",{params: { user_id } });
}
/**
* User Course
* */
export async function getUserCourseList(user_id: number) {
  return request.get("/userCourse/UserCourseList",{params: { user_id } });
}
export async function updateCourseComplete({ courseId, userId }) {
  return request.put("/userCourse/updateComplete",{ courseId, userId });
}
export async function getCourseCompletion(user_id: number) {
  return request.get("/userCourse/courseCompletion",{params: { user_id } });
}
/**
* User Quiz
* */
export async function getUserQuizList(user_id: number) {
  return request.get("/userQuiz/userQuizList",{params: { user_id } });
}
export async function getUserQuizByCourse(userId, courseId ) {
  return request.get("/userQuiz/getUserQuizByCourse",{params: { userId, courseId }});
}
export async function submitQuiz(params: SubmitQuizType[]) {
  return request.post("/userQuestion/submitQuiz", params);
}
export async function getQuizCompletion(user_id: number) {
  return request.get("/userQuiz/quizCompletion",{params: { user_id } });
}
export async function getUserQuestionAnswer(userId, courseId ) {
  return request.get("/userQuestion/getUserQuestionAnswer",{params: { userId, courseId }});
}





