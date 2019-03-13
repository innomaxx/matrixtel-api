
import { BaseContext } from "koa"
import fetch from "node-fetch"
import getSessionID from "$tools/getSessionID"

import UserEntry from "$components/users/UserEntry"
import UsersManager from "$components/users/UsersManager"

import APIError from "$components/response/APIError"
import APIResponse from "$components/response/APIResponse"
import ProcessResult from "$components/response/ProcessResult"

import ILoginCredentials from "$components/request/ILoginCredentials"

export type ParserFN = (page: string) => ProcessResult

export default async function wrapRoute (
  route: string, parseEntity: ParserFN, 
  ctx: BaseContext, users: UsersManager
) {
  let response,
      login: ILoginCredentials["login"] = "",
      password: ILoginCredentials["password"] = ""

  try {
    // #region Get credentials
    const params = ctx.query as IRequestQuery
    if (params.access_token) {
      const { access_token } = params
      const user = users.find({ access_token })
      if (user.found) {
        login = (user.object as UserEntry).login
        password = (user.object as UserEntry).password
      } else {
        throw "User not found"
      }
    } else if (params.login && params.password) {
      login = params.login
      password = params.password
    } else {
      throw "No credentials found"
    }
    // #endregion

    // #region Get session key
    const session_id = await getSessionID({ login, password })
    if (!session_id) throw new Error("session_key illegal")
    // #endregion

    // #region Get page entity
    const page = await fetch(`http://matrixtel.net${ route }.php`, {
      headers: { "Cookie": "PHPSESSID=" + session_id }
    }).then(res => res.text())
    // #endregion

    // #region Process page entity
    response = parseEntity(page)
    // #endregion
  } catch (e) {
    response = new APIError(e)
  } finally {
    ctx.body = new APIResponse(response)
  }
}

interface IRequestQuery {
  login?: ILoginCredentials["login"]
  password?: ILoginCredentials["password"]
  access_token?: string
}