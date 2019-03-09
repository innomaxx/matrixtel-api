
const datereg = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{1,2}):(\d{1,2}):(\d{1,2})/i

export default class DisconnectDate {
  readonly utc: string
  readonly unix: number
  readonly tz_offset: number

  constructor ($: CheerioStatic) {
    const raw = $(".txt")[0].children[1].children[0].data as string
    const utc = raw.split(" до ")[1]

    const matched = utc.match(datereg) as RegExpMatchArray
    const [ date, month, year, hours, mins, secs ] = matched.slice(1).map(Number)

    const ts = new Date(year, month - 1, date, hours, mins, secs)

    this.utc = utc
    this.unix = ts.getTime() / 1e3
    this.tz_offset = ts.getTimezoneOffset() / -60
  }
}
