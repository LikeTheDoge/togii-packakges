import { file, folder, json } from '../utils/file'
import * as path from 'path'
import { template_path } from '../utils/template'

const copy_template_file = (project_path: string) => {
    ['.docs', '.config', 'packages'].forEach(dirname => {
        if (folder.exist(path.resolve(project_path, dirname))) return
        folder.copy(
            path.resolve(template_path(), `./template/init/${dirname}`),
            path.resolve(project_path, dirname),
        )
    });
    [['gitignore', '.gitignore'], ['init_Dockerfile', 'Dockerfile']].forEach(([filename0, filename1]) => {
        if (file.exist(path.resolve(project_path, filename1))) return
        file.copy(
            path.resolve(template_path(), `./template/init/${filename0}`),
            path.resolve(project_path, filename1),
        )
    })
}

const edit_package_json = (project_path: string) => {
    const package_json_path = path.resolve(project_path, './package.json')
    json.edit(package_json_path, (json: any) => {

        const devDependencies = {
            "togii-static": "^0.0.0",

            "highlight.js": "11.2.0",
            "github-markdown-css": "^5.1.0",
            "clipboard": "^2.0.8",

            "vue": "2.6.11",
            "vue-router": "^3.2.0",
            "vue-svg-loader": "^0.16.0",
            "ant-design-vue": "1.6.5",

            "@babel/plugin-proposal-decorators": "^7.17.8",
            "@vue/cli-plugin-babel": "~4.5.0",
            "@vue/cli-plugin-eslint": "~4.5.0",
            "@vue/cli-plugin-pwa": "~4.5.0",
            "@vue/cli-plugin-router": "~4.5.0",
            "@vue/cli-plugin-vuex": "~4.5.0",
            "@vue/cli-service": "~4.5.0",
            "@vue/composition-api": "^1.4.1",
            "@vue/compiler-core": "^3.2.31",
            "@vue/eslint-config-standard": "^5.1.2",
            "less": "3",
            "less-loader": "5.0.0",
            "raw-loader": "^4.0.2",
            "sass": "^1.26.5",
            "sass-loader": "^8.0.2",
            "vue-template-compiler": "2.6.11"
        }

        Object.assign(json.scripts, {
            "doc:serve": "togii-cli doc && vue-cli-service serve",
            "doc:build": "togii-cli doc --build && vue-cli-service build && lerna run doc:build && togii-cli dist"
        })

        if (json.devDependencies) {
            Object.assign(json.devDependencies, devDependencies)
        } else {
            Object.assign(json, { devDependencies })
        }

        return json
    })
}

export const init = (project_path: string) => {
    copy_template_file(project_path)
    edit_package_json(project_path)
}


