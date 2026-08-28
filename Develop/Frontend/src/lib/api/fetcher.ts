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

interface ApiErrorResponse {
  message?: string;
  success?: boolean;
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

      // HttpOnly Cookie
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

  /*
   * If access token is expired,
   * try to get a new one using the refresh token.
   */
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

          // Refresh token is stored in HttpOnly Cookie
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

        throw new Error("Session expired");
      }

      const refreshData =
        await refreshResponse.json() as RefreshResponse;

      saveToLocalStorage(
        ACCESS_TOKEN_KEY,
        refreshData.data.accessToken
      );

      /*
       * Retry the original request
       * with the new access token.
       */
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

  /*
   * API errors such as:
   * 400, 401, 404, 409, 422, 500
   *
   * are returned as normal API responses
   * so the component can use response.message.
   */
  if (!response.ok) {

    let errorData: ApiErrorResponse | null = null;

    try {

      errorData =
        await response.json();

    } catch {

      errorData = null;
    }

    return {
      success: false,
      message:
        errorData?.message ||
        "An error occurred while fetching data.",
    } as T;
  }

  return response.json();
}