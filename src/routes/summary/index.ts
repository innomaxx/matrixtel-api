
import wrapRoute from "../wrapper"
import parseEntity from "./parseEntity"

import { BaseContext } from "koa"

export default async function (ctx: BaseContext) {
  return wrapRoute("/index", parseEntity, ctx)
}
