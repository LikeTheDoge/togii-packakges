const path = require('path');
// const docsLoader = require.resolve('./plugins/docs-loader.js');

module.exports = {
    publicPath: '/',
    lintOnSave: fasle,
    configureWebpack: {
        resolve: {
            alias: {
                'eco-lib-components': path.join(__dirname, './packages'),
            },
        },
    },
    // 修改 src 为 examples
    pages: {
        examples: {
            entry: 'examples/main.js',
            template: 'public/examples.html',
            filename: 'examples.html',
        },
        index: {
            entry: 'site/src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
        },
    },

    css: {
        extract: false,
        loaderOptions: {
            sass: {
                prependData: '@import "/examples/style/variables.scss";@import "/examples/style/mixin.scss";',
            },
            less: {
                lessOptions: {
                    modifyVars: {
                        /* less 变量覆盖，用于自定义 ant design 主题 */
                        'primary-color': '#4771F8',
                        'link-color': '#4771F8',
                        'border-radius-base': '0',
                    },
                    javascriptEnabled: true,
                },
                javascriptEnabled: true,
            },
        },
    },
    // 扩展 webpack 配置，使 packages 加入编译
    chainWebpack: config => {
        config.module
            .rule('js')
            .include.add(path.resolve(__dirname, '/packages')).end()
            .use('babel')
            .loader('babel-loader')

        const svgRule = config.module.rule('svg');

        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear();

        // 添加要替换的 loader
        svgRule
            .use('babel-loader')
            .loader('babel-loader')
            .end()
            .use('vue-svg-loader')
            .loader('vue-svg-loader');

        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {
                limit: 102400,
            }));

        config.module
            .rule('md')
            .test(/\.md$/)
            .use('raw-loader')
            .loader('raw-loader');

    },
    devServer: {
        port: 8001,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
};