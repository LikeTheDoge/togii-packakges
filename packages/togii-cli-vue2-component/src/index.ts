#!/usr/bin/env node

import { doc } from './script/doc'
import { init } from './script/init'
import { add } from './script/add'
import { build } from './script/build'
import * as mri from 'mri'

const method = (process.argv[2]).trim()
const argv = mri(process.argv.slice(3))
const project_path = process.cwd()

const all: { [key: string]: (project_path: string, _: any) => void } = {
    init, doc, add, build
}
const target = all[method]

console.log('work in ' + project_path)

if (target) {
    target(project_path, argv)
} else {
    throw new Error('method not found!')
}


