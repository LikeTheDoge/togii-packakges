import * as fse from 'fs-extra'
import * as fs from 'fs'

export const folder = {
    copy: (src: string, target: string) => {
        return fse.copySync(src, target)
    },
    exist: (path: string) => {
        return fs.existsSync(path)
    },
    read: () => { }
}

export const json = {
    edit: (src: string, fn = (json: Object) => json) => {
        var data = fs.readFileSync(src);
        const text = data.toString().trim() || '{}'
        const old_json = JSON.parse(text)
        const json = fn(old_json)
        const new_txt = JSON.stringify(json, null, 2)
        fs.writeFileSync(src, new_txt)

    },
    exist: (path: string) => {
        return fs.existsSync(path)
    },
    read: (src: string) => {
        var data = fs.readFileSync(src);
        const text = data.toString().trim() || '{}'
        return JSON.parse(text)
    }
}


export const file = {
    edit: (src: string, fn = (json: string) => json) => {
        var data = fs.readFileSync(src);
        const text = data.toString().trim() || ''
        const new_txt = fn(text)
        fs.writeFileSync(src, new_txt)

    },
    copy: (src: string, target: string) => {
        return fse.copySync(src, target)
    },
    exist: (path: string) => {
        return fs.existsSync(path)
    }
}