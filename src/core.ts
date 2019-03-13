
import "./globals"

import Koa from "koa"
import Router from "koa-router"

import * as routes from "./routes"

import path from "path"
import UsersManager from "$components/users/UsersManager"

const app = new Koa(), router = new Router()

const users = new UsersManager(
  path.join(
    __dirname,
    process.env.NODE_ENV == "production"
      ? (process.env.db_path || "./tokens.json")
      : "../registry/tokens.json"
  )
)

router.get("/summary", ctx => routes.summaryHandler(ctx, users))
router.get("/payments", ctx => routes.paymentsHandler(ctx, users))
router.get("/register", ctx => routes.registerHandler(ctx, users))

app.use(router.routes())
app.listen(process.env.PORT || 4500, () => {
  if (process.env.NODE_ENV !== "production") {
    console.clear()
    console.log("Started")
  }
})
