import { fetcher } from "../fetcher";

export interface VerifyRegisterData {
  verificationToken: string;
  code: string;
}

export interface VerifyRegisterResponse {
  data?: null;
  message: string;
  success: boolean;
}

export async function verifyRegister(
  data: VerifyRegisterData,
  locale: string,
): Promise<VerifyRegisterResponse> {

  return fetcher<VerifyRegisterResponse>(
    "/auth/register/verify",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    locale,
  );
}