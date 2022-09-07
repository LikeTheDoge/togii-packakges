const path = require('path');
module.exports = {
    outputDir: 'lib',
    css: {
        extract: true,
    },
    pages: {
        'EcoAdminComponents': {
            entry: 'packages/components.js'
        }
    },
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