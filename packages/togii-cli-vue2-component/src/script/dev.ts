import { folder } from '../utils/file'
import { template_path } from '../utils/template'
import * as path from 'path'
import * as fs from 'fs'

export const dev = (project_path: string, _: any) => {
    const src_path = path.resolve(project_path, './__dev_source__')

    // 复制 config
    fs.copyFileSync(
        path.resolve(project_path, './.config/vue.config.dev.js'),
        path.resolve(project_path, './vue.config.js'),
    );

    // 如果没有 __dev_source__ 文件夹，则进行初始化
    if (
        !fs.existsSync(src_path)
    ) {
        // 创建 source 文件夹
        folder.copy(path.resolve(template_path(), './template/dev'), src_path)
    }

}