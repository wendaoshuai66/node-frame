const gulp = require('gulp');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const babel = require('gulp-babel');
const replace = require('rollup-plugin-replace')
const entry = './src/server/**/*.js';
const clearEntry = ["./src/server/config/index.js"]


function buildenv() {
    return watch(entry, { ignoreInitial: false }, function() {
            gulp.src(entry)
                .pipe(babel({
                    //非常重要一点，涉及到自己独立的编译，外面的留给前端
                    babelrc: false,
                    "plugins": [
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        "@babel/plugin-transform-modules-commonjs"
                    ]
                })).pipe(gulp.dest('dist'))
        })
        // .pipe(gulp.dest('dist')); 放外面监测不到，有点毛病 😔

}
//与开发没有多大区别，只不过要加一个流式清洗
function buildprod() {

    return gulp.src(entry)
        .pipe(babel({
            //非常重要一点，涉及到自己独立的编译，外面的留给前端
            babelrc: false,
            ignore: clearEntry,
            "plugins": [
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                "@babel/plugin-transform-modules-commonjs"
            ]
        })).pipe(gulp.dest('dist'))
}

function buildconfig() {
    return gulp.src(entry)
        .pipe(rollup({
            //注意一点要编译成commonjs
            output: {
                format: "cjs"
            },
            input: clearEntry,
            //由于打包后，对process.env.NODE_ENV没有处理
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
}

function lint() {

}
let build = gulp.series(buildenv)

if (process.env.NODE_ENV == 'lint') {
    build = gulp.series(lint)
}
if (process.env.NODE_ENV == 'production') {
    build = gulp.series(buildprod, buildconfig)
}
gulp.task("default", build)