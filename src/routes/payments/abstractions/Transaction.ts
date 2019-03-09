
import { Currency } from "$components/Units"
import OperationType from "./OperationType"

export default class Transaction {
  readonly date: string
  readonly type: OperationType
  readonly value: number
  readonly balance: number
  readonly units: Currency
  readonly description: string

  constructor (rawData: any | (string | number | undefined)[]) {
    this.date = rawData[0]
    this.type = rawData[1]
    this.value = Math.abs(Number((rawData[2] as string).split(" ")[0]))
    this.balance = Number((rawData[3] as string).split(" ")[0])
    this.units = Currency.UAH
    this.description = rawData[4] as string
  }
}
