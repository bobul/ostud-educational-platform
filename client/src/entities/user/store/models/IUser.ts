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
    image: string | undefined;
    rd: string;
    dob: string;
    activationLink: string;
    isActivate: boolean;
}

export interface IOtherUser {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    email: string;
    image: string | undefined;
    rd: string;
    dob: string;
}

