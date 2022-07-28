const { argus } = require('../utils/argus')
const { folder, json } = require('../utils/file')
const p = require('path')

const [type, name] = argus()

if (!name) { throw new Error('name plz!') }

if (!type) { throw new Error('type plz!') }

const template_path = p.resolve(__dirname, '../template', './' + type)

if (!folder.exist(template_path)) {
    throw new Error('type error!')
}

const target_path = p.resolve(__dirname, '../../packages', './' + name)

if (folder.exist(target_path)) {
    throw new Error(name + ' is exist!')
}

folder.copy(template_path, target_path)

json.edit(
    p.resolve(target_path, './package.json'),
    (e) => Object.assign(e, { name })
)

console.log('init success!')


