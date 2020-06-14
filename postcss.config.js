const cssnano = require('cssnano');
const purgecss = require('postcss-purgecss');

module.exports = {
    plugins: [
        require('tailwindcss'),
        process.env.NODE_ENV === 'production' ? require('autoprefixer') : null,
        process.env.NODE_ENV === 'production'
            ? cssnano({
                preset: 'default'
            })
            : null,
        purgecss({
            content: [
                './src/**/*.html',
                './src/**/*.vue'
            ],
            defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
        })
    ]
};