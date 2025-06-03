// Paths
import { source } from '../paths.js';

export const loadJavaScript = () => ({
    module: {
        rules: [
            {
                test:    /\.m?js$/,
                include: source,
                use:     'babel-loader',
            }
        ],
    },
});
