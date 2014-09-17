var gulp        = require('gulp'),
    g           = require('gulp-load-plugins')({lazy: false}),
    noop        = g.util.noop,
    es          = require('event-stream'),
    bowerFiles  = require('main-bower-files'),
    rimraf      = require('rimraf'),
    queue       = require('streamqueue'),
    lazypipe    = require('lazypipe'),
    stylish     = require('jshint-stylish'),
    bower       = require('./bower'),
    isWatching  = false,
    sync        = require('browser-sync'),
    jade        = require('gulp-jade'),
    del         = require('del');


var htmlminOpts = {
  removeComments: true,
  collapseWhitespace: true,
  removeEmptyAttributes: false,
  collapseBooleanAttributes: true,
  removeRedundantAttributes: true
};

var errorHandler  = require('./build/errors');
var config        = require('./build/config');


gulp.task('clean-css', function(done){
  del(config.build.styles, {force:true}, done);
});
gulp.task('clean-js', function(done){
  del(config.build.scripts, {force:true}, done);
});

// Sass
// gulp.task('sass', function(){
//   return gulp.src(config.client.sass)
//     .pipe(g.rubySass({compass: true}))
//     .pipe(gulp.dest(config.build.styles))
//     .pipe(g.cached('built-css'))
//     .pipe(g.livereload())
// });
// gulp.task('styles', function(){
//   return gulp.src(config.client.styles)
//     .pipe(g.rubySass({compass: true}))
//     .pipe(gulp.dest(config.build.styles))
//     .pipe(g.cached('built-css'))
//     .pipe(g.livereload())
// });


// Less
gulp.task('less', function(){
  return gulp.src(config.client.less)
    .pipe(g.sourcemaps.init())
    .pipe(g.less())
    .pipe(g.sourcemaps.write( config.build.styles ))
    .pipe(gulp.dest( config.build.styles ))
    .pipe(g.cached('built-css'))
    .pipe(g.livereload())

});

gulp.task('styles', function(){
  return gulp.src(config.client.styles)
    .pipe(g.sourcemaps.init())
    .pipe(g.less())
    .pipe(gulp.dest(config.build.styles))
    .pipe(g.sourcemaps.write( config.build.styles ))
    .pipe(g.cached('built-css'))
    .pipe(g.livereload())
});

// Coffee
// gulp.task('coffee', function(){
//   return gulp.src(config.client.scripts)
//     .pipe(g.coffee())
//     .pipe(g.ngAnnotate())
//     .pipe(g.concat(config.app_main_file))
//     .pipe(gulp.dest(config.build.scripts))
//     .pipe(g.livereload());
// });

// JavaScript
gulp.task('js', function(){
  return gulp.src(config.client.scripts)
    .pipe(g.jshint())
      .on('error', errorHandler.onWarning)
    .pipe(g.jshint.reporter('default'))
    .pipe(g.ngAnnotate())
    .pipe(g.concat(config.app_main_file))
    .pipe( gulp.dest( config.build.scripts ) )
    .pipe(g.livereload())

});

// Jade
// gulp.task('jade', function(){
//   return gulp.src(config.client.templates.jade)

//     .pipe(jade())
//     .pipe(g.angularTemplatecache('jade-templates.js', { module: "gulpApp"}))
//     .pipe(gulp.dest(config.build.path))
//     .pipe(g.livereload());

// });

gulp.task('html', function(){
  return gulp.src(config.client.templates.html)
    .pipe(g.angularTemplatecache('html-templates.js', { module: "gulpApp"}))
    .pipe(gulp.dest(config.build.path))
    .pipe(g.livereload());
});
gulp.task('index', function(){
  return gulp.src(config.client.index)
    .pipe(gulp.dest(config.build.path))
    .pipe(g.livereload());
});

gulp.task('vendor:scripts', function(){
  return gulp.src(config.vendor.scripts)
    .pipe(g.concat('vendor.js'))
    .pipe(gulp.dest(config.build.scripts));
});

gulp.task('vendor:styles', function(){
  return gulp.src(config.vendor.styles)
    .pipe(g.concat('vendor.css'))
    .pipe(gulp.dest(config.build.styles));
});


gulp.task('assets', function(){
  return gulp.src(config.client.assets)
    .pipe(gulp.dest(config.build.assets))
});
gulp.task('vendor:fonts', function(){
  return gulp.src(config.vendor.fonts)
    .pipe(gulp.dest(config.build.fonts))
});

gulp.task('develop', function () {
  g.nodemon({ script: 'servers/server/app.js', ext: 'html js', ignore: ['ignored.js'] })
    // .on('change', ['lint'])
    .on('restart', function () {
      console.log('restarted!')
    });
});


gulp.task('watch', function(){

  // Coffee
  // gulp.watch(config.client.scripts, ['coffee'])
  // Js
  gulp.watch(config.client.scripts, ['js'])
  // Sass
  // gulp.watch(config.client.sass, ['sass'])
  // Less
  gulp.watch(config.client.less, ['less'])

  // Jade
  // gulp.watch(config.client.templates.jade, ['jade'])
  gulp.watch(config.client.templates.html, ['html'])

  gulp.watch(config.client.styles, ['styles'])

  builtFiles = [
    config.build.scripts + 'app.js',
    config.build.path + 'html-cache.js',
    // Jade
    // config.build.path + 'jade-cache.js',
    config.build.styles + 'main.css',
    config.build.path + 'index.html'
  ]
  gulp.watch(builtFiles, notifyLiveReload);
})

gulp.task('vendor', ['vendor:scripts', 'vendor:styles', 'vendor:fonts']);

gulp.task('clean', ['clean-js', 'clean-css']);

/*
 *   Scripts
 */
// Coffee
// gulp.task('build:scripts', ['coffee'])

//  Javascript
gulp.task('build:scripts', ['js'])

/*
 *   Templates
 */

// Jade
// gulp.task('templates', ['index', 'jade', 'html']);

// HTML
gulp.task('templates', ['index', 'html']);

/*
 *    Styles
 */

// Sass
// gulp.task('build:styles', ['sass', 'styles'])

// Less
gulp.task('build:styles', ['less', 'styles'])



gulp.task('build', ['clean', 'build:styles', 'build:scripts', 'templates', 'assets', 'vendor']);

gulp.task('default', ['build','develop', 'watch']);


function notifyLiveReload(event){
  console.log('File ' + event.path + ' was ' + event.type + ', reloading...');
  gulp.src(event.path, { read:false })
    // .pipe(g.livereload());
}

function testFiles() {
  return new queue({objectMode: true})
    .queue(gulp.src(fileTypeFilter(bowerFiles(), 'js')))
    .queue(gulp.src('./bower_components/angular-mocks/angular-mocks.js'))
    .queue(appFiles())
    .queue(gulp.src(['./src/app/**/*_test.js', './.tmp/src/app/**/*_test.js']))
    .done();
}

/**
 * All CSS files as a stream
 */
function cssFiles (opt) {
  return gulp.src('./.tmp/css/**/*.css', opt);
}

/**
 * All AngularJS application files as a stream
 */
function appFiles () {
  var files = [
    './.tmp/' + bower.name + '-templates.js',
    './.tmp/src/app/**/*.js',
    '!./.tmp/src/app/**/*_test.js',
    './src/app/**/*.js',
    '!./src/app/**/*_test.js'
  ];
  return gulp.src(files)
    .pipe(g.angularFilesort());
}

/**
 * All AngularJS templates/partials as a stream
 */
function templateFiles (opt) {
  return gulp.src(['./src/app/**/*.html', '!./src/app/index.html'], opt)
    .pipe(opt && opt.min ? g.htmlmin(htmlminOpts) : noop());
}

/**
 * Build AngularJS templates/partials
 */
function buildTemplates () {
  return lazypipe()
    .pipe(g.ngHtml2js, {
      moduleName: bower.name,
      prefix: '/' + bower.name + '/',
      stripPrefix: '/src/app'
    })
    .pipe(g.concat, bower.name + '-templates.js')
    .pipe(gulp.dest, './.tmp')
    .pipe(livereload)();
}

/**
 * Filter an array of files according to file type
 *
 * @param {Array} files
 * @param {String} extension
 * @return {Array}
 */
function fileTypeFilter (files, extension) {
  var regExp = new RegExp('\\.' + extension + '$');
  return files.filter(regExp.test.bind(regExp));
}

/**
 * Concat, rename, minify
 *
 * @param {String} ext
 * @param {String} name
 * @param {Object} opt
 */
function dist (ext, name, opt) {
  opt = opt || {};
  return lazypipe()
    .pipe(g.concat, name + '.' + ext)
    .pipe(gulp.dest, './dist')
    .pipe(opt.ngAnnotate ? g.ngAnnotate : noop)
    .pipe(opt.ngAnnotate ? g.rename : noop, name + '.annotated.' + ext)
    .pipe(opt.ngAnnotate ? gulp.dest : noop, './dist')
    .pipe(ext === 'js' ? g.uglify : g.minifyCss)
    .pipe(g.rename, name + '.min.' + ext)
    .pipe(gulp.dest, './dist')();
}

/**
 * Livereload (or noop if not run by watch)
 */
function livereload () {
  return lazypipe()
    .pipe(isWatching ? g.livereload : noop)();
}

/**
 * Jshint with stylish reporter
 */
function jshint (jshintfile) {
  return lazypipe()
    .pipe(g.jshint, jshintfile)
    .pipe(g.jshint.reporter, stylish)();
}