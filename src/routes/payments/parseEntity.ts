
import cheerio from "cheerio"
import Transaction from "./abstractions/Transaction"
import setResponseRange from "./setResponseRange"

import { Context } from "koa"

export default function parseEntity (page: string, ctx: Context) : IResponse {
  const $ = cheerio.load(page)
  const elements = $(".payments")[0].children[1].children
  const transactions: Transaction[] = []

  for (let x = 2; x < elements.length - 2; x += 2) {
    const rawData = []
    for (let y = 1; y < elements[x].children.length; y += 2) {
      let current = elements[x].children[y].children[0]
      rawData.push((
        y == 3
        ? (current.attribs.class == "fas fa-plus-circle" ? 1 : 2)
        : current.data
      ))
    }
    transactions.push(new Transaction(rawData))
  }

  const { count, offset } = setResponseRange(ctx)
  if (offset + count > transactions.length) throw "Out of range"

  return {
    count: transactions.length,
    transactions: transactions.slice(offset, count + offset)
  }
}

interface IResponse {
  count: number
  transactions: Transaction[]
}