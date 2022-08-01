import { folder } from '../utils/file'
import * as path from 'path'
import * as fs from 'fs'

export const dist = (project_path: string, _: any) => {
    const pkg_path = path.resolve(project_path, './packages')
    const get_dist = (p: string) => path.resolve(p, './dist')

    if (!folder.exist(pkg_path)) return

    fs.readdirSync(pkg_path, { withFileTypes: true })
        .filter(v => v.isDirectory())
        .forEach(v => {
            const dist_path = get_dist(path.resolve(pkg_path, './' + v.name))
            if (!folder.exist(dist_path)) return
            folder.copy(dist_path,get_dist(project_path))
        })

}