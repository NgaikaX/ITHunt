import {
  INTEREST,
  LANGUAGE,
  USER_ROLE,
  USER_STATUS,
} from "./../constants/index";

export interface UserQueryType {
  username?: string;
  role?: USER_ROLE;
  pageNum?: number;
  pageSize?: number;
  all?: boolean;
}

export interface UserType {
  username: string;
  email: string;
  role: USER_ROLE;
  status: USER_STATUS;
  password: string;
  id: number;
  uploaddate: string;
  token: string;
}
export interface UserLoginType {
  email: string;
  password: string;
}
export interface UserInfoType {
  userId: number;
  username: string;
  language: LANGUAGE;
  interest: INTEREST;
  contact: string;
}

export interface UserCourseType {
  id: string;
  complete: string;
  coursename: string;
  userid: string;
  finishdate: string;
}
export interface UserQuizType {
  id: string;
  complete: string;
  coursename: string;
  userid: string;
  finishdate: string;
  score: string;
}

export interface SubmitQuizType {
  userId: number;
  questionId:number;
  userAnswer: string;
  submitTime: string;
  coursename: string;
}

