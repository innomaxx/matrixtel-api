
import { Speed } from "$components/Units"
import FormattedField from "$components/FormattedField"

export default class SpeedLimits implements FormattedField {
  readonly upload: number
  readonly download: number
  readonly units: Speed
  readonly formatted: string

  constructor ($: CheerioStatic) {
    const raw = $(".vg")[0].children[3].children[3].children[0].data
    const values = (<string> raw).replace(" Мбіт /", "")
    const [ download, upload ] = values.split(" / ").map(Number)

    this.upload = upload
    this.download = download
    this.units = Speed.Mbps
    this.formatted = `${values} ${this.units}`
  }
}
