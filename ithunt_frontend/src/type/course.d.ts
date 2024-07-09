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
}
export interface FeedbackQueryType {
  coursename?: string;
  current?: number;
  pageSize?: number;
}
