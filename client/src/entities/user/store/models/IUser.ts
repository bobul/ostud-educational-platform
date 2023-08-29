export enum UserRole {
    student = 'student',
    teacher = 'teacher'
}
export interface IUser {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image: string | null;
    rd?: string;
    dob?: string;
}