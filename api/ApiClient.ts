import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = "https://dummyjson.com";

export class ApiClient {
  private apiFetch = async <T>(
    url: string,
    requestInit?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<T>> => {
    return axios.get<T>(url, requestInit);
  };

  getProductsList = async (): Promise<AxiosResponse<ProductResponse>> => {
    return await this.apiFetch(`${API_URL}/products`, {
      method: "GET",
    });
  };
}
