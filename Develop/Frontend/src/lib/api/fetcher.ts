const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {

  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    }
  );


  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message ||
      "An error occurred while fetching data."
    );
  }


  return response.json();
}