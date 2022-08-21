import { GeneralApiProblem } from "./api-problem"

export type GetGenericResult = { kind: "ok"; data: any } | GeneralApiProblem
