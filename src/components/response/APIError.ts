
export default class APIError {
  readonly code: number
  readonly message: string
  readonly related: object | null

  constructor (e: any) {
    this.code = -1
    this.message = ""
    this.related = null

    if (e instanceof Object && !(e instanceof Array)) {
      this.code = e.code || -1
      this.message = e.message || ""
      this.related = e.related || e.stack || null
    }
  }
}
