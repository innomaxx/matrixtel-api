
import TrafficUsage from "./TrafficUsage"

export default class Connection {
  readonly active: boolean
  readonly traffic_usage: TrafficUsage
  readonly assigned_ip: string

  constructor ($: CheerioStatic) {
    this.active = this.isActive($)
    this.traffic_usage = new TrafficUsage($)
    this.assigned_ip = this.getAssignedIP($)
  }

  isActive ($: CheerioStatic) : boolean {
    const raw = $(".txt")[0].children[6].children[0].next.children[0].data
    return (<string> raw) == "підключений"
  }

  getAssignedIP ($: CheerioStatic) : string {
    const raw = $(".txt")[0].children[4].children[0].data as string
    return raw.split(": ")[1]
  }
}
