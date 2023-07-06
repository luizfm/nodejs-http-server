import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
    .then(data => this.#database = JSON.parse(data))
    .catch(() => {
      this.#persist
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table, search) {
    let data = this.#database[table] ?? []

    if(search) {
      data = data.filter(row => Object.entries(search).some(([key, value]) => {
        return row[key].toLowerCase().includes(value.toLowerCase())
      }))
    }

    return data
  }

  insert(table, data) {
    const handledData = {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    }

    if(this.#database[table]) {
      this.#database[table].push(handledData)
    } else {
      this.#database[table] = [handledData]
    }

    this.#persist()
  }

  update(table, id, data) {
    const handledData = {
      ...data,
      updated_at: new Date(),
    }

    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...handledData
      }
    }

    this.#persist()
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
    }

    this.#persist()
  }
}