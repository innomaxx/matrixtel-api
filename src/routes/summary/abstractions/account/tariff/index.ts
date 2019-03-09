
import Billing from "./Billing"
import SpeedLimits from "./SpeedLimits"
import DisconnectDate from "./DisconnectDate"

export default class Tariff {
  readonly title: string
  readonly billing: Billing
  readonly speed_limits: SpeedLimits
  readonly disconnect_at: DisconnectDate

  constructor ($: CheerioStatic) {
    this.title = this.getTitle($)
    this.billing = new Billing($)
    this.speed_limits = new SpeedLimits($)
    this.disconnect_at = new DisconnectDate($)
  }

  getTitle ($: CheerioStatic) : string {
    const raw = $(".h4.m1")[0].children[0].data as string
    const tariff_name = raw.trim().replace(/[«»]/g, "")
    return tariff_name[0].toUpperCase() + tariff_name.slice(1)
  }
}
