import { fetcher } from "../fetcher";

export interface RegisterData {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export interface RegisterResponse {
  data?: null;
  message: string;
  success: boolean;
}

export async function register(
  data: RegisterData,
  locale: string,
): Promise<RegisterResponse> {

  return fetcher<RegisterResponse>(
    "/register",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    locale,
  );
}