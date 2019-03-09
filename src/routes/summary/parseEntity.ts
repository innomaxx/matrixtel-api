
import cheerio from "cheerio"
import Account from "./abstractions/Account"
import Connection from "./abstractions/Connection"

export default function parseEntity (page: string) : SummaryInfo {
  const $ = cheerio.load(page)
  return {
    account: new Account($),
    connection: new Connection($)
  }
}

interface SummaryInfo {
  account: Account
  connection: Connection
}
