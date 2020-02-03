const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

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

    const files = {
        test: /\.(png|jpe?g|webp|gif|woff2?)$/i,
        loader: 'file-loader',
        options: {
            name: '[hash].[ext]'
        }
    };

    const svg = {
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: svgPath => `sprite${svgPath.substr(-4)}`
                }
            },
            'svg-transform-loader', 'svgo-loader'
        ]
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
            rules: [js, handlebars, css, files, svg]
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: 'Портфолио',
                template: './src/index.hbs'
            }),
            new SpriteLoaderPlugin({ plainSprite: true })
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
