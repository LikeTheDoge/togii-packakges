import * as fs from 'fs'
import * as node_path from 'path'
import * as markdown_it from 'markdown-it'
import * as matter from 'gray-matter'
import { file } from '../../utils/file'

const md = markdown_it({ html: true })

const relative = (from: string, to: string, isFormFile: boolean = false) => {
    const f = isFormFile ? node_path.resolve(from, '../') : from
    const p = node_path.relative(f, to).split(node_path.sep).join(node_path.posix.sep)
    return p[0] === '.' ? p : ('./' + p)
}


export class Markdown {
    path = ''
    title = ''
    subtitle = ''
    description = ''
    source = ''
    rawMarkdownContent = ''
    content: (
        { isMarkdown: true, isDemo: false, content: string } |
        { isDemo: true, isMarkdown: false, name: string }
    )[] = []

    name = ''
    ctx = { public: '' }

    static prase(content: string) {
        return md.render(content);
    }

    updateSource() {
        this.source = fs.readFileSync(this.path, 'utf-8').trim();
    }

    updateInfo() {
        const result = matter(this.source)

        const rawMarkdownContent = result.content
        const {
            title, subtitle, description
        } = result.data

        Object.assign(this, {
            rawMarkdownContent,
            title: title || '(blank)',
            subtitle: subtitle || '(blank)',
            description: description || '(blank)'
        });
    }

    updateContent() {
        this.content = this.rawMarkdownContent
            .replaceAll('{{ctx_public}}', this.ctx.public)
            .split(/(\[demo\]\([a-z|A-Z|0-9]*\))/)
            .map<{ isMarkdown: true, isDemo: false, content: string } | { isMarkdown: false, isDemo: true, name: string }>(content => {
                if (!/(\[demo\]\([a-z|A-Z|0-9]*\))/.test(content)) {
                    return { isDemo: false, isMarkdown: true, content };
                }
                return { isDemo: true, isMarkdown: false, name: (content.match(/\[demo\]\(([a-z|A-Z|0-9]*)\)/) || ['', ''])[1] };
            })
    }

    static index = 0
    constructor(name: string, path: string, option: { public: string }) {
        const s = name.split('.').reverse()
        const n = s[0] === 'md' ? s[1] : s[0]
        this.name = n ? n : ('markdown_' + Markdown.index++)
        this.path = path
        this.ctx.public = option.public
        this.updateSource()
        this.updateInfo()
        this.updateContent()
    }
}

export class DemoGroup {
    map: Map<string, { name: string, source: string, path: string }> = new Map()
    sourceDirPath = ''
    codeJsonPath = ''
    constructor(
        sourceDirPath: string,
        codeJsonPath = ''
    ) {
        this.sourceDirPath = sourceDirPath
        this.codeJsonPath = codeJsonPath
        const list = fs.readdirSync(this.sourceDirPath, { withFileTypes: true })
            .filter(file => file.isFile() && (file.name.indexOf('.vue') > 0))
            .map(v => v.name.replace('.vue', ''));

        list.forEach(name => this.add(name));

        this.code()
    }
    private add(name: string) {
        const path = node_path.resolve(
            this.sourceDirPath, `./${name}.vue`
        )
        if (!file.exist(path))
            throw new Error('vue file not exist')

        const source = fs.readFileSync(path, 'utf-8');

        this.map.set(name, {
            path, source, name
        })
    }

    private code() {
        const data: { [key: string]: string } = {}
        Array.from(this.map.values()).forEach(({ name, source }) => {
            data[name] = source
        })
        fs.writeFileSync(this.codeJsonPath, JSON.stringify(data, undefined, 2));
    }
}

export class VueDocFile {
    path = ''
    markdown: Markdown
    demoGroup: DemoGroup | null = null
    constructor(
        path: string,
        markdown: Markdown,
        demoGroup: DemoGroup | null,
    ) {

        this.path = path
        this.markdown = markdown
        this.demoGroup = demoGroup
    }

    createFile() {
        const template = this.markdown.content.map(v => {
            if (v.isMarkdown) return Markdown.prase(v.content);
            if (v.isDemo && this.demoGroup) {
                const demo = this.demoGroup.map.get(v.name);
                if (!demo) return '';
                const { name } = demo;
                return `<div><${name}></${name}></div>`;
            }
            return ''
        }).join('\r');

        const source = `
<template>
    <mark-down-post   
        title="${this.markdown.title}"
        subtitle="${this.markdown.subtitle}" 
        description="${this.markdown.description}">
        ${template}
    </mark-down-post>
</template>
<script>
${this.demoGroup ? `import code from '${relative(this.path, this.demoGroup.codeJsonPath, true)}'` : ''}
${this.demoGroup ? Array.from(this.demoGroup.map.values()).map(({ path, name }) =>
            `import ${name} from '${relative(this.path, path, true)}'`).join(';\r') : ''
            }

export default {
    components:{
    ${this.demoGroup ? Array.from(this.demoGroup.map.values()).map(({ name }) =>
                `       ${name}`).join(',\r') : ''}
    },
    data() {
        return { 
            ${this.demoGroup ? 'code' : ''}
        }
    },
}

</script>
        `;

        fs.writeFileSync(this.path, source)
    }
}

export class ComponentInfo {

    name = ''
    dirPath = ''
    docPath = ''
    demoPath = ''

    constructor(name: string, dirPath: string) {
        this.name = name
        this.dirPath = dirPath
        this.docPath = node_path.resolve(
            this.dirPath, './README.md'
        )
        this.demoPath = node_path.resolve(
            this.dirPath, './demo'
        )
    }

}

export class RouteFile {
    routeFilePath = ''
    routeDirPath = ''
    base = ''
    docs: VueDocFile[] = []
    components: VueDocFile[] = []

    constructor(
        path: string,
        { base, docs, components, }: {
            base: string,
            docs: VueDocFile[],
            components: VueDocFile[]
        }
    ) {
        this.routeFilePath = path
        this.routeDirPath = node_path.resolve(
            this.routeFilePath, '../'
        )
        this.docs = docs
        this.base = base
        this.components = components
    }


    createFile() {
        const compRoutes = this.components.map(vue => {
            return {
                path: `/components/${vue.markdown.name}`,
                name: 'Component_' + vue.markdown.name,
                title: vue.markdown.name,
                impl: relative(this.routeFilePath, vue.path, true),
            };
        });

        const docRoutes = this.docs.map(vue => {
            return {
                path: `/docs/${vue.markdown.name}`,
                name: 'Doc_' + vue.markdown.name,
                title: vue.markdown.title,
                impl: relative(this.routeFilePath, vue.path, true),
            };
        });

        const fileContent = `
        export const base = "/${this.base}/" 

        export const routes = [
            ${[...compRoutes, ...docRoutes].map(v => `
            {
                name:"${v.name}",
                path:"${v.path}",
                component: import("${v.impl}")
            }
                `).join(',\r')
            }
        ]
        
        export const nav = [
        
            ${docRoutes.map(v => `
            {
                name:"${v.title}",
                path:"${v.path}",
            }
            `).join(',\r')}
        
            ,
        
            {
                name:"组件",
                path:"/components",
                children:[
                    ${compRoutes.map(v => `
                    {
                        name:"${v.title}",
                        path:"${v.path}",
                    }
                `).join(',\r')
            }    
                ]
            }
        ]
        
        
        `;
        fs.writeFileSync(this.routeFilePath, fileContent);
    }
}