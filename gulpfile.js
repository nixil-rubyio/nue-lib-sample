const gulp = require('gulp');
const babel = require('gulp-babel');

const paths = {
    dest: {
        lib: 'lib',
        esm: 'esm',
        dist: 'dist',
    },
    styles: 'src/**/*.less',
    scripts: ['src/**/*.{ts,tsx}', '!src/**/demo/*.{ts,tsx}', '!src/**/__tests__/*.{ts,tsx}'],
};

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
    const { scripts } = paths;
    // 设置环境变量
    process.env.BABEL_ENV = babelEnv;
    return gulp
        .src(scripts)
        .pipe(babel()) // 使用gulp-babel处理
        .pipe(gulp.dest(destDir));
}

function compileCJS() {
    const { dest } = paths;
    return compileScripts('cjs', dest.lib);
}

function compileESM() {
    const { dest } = paths;
    return compileScripts('esm', dest.esm);
}

const buildScripts = gulp.series(compileCJS, compileESM);


function copyLess() {
    return gulp
      .src(paths.styles)
      .pipe(gulp.dest(paths.dest.lib))
      .pipe(gulp.dest(paths.dest.esm));
  }
  
const build = gulp.parallel(buildScripts, copyLess);

exports.build = build;

exports.default = build;