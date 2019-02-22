let mix = require('laravel-mix');

mix.js('src/main.js','app.js')
    .sass('src/app.sass','app.css')
    .copyDirectory('src/images', '../html/images')
    .copy('src/index.html', '../html/index.html')
    .copy('src/json-test/test.json', '../html/test.json')
    .setPublicPath('../html');

mix.options({
    processCssUrls: false
});