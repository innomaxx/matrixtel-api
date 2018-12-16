
const request = require("request")
import Fetch from "node-fetch"
import { stringify } from "querystring"

export default function getSessionID (login, pass) {
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: "http://matrixtel.net/login.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: stringify({ login, pass, go: "" })
    }, (err, res) => {
      if (err) reject(err)
      resolve(res.headers["set-cookie"][0].split(";")[0].split("=")[1])
    })
  })
}
