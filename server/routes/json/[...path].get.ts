import { createError, defineEventHandler, getRouterParam } from 'h3'
import { readFile } from 'node:fs/promises'
import { resolve, normalize } from 'node:path'

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  if (!path) throw createError({ statusCode: 400 })

  const safe = normalize(path).replace(/^(\.\.[/\\])+/, '')
  const filePath = resolve('public/json', safe)

  try {
    const content = await readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    throw createError({ statusCode: 404, message: `Not found: ${safe}` })
  }
})
