const path = require('path');
const pkg = require('./package.json')

module.exports = {
    publicPath: '/' + pkg.name,
    outputDir: 'dist/' + pkg.name,
    lintOnSave: false,
    // 修改 src 为 examples
    pages: {
        index: {
            entry: '__dev_source__/src/main.js',
            template: 'html/dev.html',
            filename: 'index.html',
        },
    },
    css: {
        extract: false,
        loaderOptions: {
            sass: {
                prependData: '@import "/__doc_source__/src/style/variables.scss";@import "/__doc_source__/src/style/mixin.scss";',
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

        svgRule.uses.clear();
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
    },
    devServer: {
        port: 8001,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
};