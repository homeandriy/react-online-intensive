// webpack/modules/utils.js

// Paths
import { build } from '../paths.js';

// Plugins
import { CleanWebpackPlugin } from 'clean-webpack-plugin'; // ← іменований імпорт
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// Деструктуруємо класи з об'єкта 'webpack'
const {
    DefinePlugin,
    ContextReplacementPlugin,
    HotModuleReplacementPlugin
} = webpack;

export const initializeEnvVariables = (variables) => ({
    plugins: [new DefinePlugin(variables)],
});

export const setupContextReplacement = () => ({
    plugins: [
        new webpack.ContextReplacementPlugin(
            /moment[\/\\]locale$/,
            /en|uk/ // залишаємо лише англійську та українську локалі
        ),
    ],
});

export const setupHotModuleReplacement = () => ({
    plugins: [new HotModuleReplacementPlugin()],
});

export const setupBuildAnalysis = () => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:      'disabled',
            generateStatsFile: true,
            statsFilename:     'build-stats.json',
            openAnalyzer:      false,
        })
    ],
});

export const cleanBuildDirectory = () => ({
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [build],
            dangerouslyAllowCleanPatternsOutsideProject: true
        })
    ],
});

export const setupStyledReporting = () => ({
    stats:   'errors-only',
    plugins: [],
});
