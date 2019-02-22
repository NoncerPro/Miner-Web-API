let mix = require('laravel-mix');

mix.js('src/main.js','app.js')
    .sass('src/app.sass','app.css')
    .copyDirectory('src/images', 'dist/images')
    .copy('src/index.html', 'dist/index.html')
    .copy('src/json-test/test.json', 'dist/test.json')
    .setPublicPath('dist');

mix.options({
    processCssUrls: false
});