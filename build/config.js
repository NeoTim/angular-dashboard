var config = {

  client: {
    path: 'client',

    scripts: ['client/{app,components}/**/*.js','!client/{app,components}/**/*.spec.js'],

    styles: ['client/{app,components}**/*.scss'],

    index: 'client/index.html',
    templates:{

     jade: 'client/**/*.jade',
     html: ['client/**/*.html', '!client/index.html']

    },
    vendor: 'client/bower_components',
    assets: 'client/assets',
    module: 'gulpApp',

  },
  vendor : {
    scripts: [
      "client/bower_components/jquery/dist/jquery.js"
      ,"client/bower_components/angular/angular.js"
      ,"client/bower_components/angular-resource/angular-resource.js"
      ,"client/bower_components/angular-cookies/angular-cookies.js"
      ,"client/bower_components/angular-sanitize/angular-sanitize.js"
      ,"client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"
      ,"client/bower_components/lodash/dist/lodash.compat.js"
      ,"client/bower_components/angular-socket-io/socket.js"
      ,"client/bower_components/angular-ui-router/release/angular-ui-router.js"
      ,"client/bower_components/restangular/dist/restangular.js"
      ,"client/vendors/socket.io.js"

    ],
    styles: [
      "client/bower_components/font-awesome/css/font-awesome.css"
    ],
    fonts: [
      'client/bower_components/bootstrap/fonts/*'
      ,'client/bower_components/font-awesome/fonts/*'
    ]
  },
  build: {
    path: '.tmp/',
    styles: '.tmp/styles/',
    scripts: '.tmp/scripts/',
    dist: 'dist/public',
    assets: '.tmp/assets/',
    fonts: '.tmp/fonts'
  },
  app_main_file: 'app.js',
  css_main_file: 'app.css',
  templates_file: 'app.templates.js',
  templates_module: 'gulpApp',
  vendor_main_file: 'vendor.js',
  bower_main_file: 'bower-vendor.js'
}
module.exports = config;