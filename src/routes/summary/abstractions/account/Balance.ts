
import { Currency } from "$components/Units"
import FormattedField from "$components/FormattedField"

export default class Balance implements FormattedField {
  readonly value: number
  readonly units: Currency
  readonly formatted: string

  constructor ($: CheerioStatic) {
    const raw = $(".vg")[0].children[1].children[3].children[0].data as string

    this.value = Number(raw.replace(",", "."))
    this.units = Currency.UAH
    this.formatted = `${raw} ${this.units}`
  }
}
