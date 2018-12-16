
import fetch from "node-fetch"
import cheerio from "cheerio"
import getSessionID from "tools/getSessionID"

export default async function (ctx) {
  const result = await getSummary(ctx.query)
  ctx.body = result
}

function getSummary ({ login, pass }) {
  return new Promise((resolve, reject) => {
    getSessionID(login, pass).then(session_id => {
      fetch("http://matrixtel.net/index.php", {
        headers: { "Cookie": "PHPSESSID=" + session_id }
      }).then(res => res.text()).then(body => {

        const $ = cheerio.load(body), parsedData = [
          $(".head")[0].children[3].children[1].children[0].children[0].data,
          $(".vg")[0].children[1].children[1].children[0].data,
          $(".vg")[0].children[1].children[3].children[0].data,
          $(".i.m3")[0].children[0].data,
          $(".h4.m1")[0].children[0].data,
          $(".vg")[0].children[3].children[1].children[0].data,
          $(".vg")[0].children[3].children[3].children[0].data,
          $(".m1.small")[0].children[0].data,
          $(".m2.small")[0].children[0].data,
          $(".txt")[0].children[1].children[0].data,
          $(".txt")[0].children[2].children[0].data,
          $(".txt")[0].children[4].children[0].data,
          $(".txt")[0].children[6].children[0].data,
          $(".txt")[0].children[6].children[0].next.children[0].data
        ]

        resolve({
          account: {
            contract: parsedData[0].split(":")[1].trim(),
            balance: {
              value: Number(parsedData[2].replace(",", ".")),
              unit: "UAH"
            },
            tariff: {
              title: parsedData[4].trim().replace(/[«»]/g, ""),
              speed_limit: wrapper_getSpeedLimits(parsedData[6]),
              billing: wrapper_getBilling(parsedData[10]),
              disconnect_at: parsedData[9].split(" до ")[1]
            }
          },
          connection: {
            active: parsedData[13] == "підключений",
            traffic_usage: {
              daily: wrapper_getTrafficUsage(parsedData[7]),
              monthly: wrapper_getTrafficUsage(parsedData[8])
            },
            assigned_ip: parsedData[11].split(": ")[1],
          }
        })

      })
    })
  })
}

function wrapper_getBilling (src) {
  let [ daily, monthly ] = src
    .match(/([\d+\.]+)[^\d]+(\d+)/i)
    .slice(1).map(Number)
  return { daily, monthly, unit: "UAH" }
}

function wrapper_getSpeedLimits (src) {
  let [ download, upload ] = src.split(" / ").map(Number)
  return { download, upload, unit: "MBit" }
}

function wrapper_getTrafficUsage (src) {
  let [ incoming, outgoing ] = src
    .match(/(\d+(?: \d+)*?) \/ (\d+(?: \d+)*?) Мб/i)
    .slice(1).map(e => Number(e.replace(" ", "")))
  return { incoming, outgoing, unit: "MByte" }
}
