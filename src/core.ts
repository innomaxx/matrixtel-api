
import Koa from "koa"
import Router from "koa-router"

import * as routes from "./routes"

const app = new Koa(), router = new Router()

router.get("/summary", routes.summaryHandler)
router.get("/payments", routes.paymentsHandler)

app.use(router.routes())
app.listen(process.env.PORT || 4500, () => {
  if (process.env.NODE_ENV !== "production") {
    console.clear()
    console.log("Started")
  }
})
