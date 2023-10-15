export interface UserProfile {
    empID: string;
    fullname : string;
    email : string;
    password?: string;
    showPassword?: boolean;
    confirmPassword?: string;
    newPassword?: string;
    contact: string;
    role: string;
    status: string;
}

