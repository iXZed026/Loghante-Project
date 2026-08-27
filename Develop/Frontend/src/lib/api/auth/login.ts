import { fetcher } from "../fetcher";

export interface ILoginData {
    emailOrPhone: string;
    password: string;
}

export interface LoginUserData {
    userId: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    accessToken: string;
}

export interface LoginResponse {
    data: LoginUserData;
    message: string;
    success: boolean;
}

export async function login(
    data: ILoginData,
    locale: string,
): Promise<LoginResponse> {

    return fetcher<LoginResponse>(
        "/login",
        {
            method: "POST",
            body: JSON.stringify(data),
            credentials: "include",
        },
        locale,
    );
}