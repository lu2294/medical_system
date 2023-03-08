
const { override, fixBabelImports, addLessLoader, addWebpackAlias, addDecoratorsLegacy, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const  AntdDayjsWebpackPlugin  = require('antd-dayjs-webpack-plugin');
const path = require('path');
const isEnvProduction = process.env.NODE_ENV === "production";
// 判断开发环境，生产环境
const rewiredMap = () => config => {
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
    return config;
};
// 打包时查看打包体积大小
// const addAnalyzer = () => config => {
//     if (isEnvProduction) {
//         config.plugins.push(new BundleAnalyzerPlugin());
//     }
//     return config;
// };
// 打包压缩 
const addCompression = () => config => {
    if (process.env.NODE_ENV === 'production') {
        config.output.publicPath = "/xdr/";
    }
    return config;
};

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,//设置less
    }),
    addDecoratorsLegacy(),
    rewiredMap(),
    // addAnalyzer(),
    addCompression(),
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src"),
        ["utils"]: path.resolve(__dirname, "src/utils"),
        ["images"]: path.resolve(__dirname, "src/assets/images"),
        ["@components"]: path.resolve(__dirname, "src/pages/components"),
        ["@services"]: path.resolve(__dirname, "src/services"),
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#5a84ee',
            '@layout-header-background': '#fff',
            "@text-color": "#53627c",
        },
    }),
    addWebpackPlugin(
        new AntdDayjsWebpackPlugin()
    )
);