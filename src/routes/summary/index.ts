
import wrapRoute from "../wrapper"
import parseEntity from "./parseEntity"
import UsersManager from "$components/users/UsersManager"

import { Context } from "koa"

export default async function (ctx: Context, users: UsersManager) {
  return wrapRoute("/index", parseEntity, ctx, users)
}
