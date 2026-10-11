#!/usr/bin/env node
/**
 * Validador de configuración JSON contra esquema
 * Valida brand.json contra brand.schema.json
 */

import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const STRICT = process.argv.includes('--strict')

async function run() {
  console.log(`🔍 Validando configuración ${STRICT ? 'MODO ESTRICTO' : ''}`)

  // Cargar esquema y datos
  const schema = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/brand.schema.json'), 'utf8'))
  const data = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/brand.json'), 'utf8'))
  const markers = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/prototype-markers.json'), 'utf8'))

  // Inicializar validador
  const ajv = new Ajv({ allErrors: true, allowUnionTypes: true })
  addFormats(ajv)
  const validate = ajv.compile(schema)

  const valid = validate(data)

  if (!valid) {
    console.error('\n❌ ERRORES DE ESQUEMA:')
    validate.errors.forEach(err => {
      console.error(`  ${err.instancePath || '/'}: ${err.message}`)
    })
    process.exit(1)
  }

  console.log('✅ Esquema válido')

  if (STRICT) {
    console.log('\n⚠️  MODO ESTRICTO ACTIVO')
    console.log('⚠️  Buscando campos con datos de ejemplo y marcadores de prototipo...\n')
    
    let hasErrors = false

    // Buscar marcadores de prototipo en todos los strings
    console.log('🔍 Verificando marcadores de demostración:')
    const allStrings = []
    function extractStrings(obj, path = '') {
      for (const key in obj) {
        const fullPath = path ? `${path}.${key}` : key
        if (typeof obj[key] === 'string') {
          allStrings.push({ path: fullPath, value: obj[key] })
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          extractStrings(obj[key], fullPath)
        }
      }
    }
    extractStrings(data)

    for (const str of allStrings) {
      for (const marker of markers.strings) {
        if (str.value.toLowerCase().includes(marker.toLowerCase())) {
          console.error(`❌ ${str.path}: contiene marcador de prototipo '${marker}'`)
          hasErrors = true
        }
      }
    }

    if (hasErrors) {
      console.log('\n❌ Se encontraron datos de ejemplo del prototipo.')
      console.log('   Esto es normal en el repositorio base, debe corregirse para clientes reales.')
      process.exit(1)
    }
  }

  console.log('\n✅ Configuración válida ✅')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
