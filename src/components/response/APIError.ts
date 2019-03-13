
export default class APIError {
  private code: number
  private message: string
  private related: object | null

  constructor (input: any) {
    this.code = -1
    this.message = ""
    this.related = null

    this.parseInput(input)
  }

  private parseInput (input: any) {
    switch (typeof input) {
      case "number":
        this.code = input
      break
      case "string":
        this.message = input
      break
      case "object":
        if (Array.isArray(input)) {
          this.related = input
        } else {
          const { code, message, ...other } = input
          this.code = code || -1
          this.message = message || "Error occured"
          this.related = Object.keys(other).length ? other : null
        }
      break
    }
  }
}