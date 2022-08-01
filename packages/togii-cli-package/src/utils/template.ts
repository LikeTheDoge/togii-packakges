import { json } from './file'
import * as path from 'path'

let cache_template_path: string | undefined = undefined
export const template_path = (current: string = __dirname): string => {
    if (cache_template_path) return cache_template_path
    if (json.exist(path.resolve(current, './package.json'))) {
        return cache_template_path = current
    } else {
        return template_path(path.resolve(current, '../'))
    }
}
