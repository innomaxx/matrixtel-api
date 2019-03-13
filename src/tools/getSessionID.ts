
import request from "request";
import { stringify } from "querystring"

import ILoginCredentials from "$components/request/ILoginCredentials"

export default function getSessionID (opt: ILoginCredentials) : Promise<string> {
  const { login, password:pass } = opt
  return new Promise((resolve, reject) => {
    request({
      method: "POST",
      url: "http://matrixtel.net/login.php",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: stringify({ login, pass, go: "" })
    }, (err, res) => {
      if (err) return reject(err)
      resolve(
        res.headers["set-cookie"]
        ? res.headers["set-cookie"][0].split(";")[0].split("=")[1]
        : ""
      )
    })
  })
}
