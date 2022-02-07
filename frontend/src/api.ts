export function getApiURL(endpointURL: string): string {
  const apiURL = "/api";
  return endpointURL.startsWith("/")
    ? `${apiURL}${endpointURL}`
    : `${apiURL}/${endpointURL}`;
}

export async function getFromApi<T>(endpointURL: string): Promise<T> {
  return await genericApiFetch(endpointURL, "GET");
}

export async function postToApi<D, T>(
  endpointURL: string,
  data: D
): Promise<T> {
  return await genericApiFetch(endpointURL, "POST", data);
}

async function genericApiFetch(
  endpointURL: string,
  method: "GET" | "POST",
  data?: any
) {
  const fullURL = getApiURL(endpointURL);
  const resp = data
    ? await fetch(fullURL, {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    : await fetch(fullURL, { method });
  if (resp.status !== 200) {
    throw new ApiHTTPError(
      `Got ${resp.status} response from ${fullURL}`,
      resp.status
    );
  }
  return await resp.json();
}

export class ApiHTTPError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.name = "ApiHTTPError";
    this.code = code;
  }
}
