#!/usr/bin/env tsx

import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import chokidar from 'chokidar'
import { writeFileSync } from 'fs'
import { print } from 'graphql'
import path from 'path'

const dir = `${path.dirname(__dirname)}/src/**/*.graphql`
const prefix = `# 
# -------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# -------------------------------------------------------
#
`

function generateSchema() {
  try {
    const loadedFiles = loadFilesSync(dir)
    const typeDefs = mergeTypeDefs(loadedFiles)
    const printedTypeDefs = print(typeDefs)
    writeFileSync('schema.graphql', `${prefix}\n${printedTypeDefs}`)
    console.info('The definitions have been updated.')
  } catch (error) {
    console.error('There was an error generating the new schema. ', error)
  }
}

const options = process.argv.slice(2)

if (options.includes('watch')) {
  const watcher = chokidar.watch(dir)
  console.info('Watching your graphql files...')
  watcher.on('change', async (file) => {
    console.info(`[${new Date().toLocaleTimeString()}] "${file}" has been changed.`)
    generateSchema()
  })
} else {
  generateSchema()
}
