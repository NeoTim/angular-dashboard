'use strict'; /*jshint loopfunc: true */

// npm install --save-dev gulp gulp-util gulp-sass gulp-jshint gulp-uglify gulp-ngmin gulp-csso gulp-concat gulp-useref gulp-livereload gulp-rimraf open nodemon lodash http tiny-lr
var htmlmin = require('gulp-htmlmin');
var gulp = require('gulp');
var util = require('gulp-util');
var ngtemplate = require('gulp-ngtemplate');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-ruby-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var csso = require('gulp-csso');
var concat = require('gulp-concat');
var useref = require('gulp-useref');
var refresh = require('gulp-livereload');
var jade = require('gulp-jade');
var fs = require('fs');
var _ = require('lodash');
var nodemon = require('nodemon');

var http = require('http');
var openURL = require('open');
var tinylr = require('tiny-lr');

var livereloadServer = tinylr();

var checkAppReadyInterval;

var HTTP_HOST = 'localhost';
var HTTP_PORT = 3000;
var LIVERELOAD_PORT = 35729;

process.env.NODE_APP_READY = 'false';

///////////////////////////////////////////////
/////////// SERVE / WATCH / RELOAD ////////////
///////////////////////////////////////////////
gulp.task('default', ['gulpfile', 'buildHtml', 'deleteTemp', 'sass', 'serverJs', 'clientJs', 'startLivereloadServer', 'startNode', 'launchProject', 'watch']);

gulp.task('gulpfile', function () {
  return gulp.src('gulpfile.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('deleteTemp', function () {
  return gulp.src('.tmp', {read: false})
    .pipe(rimraf());
});

gulp.task('sass', ['deleteTemp'], function () {
  return gulp.src('client/{app, components}**/*.scss')
    .pipe(sass({ compass: true, sourcemap: false, style: 'expanded' }))
    .pipe(gulp.dest('.tmp/'))
    .pipe(refresh(livereloadServer));
});

gulp.task('serverJs', function () {
  return gulp.src(['servers/server/**/*.js', 'app.js'])
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('clientJs', function () {
  return gulp.src('client/{app, components}**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('jshint-stylish'))
    .pipe(refresh(livereloadServer));
});

function checkAppReady() {
  if (process.env.NODE_APP_READY === 'true') {
    clearInterval(checkAppReadyInterval);
  } else {
    var options = {
      host: HTTP_HOST,
      port: HTTP_PORT,
      path: '/api/clients/'
    };
    http.get(options, function() {
      process.env.NODE_APP_READY = 'true';
    }).on('error', function() {
      process.env.NODE_APP_READY = 'false';
    });
  }
}
function onNodeServerLog(log) {
  console.log(util.colors.white('[') + util.colors.yellow('nodemon') + util.colors.white('] ') + log.message);
}
function onNodeServerRestart(files) {
  if (files) {
    process.env.NODE_APP_READY = 'false';
    for (var i = 0; i < files.length; i++) {
      console.log(util.colors.grey('  ' + files[i]));
    }
    checkAppReadyInterval = setInterval(function () {
      checkAppReady();
      if (process.env.NODE_APP_READY === 'true') {
        gulp.src(files)
          .pipe(refresh(livereloadServer));
      }
    }, 100);
  }
}

gulp.task('startNode', ['gulpfile', 'deleteTemp', 'sass', 'clientJs', 'serverJs'], function (callback) {
  nodemon('servers/server/app.js')
    .on('restart', onNodeServerRestart)
    .on('log', onNodeServerLog);

  checkAppReadyInterval = setInterval(function () {
    checkAppReady();
    if (process.env.NODE_APP_READY === 'true') {
      callback();
    }
  }, 100);
});

gulp.task('startLivereloadServer', function () {
  livereloadServer.listen(LIVERELOAD_PORT);
});

gulp.task('launchProject', ['startNode'], function () {
  openURL('http://' + HTTP_HOST + ':' + HTTP_PORT);
});

gulp.task('watch', ['launchProject'], function () {
  gulp.watch('client/**/*.scss', ['sass']);
  gulp.watch('client/**/*.html', function (event) {
    gulp.src(event.path)
      .pipe(refresh(livereloadServer));
  });
  gulp.watch('client/**/*.js', function (event) {
    gulp.src(event.path)
      // .pipe(jshint('.jshintrc'))
      // .pipe(jshint.reporter('jshint-stylish'))
      .pipe(refresh(livereloadServer));
  });
  gulp.watch('gulpfile.js', function () {
    console.log(util.colors.red('\n------------------------\nRestart the Gulp process\n------------------------'));
  });
});


///////////////////////////////////////////////
//////////////////// BUILD ////////////////////
///////////////////////////////////////////////
gulp.task('build', ['gulpfile', 'deleteDist', 'copyStatic', 'buildHtml', 'lintClientJs', 'findCssJsFromIndexAndProccess', 'buildServerJs']);

gulp.task('deleteDist', ['gulpfile'], function () {
  return gulp.src('dist', {read: false})
    .pipe(rimraf());
});

gulp.task('copyStatic', ['gulpfile', 'deleteDist'],  function () {
  gulp.src(['client/.htaccess', 'client/favicon.ico', 'client/robots.txt'])
    .pipe(gulp.dest('dist/public'));

  gulp.src(['package.json'])
    .pipe(gulp.dest('dist/public'));
});

gulp.task('buildHtml', ['gulpfile', 'deleteDist'], function () {
   var YOUR_LOCALS = {};
  gulp.src('client/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('.tmp/'));
    // .pipe(htmlmin({collapseWhitespace: true}))
    // .pipe(ngtemplate({module: function(name) { return 'stageApp' + name.split('/')[0]; }}))
    // .pipe(jade())
    // .pipe(gulp.dest('.tmp'));

  return gulp.src('client/index.html')
    .pipe(useref())
    .pipe(gulp.dest('dist/public'));
});

gulp.task('lintClientJs', ['gulpfile', 'deleteDist'], function () {
  return gulp.src('client/{app, components}**/*.js')
    // .pipe(jshint('.jshintrc')
    // .pipe(jshint.reporter('jshint-stylish'))
    // .pipe(jshint.reporter('fail')));
});

gulp.task('buildServerJs', ['gulpfile', 'deleteDist'], function () {
  gulp.src(['servers/server/**/*.js'])
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('jshint-stylish'))
    // .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('dist/servers/server'));

  gulp.src(['servers/serevr/app.js'])
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('jshint-stylish'))
    // .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('dist'));
});


gulp.task('findCssJsFromIndexAndProccess', ['gulpfile', 'deleteDist', 'lintClientJs'], function () {
  var file = fs.readFileSync('client/index.html', { encoding: 'utf-8'});
  var blocks = file.match(/(<!--[\t ]*build:.*-->)(.|\n|\r)*?(<!--[\t ]*endbuild[\t ]*-->)/g);

  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    var blockHeader = block.match(/<!--[\t ]*build:.*-->/)[0];

    var type = blockHeader.replace(/(<!--[\t ]*build:)(\w*)(.*)/, '$2');
    var destFileName = blockHeader.replace(/(<!--[\t ]*build:)([\w({.,})]* *)([\w.\/\\]*)(.*)/, '$3');
    var sourceFolders = blockHeader.replace(/(<!--[\t ]*build:)(css|js)\(\{?([\w.,\/\\]*)\}?\)(.*)/, '$3').split(',');
    var srcFiles = _.each(block.match(/((src|href)=")([^]+?)(?=")/g), function (val, i, arr) {
      arr[i] = val.replace(/(src|href)="/, '');
    });
    var paths = [];
    _.each(sourceFolders, function (folder) {
      _.each(srcFiles, function (file) {
        paths.push(folder + '/' + file);
      });
    });

    if (type && paths && destFileName && srcFiles) {
      if (type === 'css') {
        gulp.src(paths)
          .pipe(sass({includePaths: ['client/bower_components']}))
          .pipe(concat(destFileName))
          .pipe(csso())
          .pipe(gulp.dest('dist/public/'));
      }
      if (type === 'js') {
        gulp.src(paths)
          .pipe(concat(destFileName))
          .pipe(ngmin())
          .pipe(uglify())
          .pipe(gulp.dest('dist/public/'));
      }
    }
  }
});
