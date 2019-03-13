
import wrapRoute from "../wrapper"
import parseEntity from "./parseEntity"
import UsersManager from "$components/users/UsersManager"

import { BaseContext } from "koa"

export default async function (ctx: BaseContext, users: UsersManager) {
  return wrapRoute("/index", parseEntity, ctx, users)
}
