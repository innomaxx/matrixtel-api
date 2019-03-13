
import generateToken from "./generate"

export default class UserEntry implements IUser {
  readonly login: string
  readonly password: string
  readonly access_token: string

  constructor (inp: IInputOptions) {
    this.login = inp.login
    this.password = inp.password
    this.access_token = generateToken()
  }
}

interface IInputOptions {
  login: string
  password: string
}

export interface IUser extends IInputOptions {
  access_token: string
}