const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'github-contribution-calendar',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,                // Handle .js and .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],  // Babel presets
                    },
                },
            },
            {
                test: /\.css$/,               // Handle .css files
                use: ['style-loader', 'css-loader'],  // Load CSS into the DOM
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],  // Resolve .js and .jsx files
    },
    externals: {
        react: 'react',   // Exclude React from the bundle
        'react-dom': 'react-dom',
    },
};
