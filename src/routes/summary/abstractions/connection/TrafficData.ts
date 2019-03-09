
import { Traffic } from "$components/Units"
import FormattedField from "$components/FormattedField"

interface TrafficData extends FormattedField {
  incoming: number
  outgoing: number
  units: Traffic
}

export default TrafficData
