import {
  getLocalStorageItem,
  saveToLocalStorage,
} from "../utils/localStorage";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ACCESS_TOKEN_KEY = "accessToken";

interface RefreshResponse {
  data: {
    accessToken: string;
  };
  message: string;
  success: boolean;
}

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit,
  locale?: string,
  isRetry: boolean = false,
): Promise<T> {

  const accessToken =
    getLocalStorageItem(ACCESS_TOKEN_KEY);

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      ...options,

      //HttpOnly Cookie
      credentials: "include",

      headers: {
        "Content-Type": "application/json",

        ...(locale && {
          "Accept-Language": locale,
        }),

        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),

        ...options?.headers,
      },
    }
  );


  if (
    response.status === 401 &&
    !isRetry &&
    endpoint !== "/auth/refresh"
  ) {

    try {

      const refreshResponse = await fetch(
        `${BASE_URL}/auth/refresh`,
        {
          method: "POST",

          // Refresh Token داخل HttpOnly Cookie
          credentials: "include",

          headers: {
            "Content-Type": "application/json",

            ...(locale && {
              "Accept-Language": locale,
            }),
          },
        }
      );


      if (!refreshResponse.ok) {

        localStorage.removeItem(
          ACCESS_TOKEN_KEY
        );

        throw new Error(
          "Session expired"
        );
      }

      const refreshData =
        await refreshResponse.json() as RefreshResponse;

      saveToLocalStorage(
        ACCESS_TOKEN_KEY,
        refreshData.data.accessToken
      );


      return fetcher<T>(
        endpoint,
        options,
        locale,
        true
      );

    } catch (error) {

      localStorage.removeItem(
        ACCESS_TOKEN_KEY
      );

      throw error;
    }
  }


  if (!response.ok) {

    let errorData: {
      message?: string;
    } | null = null;

    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }

    throw new Error(
      errorData?.message ||
      "An error occurred while fetching data."
    );
  }

  return response.json();
}