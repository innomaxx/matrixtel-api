
import TrafficData from "./TrafficData"
import { Traffic } from "$components/Units"

export default class TrafficUsage {
  readonly daily: TrafficData
  readonly monthly: TrafficData

  constructor ($: CheerioStatic) {
    this.daily = this.getDailyUsage($)
    this.monthly = this.getMonthlyUsage($)
  }

  format (src: string) : TrafficData {
    const matched = src.match(/(\d+(?: \d+)*?) \/ (\d+(?: \d+)*?) Мб/i)
    const rawdata = (<RegExpMatchArray> matched).slice(1)
    const [ incoming, outgoing ] = rawdata.map(e => Number(e.replace(/\s/g, "")))
    return {
      incoming, outgoing, units: Traffic.MBytes,
      formatted: `${rawdata[0]} / ${rawdata[1]} ${Traffic.MBytes}`
    }
  }

  getDailyUsage ($: CheerioStatic) : TrafficData {
    const raw = $(".m1.small")[0].children[0].data as string
    return this.format(raw)
  }

  getMonthlyUsage ($: CheerioStatic) : TrafficData {
    const raw = $(".m2.small")[0].children[0].data as string
    return this.format(raw)
  }
}
