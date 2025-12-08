import axios, { AxiosResponse } from "axios";
import { env } from "./env";
import { getToken, authenticate, resetToken } from "./auth";

type Params = string | number | (string | number)[] | Record<string, unknown> | null;
type Body = Record<string, unknown> | unknown;


function hasAxiosResponse(
  err: unknown
): err is { response: { status: number } } {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as { response?: { status?: number } }).response?.status === "number"
  );
}

export class Api {
  protected baseUrl: string = "";

  constructor(baseURL = env.API_ENDPOINT) {
    if (baseURL) {
      this.baseUrl = baseURL.replace(/\/+$/, "");
    }
  }

  async get<T = unknown>(
    path: string,
    params: Params = "",
    ...params2: Params[]
  ): Promise<T | false> {
    const token = await getToken();

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    let endpoint = this.baseUrl + path;

    if (params) {
      if (Array.isArray(params)) {
        endpoint += "/" + params.join(",");
      } else {
        endpoint += "/" + params;
      }
    }

    if (params2.length > 0) {
      endpoint += "/" + params2.join("/");
    }

    try {
      const response: AxiosResponse<T> = await axios.get(endpoint, { headers });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      }

      return false;

    } catch (error: unknown) {
      if (hasAxiosResponse(error) && error.response.status === 401) {
        resetToken();
        await authenticate();
        return this.get<T>(path, params, ...params2);
      }

      return false;
    }
  }

  async post<T = unknown>(
    path: string,
    body: Body = {},
    params: Params = "",
    ...params2: Params[]
  ): Promise<T | false> {
    const token = await getToken();

    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };

    let endpoint = this.baseUrl + path;

    if (params) {
      if (Array.isArray(params)) {
        endpoint += "/" + params.join(",");
      } else {
        endpoint += "/" + params;
      }
    }

    if (params2.length > 0) {
      endpoint += "/" + params2.join("/");
    }

    try {
      const response: AxiosResponse<T> = await axios.post(endpoint, body, { headers });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      }

      return false;

    } catch (error: unknown) {
      if (hasAxiosResponse(error) && error.response.status === 401) {
        resetToken();
        await authenticate();
        return this.post<T>(path, body, params, ...params2);
      }

      return false;
    }
  }
}
