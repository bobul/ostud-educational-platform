export enum UserRole {
    student = 'student',
    teacher = 'teacher'
}
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    rd: Date | undefined;
    dob?: Date;
}