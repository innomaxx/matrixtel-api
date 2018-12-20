
import fetch from "node-fetch"
import cheerio from "cheerio"
import getSessionID from "../tools/getSessionID"

export default async function (ctx) {
  const result = await getPayments(ctx.query)
  ctx.body = result
}

function getPayments ({ login, pass }) {
  return new Promise((resolve, reject) => {
    getSessionID(login, pass).then(session_id => {
      fetch("http://matrixtel.net/payments.php", {
        headers: { "Cookie": "PHPSESSID=" + session_id }
      }).then(res => res.text()).then(body => {

        const elements = cheerio.load(body)(".payments")[0].children[1].children
        const transactions = []

        for (let x = 2; x < elements.length - 2; x += 2) {
          const rawData = []
          for (let y = 1; y < elements[x].children.length; y += 2) {
            let current = elements[x].children[y].children[0]
            rawData.push((
              y == 3
              ? (current.attribs.class == "fas fa-plus-circle" ? 1 : 2)
              : current.data
            ))
          }
          transactions.push({
            date: rawData[0],
            type: rawData[1],
            value: Math.abs(rawData[2].split(" ")[0]),
            balance: Number(rawData[3].split(" ")[0]),
            units: "UAH",
            description: rawData[4]
          })
        }

        resolve({ response: { transactions } })
        
      })
    })
  })
}
