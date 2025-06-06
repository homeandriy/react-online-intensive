// webpack/configurations/common.js

// Core
import getRepositoryName from 'git-repo-name';
import chalk from 'chalk';

// Paths
import { source, build } from '../paths.js';

// Webpack modules
import {
    loadJavaScript,
    loadFonts,
    loadImages,
    setupHtml,
    setupContextReplacement,
    setupStyledReporting,
    initializeEnvVariables
} from '../modules/index.js';

// Instruments
import { merge } from 'webpack-merge';

export const generateCommonConfiguration = () => {
    const BUILD_ENV = process.env.BUILD_ENV;
    const IS_DEPLOYING_TO_GITHUB_PAGES = process.env.DEPLOY_TARGET === 'github-pages';
    let REPOSITORY_NAME = '';

    try {
        REPOSITORY_NAME = getRepositoryName.sync();
    } catch (error) {
        console.log(
            chalk.whiteBright.bgRed.bold(`
Твой локальный репозиторий не привязан к удалённому репозиторию, или локальный репозиторий отсутствует.
Для успешного деплоя на Github Pages:
    1. Если локального репозитория для этого проект нет — создай его;
    2. Создай удалённый репозиторий на Github;
    3. Привяжи локальный репозиторий этого проекта к удалённому репозиторию на Github.
`)
        );
    }

    return merge(
        // Loaders
        loadJavaScript(),
        loadFonts(),
        loadImages(),

        // Plugins
        setupHtml(),
        setupContextReplacement(),
        setupStyledReporting(),
        initializeEnvVariables({
            __ENV__:  JSON.stringify(BUILD_ENV),
            __DEV__:  BUILD_ENV === 'development',
            __PROD__: BUILD_ENV === 'production',
        }),
        {
            entry: {
                source,
            },
            output: {
                path:       build,
                publicPath: IS_DEPLOYING_TO_GITHUB_PAGES ? `/${REPOSITORY_NAME}/` : '/',
            },
            resolve: {
                extensions: ['.mjs', '.js', '.json', '.css', '.m.css', '.png', '.jpg'],
                modules:    [source, 'node_modules'],
            },
            performance: {
                hints: false
            },
            optimization: {
                nodeEnv: process.env.NODE_ENV,
                // Додаємо розділення коду на чанки:
                splitChunks: {
                    chunks: 'all',       // розділяти всі типи чанків (sync + async)
                    cacheGroups: {
                        // Виносимо всі залежності з node_modules у vendors-чанк
                        vendors: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all',
                        },
                        // Додаткові правила можна додати за потреби
                    },
                },
            },
        }
    );
};
