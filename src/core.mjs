
import Koa from "koa"
import Router from "koa-router"

import summaryHandler from "./routes/summary"
import paymentsHandler from "./routes/payments"

const app = new Koa(), router = new Router()

router.get("/summary", summaryHandler)
router.get("/payments", paymentsHandler)

app
  .use(router.routes())
  .listen(process.env.PORT || 4500)

console.clear()
console.log("\nStarted\n")
