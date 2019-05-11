const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

interface userData {
  id: number
}

// Set defaults
exports.createDefaults = () => {
  return db.defaults({ users: [] })
    .write()
}

exports.upsertUser = (data: userData) => {
  let user = db.get('users')
    .find({ id: data.id })
    .value()
  if (!user) {
    db.get('users')
      .push(data)
      .write()
  } else {
    db.update({ id: data.id })
      .write()
  }
}
