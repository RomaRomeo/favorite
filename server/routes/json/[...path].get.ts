import { createError, defineEventHandler, getRouterParam } from 'h3'
import { readFile } from 'node:fs/promises'
import { resolve, normalize } from 'node:path'

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  if (!path) throw createError({ statusCode: 400 })

  const baseDir = resolve('public/json')
  const safe = normalize(path).replace(/^(\.\.[/\\])+/, '')
  const filePath = resolve(baseDir, safe)

  if (!filePath.startsWith(baseDir + '/')) {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  try {
    const content = await readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch {
    throw createError({ statusCode: 404, message: 'Not found' })
  }
})
