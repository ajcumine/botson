interface ErrorResponse {
  message?: string;
  status?: number;
  code?: string;
}

export class ResponseError extends Error {
  public message: string = '';
  public status?: string = undefined;
  public code?: string = undefined;

  constructor(response: ErrorResponse) {
    super(response.message);
    Object.keys(response).forEach(key => {
      this[key] = response[key];
    });
  }
}

export type RequestType = (
  url: string,
  options?: RequestInit,
  fetchFn?: typeof fetch,
) => Promise<{ [key: string]: any }>;

const request: RequestType = async (url, options = {}, fetchFn = fetch) => {
  const response = await fetchFn(url, options);

  if (response.ok) {
    return response;
  }

  throw new ResponseError(response);
};

export default request;
