const fse = require('fs-extra')
const fs = require('fs')

exports.folder = {
    copy: (src, target) => {
        return fse.copySync(src, target)
    },
    exist: (path) => {
        return fs.existsSync(path) && path
    }
}

exports.json = {
    edit: (src, fn = (json) => json) => {
        var data = fs.readFileSync(src);
        const text = data.toString().trim() || '{}'
        const old_json = JSON.parse(text)
        const json = fn(old_json) 
        const new_txt = JSON.stringify(json,null, 2)
        fs.writeFileSync(src,new_txt)

    },
    exist: (path) => {
        return fs.existsSync(path) && path
    }
}
exports.file = {
    edit: (src, fn = (json) => json) => {
        var data = fs.readFileSync(src);
        const text = data.toString().trim() || '{}'
        const old_json = JSON.parse(text)
        const json = fn(old_json) 
        const new_txt = JSON.stringify(json,null, 2)
        fs.writeFileSync(src,new_txt)

    },
    exist: (path) => {
        return fs.existsSync(path) && path
    }
}