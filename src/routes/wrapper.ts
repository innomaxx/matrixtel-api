
import { BaseContext } from "koa"
import fetch from "node-fetch"
import getSessionID from "$tools/getSessionID"

import APIError from "$components/response/APIError"
import APIResponse from "$components/response/APIResponse"
import ProcessResult from "$components/response/ProcessResult"

export type ParserFN = (page: string) => ProcessResult

export default async function wrapRoute (
  route: string, parseEntity: ParserFN, ctx: BaseContext
) {
  let response
  const { login, password } = ctx.query
  try {
    // Get session key
    const session_id = await getSessionID({ login, password })
    if (!session_id) throw new Error("session_key illegal")
    // Get page entity
    const page = await fetch(`http://matrixtel.net${ route }.php`, {
      headers: { "Cookie": "PHPSESSID=" + session_id }
    }).then(res => res.text())
    // Process page entity
    response = parseEntity(page)
  } catch (e) {
    response = new APIError(e)
  } finally {
    ctx.body = new APIResponse(response)
  }
}
