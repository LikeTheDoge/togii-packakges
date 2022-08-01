import { folder, json } from '../../utils/file'
import { template_path } from '../../utils/template'
import { ComponentInfo, DemoGroup, Markdown, RouteFile, VueDocFile } from './info'
import * as path from 'path'
import * as fs from 'fs'
import * as rimraf from 'rimraf'

export const doc = (project_path: string, _: any) => {

    const type = _.build ? 'build' : 'serve'
    const src_path = path.resolve(project_path, './__doc_source__')
    const src_build_path = path.resolve(project_path, './__doc_source__/build')

    // 复制 config
    fs.copyFileSync(
        path.resolve(project_path, './.config/vue.config.doc.js'),
        path.resolve(project_path, './vue.config.js'),
    );
    // 删除 source 文件夹
    if (
        fs.existsSync(src_path)
    ) {
        rimraf.sync(src_build_path);
    }

    // 创建 source 文件夹
    folder.copy(path.resolve(template_path(), './template/doc'), src_path)

    // 创建 build 文件夹
    fs.mkdirSync(src_build_path)

    // 生成组件信息列表
    const components = fs.readdirSync(path.resolve(project_path, './packages'), { withFileTypes: true })
        .filter(v => v.isDirectory())
        .map(v => new ComponentInfo(v.name, path.resolve(project_path, './packages', v.name)));

    // 创建组件展示 .vue 页面
    const componentVueFiles = components.map(component => {
        const markdown = new Markdown(component.name, component.docPath, {
            public: json.read(path.resolve(project_path, './package.json')).name as string
        })
        const demo = folder.exist(component.demoPath)
            ? new DemoGroup(
                component.demoPath,
                path.resolve(src_build_path, `${component.name}.democode.json`)
            )
            : null

        const vueFile = new VueDocFile(
            path.resolve(src_build_path, `${component.name}.component.vue`),
            markdown, demo
        )

        vueFile.createFile()

        return vueFile
    })

    // 创建文章信息列表
    const docs = fs.readdirSync(path.resolve(project_path, './.docs'), { withFileTypes: true })
        .filter(v => v.isFile() && v.name.indexOf('.md') > 0)
        .map(v => new Markdown(v.name.replace('.md', ''), path.resolve(project_path, './.docs', v.name), {
            public: json.read(path.resolve(project_path, './package.json')).name as string
        }));

    // 创建文章展示 .vue 页面
    const docVueFiles = docs.map(doc => {
        const vueFile = new VueDocFile(
            path.resolve(src_build_path, `${doc.name}.doc.vue`), doc, null
        )
        vueFile.createFile()
        return vueFile
    })

    // 创建 public 文件夹
    rimraf.sync(path.resolve(project_path, './public'))
    if (folder.exist(path.resolve(project_path, './.docs/public'))) {
        const base = json.read(path.resolve(project_path, './package.json')).name as string
        fs.mkdirSync(path.resolve(project_path, './public'))
        folder.copy(
            path.resolve(project_path, './.docs/public'),
            path.resolve(project_path, type === 'serve' ? `./public/${base}` : `./public`)
        )
    }

    const routeFile = new RouteFile(
        path.resolve(src_build_path, './route.js'),
        {
            docs: docVueFiles,
            components: componentVueFiles,
            base: json.read(path.resolve(project_path, './package.json')).name as string
        }
    )

    routeFile.createFile()
}
