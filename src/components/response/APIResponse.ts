
import APIError from "./APIError"

export default class APIResponse {
  readonly ok: boolean
  readonly cached: boolean
  readonly error: APIError | null
  readonly response: any

  constructor (input: any) {
    const isErrorPassed = input instanceof APIError

    this.ok = !isErrorPassed
    this.cached = false
    this.error = isErrorPassed ? input : null
    this.response = isErrorPassed ? null : input
  }
}
