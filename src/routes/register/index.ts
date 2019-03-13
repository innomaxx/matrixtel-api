
import { Context } from "koa"
import UsersManager from "$components/users/UsersManager"

import APIError from "$components/response/APIError"
import APIResponse from "$components/response/APIResponse"

export default async function (ctx: Context, users: UsersManager) {
  let response
  const { login, password } = ctx.query
  try {
    // Check params
    if (!login || !password) throw "Missing credentials"
    // Register and/or get token
    const { access_token } = users.add(login, password)
    response = { access_token }
  } catch (e) {
    response = new APIError(e)
  } finally {
    ctx.body = new APIResponse(response)
  }
}
