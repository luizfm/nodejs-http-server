import fs from 'fs'
import { randomUUID } from 'crypto'
import { parse } from 'csv-parse'

const csvUrl = new URL('../../csv-read.csv', import.meta.url)

export async function csvReader(database) {
  const parser = fs.createReadStream(csvUrl).pipe(parse())

  const rows = []

  for await (const chunk of parser) {
    rows.push(chunk)
  }

  const [_, ...dataRows] = rows

  dataRows.forEach(([title, description]) => {
    const task = { id: randomUUID(), title, description, completed_at: null }

    database.insert('tasks', task)
  })
}