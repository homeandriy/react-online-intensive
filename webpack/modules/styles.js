// webpack/modules/styles.js

// Paths
import { source } from '../paths.js';

// PostCSS plugins
import imports from 'postcss-import';
import mqpacker from 'css-mqpacker';
import smootheFonts from 'postcss-font-smoothing';
import modules from 'postcss-icss-selectors';
import reporter from 'postcss-reporter';
import postcssPresetEnv from 'postcss-preset-env';
import gradients from 'postcss-easing-gradients';
import cssnano from 'cssnano';

// Plugins
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

// 1. Загальний конфіг для PostCSS
export const loadPostCSS = () => ({
    loader: 'postcss-loader',
    options: {
        sourceMap: true,
        postcssOptions: {
            plugins: [
                imports({
                    getPath:        source,
                    skipDuplicates: true,
                }),
                modules({
                    mode: (loader) =>
                        loader.resourcePath.includes('.m.css') ? 'local' : 'global',
                }),
                gradients(),
                smootheFonts(),
                postcssPresetEnv({ stage: 0 }),
                mqpacker(),
                reporter(),
                cssnano(),
            ],
        },
    },
});

// 2. Правило для CSS Modules (.m.css) у дев-режимі
export const loadCSSModules = () => ({
    module: {
        rules: [
            {
                test: /\.m\.css$/,
                include: source,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            esModule: false,            // ← відключаємо ES-модулі, щоб був default-експорт
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                        },
                    },
                    loadPostCSS(),
                ],
            },
        ],
    },
});

// 3. Правило для звичайного CSS (.css) у дев-режимі
export const loadGlobalCSS = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [source, /node_modules/],
                exclude: /\.m\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            esModule: false, // якщо в глобальних CSS теж хочете CommonJS-стиль
                        },
                    },
                    loadPostCSS(),
                ],
            },
        ],
    },
});

// 4. Для продакшену — CSS Modules (.m.css)
export const loadProductionCSSModules = () => ({
    module: {
        rules: [
            {
                test: /\.m\.css$/,
                include: source,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            esModule: false,            // ← вимикаємо ES-модулі
                            modules: {
                                localIdentName: '[contenthash:8]',
                            },
                        },
                    },
                    loadPostCSS(),
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[contenthash].[hash:5].css',
            chunkFilename: 'css/[contenthash].[hash:5].css',
        }),
    ],
});

// 5. Для продакшену — звичайний CSS (.css)
export const loadProductionGlobalCSS = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [source, /node_modules/],
                exclude: /\.m\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            esModule: false, // теж вимикаємо ES-модулі
                        },
                    },
                    loadPostCSS(),
                ],
            },
        ],
    },
});

// 6. Нарешті, експортуємо комбінований набір для dev і prod
export const loadDevelopmentCss = () => ({
    module: {
        rules: [
            ...loadCSSModules().module.rules,
            ...loadGlobalCSS().module.rules,
        ],
    },
});

export const loadProductionCss = () => ({
    module: {
        rules: [
            ...loadProductionCSSModules().module.rules,
            ...loadProductionGlobalCSS().module.rules,
        ],
    },
    plugins: [
        ...loadProductionCSSModules().plugins,
    ],
});
