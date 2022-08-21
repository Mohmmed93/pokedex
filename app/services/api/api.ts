import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import { ClientError } from "../../models/ClientError"

/**
 * Manages all requests to the API.
 */
export type ApiReturnType<T> = Promise<T | ClientError | Error>

function processResponse(result: Types.GetGenericResult): ClientError | Error | any {
  switch (result.kind) {
    case "ok":
      return result.data;
    default:
      // return new ClientError(result.kind, result?.data?.message || "", result?.data?.error, result.data && result.data?.code);
  }
}

export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(customHeaders: any = {}, config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.setup(customHeaders)
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup(customHeaders: any = {}) {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        ...customHeaders
      },
    })
  }

  public getBaseApiUrl() {
    return this.config.url
  }

  public async get(getPath: string, params?: any): Promise<Types.GetGenericResult> {
    const response: ApiResponse<any> = await this.apisauce.get(getPath, params)
    return this.returnResults(response)
  }

  private returnResults(response): Types.GetGenericResult {
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    try {
      const data = response.data;
      return { kind: "ok", data }
    } catch {
      return {kind: "bad-data"}
    }
  }
}

export async function getFromApi<T>(path: string, params?: any, customHeaders = {}): ApiReturnType<T> {
  const api = new Api(customHeaders);
  const apiResponse = await api.get(path, params);
  return processResponse(apiResponse)
}
