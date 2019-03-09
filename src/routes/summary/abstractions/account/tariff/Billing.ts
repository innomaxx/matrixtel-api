
import { Currency } from "$components/Units"

export default class Billing {
  readonly daily: number
  readonly monthly: number
  readonly units: Currency

  constructor ($: CheerioStatic) {
    const src = $(".txt")[0].children[2].children[0].data as string
    const raw = src.match(/([\d+\.]+)[^\d]+(\d+)/i) as RegExpMatchArray
    const [ daily, monthly ] = raw.slice(1).map(Number)

    this.daily = daily
    this.monthly = monthly
    this.units = Currency.UAH
  }
}
