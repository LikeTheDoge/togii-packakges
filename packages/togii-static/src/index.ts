#!/usr/bin/env node

import * as mri from 'mri'
import * as path from 'path'
import * as koa from 'koa'
import * as fs from 'fs'
import * as koa_static from 'koa-static'

const argv = mri(process.argv.slice(2))
const project_path = process.cwd()

if (!argv._[0] || !argv._[1]) throw new Error('need port and source')

const port = parseInt(argv._[0])
console.log('port: '+ port)
const source = path.resolve(project_path, argv._[1])
console.log('source: '+ source)

const app = new koa()

app.use(koa_static(source))

app.use((ctx,next) => {
    const p = ctx.path.split('/').filter(v => v.trim())
    let index_path = ''
    if(p[0] && fs.existsSync(path.resolve(source, './' + p[0],'./index.html'))){
        index_path = path.resolve(source, './' + p[0],'./index.html')
    }else if(fs.existsSync(path.resolve(source, './index.html'))){
        index_path = path.resolve(source, './index.html')
    }

    if(index_path){
        ctx.type = "html";
        ctx.body = fs.readFileSync(index_path);
    }else{
        next()
    }
})

app.listen(port)
console.log('serve is start!')
