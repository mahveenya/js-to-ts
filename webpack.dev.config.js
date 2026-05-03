import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        static: path.resolve(__dirname, './dist'),
    },
};
