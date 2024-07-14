import { USER_ROLE, USER_STATUS } from "./../constants/index";

export interface UserQueryType {
  email?: string;
  role?: USER_ROLE;
  current?: number;
  pageSize?: number;
  all?: boolean;
}

export interface UserType {
  username: string;
  email: string;
  role: USER_ROLE;
  status: USER_STATUS;
  password: string;
  id?: string;
}
export interface UserLoginType {
  email: string;
  password: string;
}
