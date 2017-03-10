//user 
export interface User{
    id?: string;
    matricNum: string,
	password: string,
	name: string, 
	email:string,
	phoneNum: Number,
	school:string,
	courses?: [string]
}
export interface CourseList{
	CourseList: [string]
}