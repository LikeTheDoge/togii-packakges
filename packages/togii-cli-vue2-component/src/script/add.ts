import { folder } from '../utils/file'
import { template_path } from '../utils/template'
import * as path from 'path'

export const add = (project_path: string,_:any) => {
    const component_name:string = _?_.name:''
    if(!component_name) throw new Error('need name!') 

    const folder_name = component_name.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join()

    folder.copy(
        path.resolve(template_path(), './add'),
        path.resolve(project_path, `./packages/${folder_name}`)
    )
}