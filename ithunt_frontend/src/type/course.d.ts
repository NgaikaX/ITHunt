export interface CourseQueryType {
  coursename?: string;
  current?: number;
  pageSize?: number;
}
export interface CourseType {
  coursename: string;
  cover: string;
  description: string;
  lecturer: string;
  uploaddate: string;
  id?: number;
}
export interface FeedbackQueryType {
  coursename?: string;
  course_id?: string;
  current?: number;
  pageSize?: number;
}
export interface FeedbackType {
  course_id: string;
  coursename: string;
  username: string;
  feedback: string;
  uploaddate: string;
}
