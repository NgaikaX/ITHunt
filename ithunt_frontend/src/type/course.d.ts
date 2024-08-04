export interface CourseQueryType {
  coursename?: string;
  current?: number;
  pageSize?: number;
}
export interface CourseType {
  coursename: string;
  cover: string;
  description: string;
  uploaddate: string;
  id?: number;
}
export interface FeedbackQueryType {
  coursename?: string;
  course_id?: number;
  current?: number;
  pageSize?: number;
}
export interface FeedbackType {
  id?:number
  course_id: number;
  user_id: number;
  coursename: string;
  username: string;
  feedback: string;
  uploaddate: string;
}
