const globby = require('globby');
const babel_core = require('babel-core');
const path = require('path');
const fs = require('fs-extra');
const UglifyJS = require("uglify-js");
const UglifyCSS = require("uglifycss");

publicTransform('src/public/js', 'dist/public/js', {
    babel: {
        "presets": [
            "env"
        ]
    }
}).then(() => {
    console.log("Babel transforming finished.\n");
    publicUglifyJS('dist/public/js', 'dist/public/js');
});

publicUglifyCSS('src/public/css', 'dist/public/css');
fs.copy('src/public/img', 'dist/public/img').catch(err => console.log(`\x1b[31mError: ${err}`));
fs.copy('src/public/libs', 'dist/public/libs').catch(err => console.log(`\x1b[31mError: ${err}`));;
fs.copy('src/views/', 'dist/views').catch(err => console.log(`\x1b[31mError: ${err}`));;
fs.copy('config.json', 'dist/config.json').catch(err => console.log(`\x1b[31mError: ${err}`));;

/**
 * Transform with babel
 * @param {string} src 
 * @param {string} dest 
 * @param {object} options 
 */
function publicTransform(src, dest, options) {
    src = path.resolve(src);
    dest = path.resolve(dest);

    function t(file) {
        console.log(file);
        return babelTransform(file, src, dest, {
            filename: file,
            ...options
        });
    }

    return globby('**/*.js', {
        cwd: src
    }).then((files) => {
        return Promise.all(files.map(t))
    });
}

async function babelTransform(file, src, dest, {
    babel,
    onFile
} = {}) {
    const filepath = path.join(src, file);
    const content = await fs.readFile(filepath);
    const destpath = path.join(dest, file);

    const code = babel_core.transform(content.toString(), babel).code;

    return fs.outputFile(destpath, code).then(() => {
        onFile && onFile(file);
    });
}

/**
 * Uglify .js files
 * @param {string} src 
 * @param {string} dest 
 * @param {object} options 
 */
function publicUglifyJS(src, dest, options) {
    src = path.resolve(src);
    dest = path.resolve(dest);

    function t(file) {
        return uglifyJSTransform(file, src, dest);
    }

    return globby('**/*.js', {
        cwd: src
    }).then((files) => {
        return Promise.all(files.map(t))
    });
}

async function uglifyJSTransform(file, src, dest) {
    const filepath = path.join(src, file);
    const content = await fs.readFile(filepath);
    const destpath = path.join(dest, file);

    let code = UglifyJS.minify(content.toString()).code;

    return fs.outputFile(destpath, code).then(() => {

    });
}

/**
 * Uglify .css files
 * @param {string} src 
 * @param {string} dest 
 * @param {object} options 
 */
function publicUglifyCSS(src, dest, options) {
    src = path.resolve(src);
    dest = path.resolve(dest);

    function t(file) {
        return uglifyCSSTransform(file, src, dest);
    }

    return globby('**/*.css', {
        cwd: src
    }).then((files) => {
        return Promise.all(files.map(t))
    });
}

async function uglifyCSSTransform(file, src, dest) {
    const filepath = path.join(src, file);
    const content = await fs.readFile(filepath);
    const destpath = path.join(dest, file);

    let code = UglifyCSS.processString(content.toString());

    return fs.outputFile(destpath, code).then(() => {

    });
}