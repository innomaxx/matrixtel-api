
import LowDB from "lowdb"
import * as File from "lowdb/adapters/FileSync"

import UserEntry from "./UserEntry"

export default class TokensManager {
  readonly db: LowDB.LowdbSync<any>

  constructor (dbpath: string) {
    this.db = LowDB(new File(dbpath))
  }

  add (login: string, password: string) : UserEntry {
    // DB search
    const search = this.find({ login })
    // Found -> return entry
    if (search.found) return search.object as UserEntry
    // Not found -> create -> return entry
    const user = new UserEntry({ login, password })
    this.db.push(user).write()

    return user
  }

  del (login: string) : IRemovalResult {
    // DB search
    const search = this.find({ login })
    // Form result
    const result: IRemovalResult = { removed: false }
    // Not found
    if (!search.found) return result
    // Found -> remove
    this.db.pullAt(search.index).write()

    return { removed: true, object: search.object }
  }

  find (query: ISearchKeys) : ISearchResult {
    const index = this.db.findIndex(query).value()
    return {
      found: index > -1, index,
      object: index > -1 
        ? this.db.get(index).value() as UserEntry
        : undefined
    }
  }
}

interface ISearchKeys {
  login?: string
  access_token?: string
}

interface IRemovalResult {
  removed: boolean
  object?: UserEntry
}

interface ISearchResult {
  found: boolean
  index: number
  object?: UserEntry
}