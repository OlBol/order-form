const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    const isProductionBuild = argv.mode === 'production';

    const js = {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
            presets: ['@babel/preset-env'],
            plugins: ["@babel/plugin-syntax-dynamic-import"]
        }
    };

    const css = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    };

    const handlebars = {
        test: /\.hbs/,
        loader: 'handlebars-loader'
    };

    const config = {
        entry: './src/main.js',

        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index.js'
        },

        devServer: {
            overlay: true
        },

        devtool: 'source-map',

        module: {
            rules: [js, handlebars, css]
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: 'Портфолио',
                template: './src/index.hbs'
            }),
        ]
    };

    if (isProductionBuild) {
        config.devtool = 'none';
        config.plugins = (config.plugins || []).concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
        ]);

        config.optimization = {};

        config.optimization.minimizer = [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin()
        ];
    }

    return config;
};
