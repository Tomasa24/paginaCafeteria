
const{ src, dest, watch, series, parallel } = require('gulp');

// CSS Y SASS
const sass =require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano =require('cssnano'); 

// Imagenes
const imagemin = require('gulp-imagemin');
const webp=require('gulp-webp');
const avif=require ('gulp-avif')
function css(done){
    //compilar SASS
    //pasos: 1: Indentificar archivo, 2: Compilarla, 3:Gugulpardarla el .css
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe( sass()) //{ outputStyle:'compressed'}
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css') );

        done();
}

function imagenes(){
   return src('src/img/**/*')
     .pipe( imagemin({optimizationLevel: 3 }) )
     .pipe( dest('build/img') )

}
function versionWebp(){
    const opciones={
        quality:50
    }
    return src('src/img/**/*.{png, jpg}')
    .pipe( webp(opciones) )
    .pipe( dest('build/img') )
}
function versionAvif(){
    const opciones={
        quality:50
    }
    return src('src/img/**/*.{png, jpg}')
    .pipe( avif(opciones) )
    .pipe( dest('build/img') )
}
function dev(){
   // watch('src/scss/header/_header.scss', css);
   watch('src/scss/**/*.scss', css);
   watch('src/img/**/*', imagenes);
   // watch('src/scss/app.scss', css)
}
/* function tareaDefault(){
    console.log("Soy la tarea por default")
} */
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default= series(imagenes, versionWebp, versionAvif, css, dev);

//Series: se inicia una tarea y hasta que finaliza, inicia la siguiente

//parallel :todas inicisn al mismo tiempo
