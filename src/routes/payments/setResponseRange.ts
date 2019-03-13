
import { Context } from "koa"

const defaults: IResponseRange = { count: Infinity, offset: 0 }

export default function setResponseRange (ctx: Context) : IResponseRange {
    let { count, offset } = ctx.query

    const throwcnd = [count, offset].filter(p => p).some(param => {
      const parsed = parseInt(param), isNaN = Number.isNaN(parsed)
      return isNaN || param < 0
    })
    if (throwcnd) throw "Illegal type of one/more params"

    count = count ? Number(count) : defaults.count
    offset = offset ? Number(offset) : defaults.offset

    return { count, offset }
}

interface IResponseRange {
    count: number
    offset: number
}
