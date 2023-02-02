const { defineConfig } = require('@vue/cli-service');

const isProd = process.env.NODE_ENV === 'production';

module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: isProd ? '/relewise-demos-javascript/' : undefined,
    devServer: {
        port: 5200,
    },
});
