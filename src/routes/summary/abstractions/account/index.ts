
import Tariff from "./Tariff"
import Balance from "./Balance"

export default class Account {
  readonly contract  : string
  readonly balance   : Balance
  readonly tariff    : Tariff

  constructor ($: CheerioStatic) {
    this.contract = this.getContractID($)
    this.balance  = new Balance($)
    this.tariff   = new Tariff($)
  }

  getContractID ($: CheerioStatic) : string {
    const raw = $(".head")[0].children[3].children[1].children[0].children[0].data
    return (<string> raw).split(":")[1].trim()
  }
}
