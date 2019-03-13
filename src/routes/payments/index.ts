
import { Context } from "koa"

import wrapRoute from "../wrapper"
import parseEntity from "./parseEntity"
import UsersManager from "$components/users/UsersManager"

export default async function (ctx: Context, users: UsersManager) {
  return wrapRoute("/payments", parseEntity, ctx, users)
}
