import { folder, file } from '../utils/file'
import * as path from 'path'
import * as fs from 'fs'
import * as shell from 'shelljs'

export const build = (project_path: string, _: any) => {
    if (!folder.exist(path.resolve(project_path, './packages')))
        throw new Error(`cant find packages!!!`)
    // 复制 config
    fs.copyFileSync(
        path.resolve(project_path, './.config/vue.config.build.js'),
        path.resolve(project_path, './vue.config.js'),
    );
    // 生成组件信息列表
    const components = fs.readdirSync(path.resolve(project_path, './packages'), { withFileTypes: true })
        .filter(v => v.isDirectory())
        .filter(v => file.exist(path.resolve(project_path, `./packages/${v.name}/index.js`)))
        .map(v => v.name)
    console.log('Find Components:')
    components.forEach(v => console.log(`  ${v},`))

    shell.cd(project_path)
    components.forEach(name=>{
        shell.exec(`npx vue-cli-service build --target lib --name ${name} --dest lib packages/${name}/index.js`)
    })
}