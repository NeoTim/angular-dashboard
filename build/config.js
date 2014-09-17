var config = {

  client: {
    path: 'client',
    // Coffee
    // scripts: ['client/{app,components}/**/*.coffee','!client/{app,components}/**/*.spec.coffee'],

    // JS
    scripts: ['client/{app,components}/**/*.js','!client/{app,components}/**/*.spec.js'],

    // Sass
    // sass: ['client/styles/main.scss'],
    // styles: ['client/app/app.scss'],

    // Less
    less: ['client/styles/main.less'],
    styles: ['client/app/app.less'],
    index: 'client/index.html',
    templates:{
     // Jade
     // jade: 'client/**/*.jade',
     // html: ['client/**/*.html', '!client/index.html']

     // HTML
     html: ['client/**/*.html', '!client/index.html']
    },
    vendor: 'client/bower_components',
    assets: 'client/assets',
    module: 'gulpApp',

  },
  vendor : {
    scripts: [
      "client/vendors/socket.io.js"
      ,"client/bower_components/modernizr/modernizr.js"
      ,"client/bower_components/jquery/dist/jquery.js"
      ,"client/bower_components/angular/angular.js"
      ,"client/bower_components/angular-resource/angular-resource.js"
      ,"client/bower_components/angular-cookies/angular-cookies.js"
      ,"client/bower_components/angular-sanitize/angular-sanitize.js"
      ,"client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"
      ,"client/bower_components/lodash/dist/lodash.compat.js"
      ,"client/bower_components/angular-socket-io/socket.js"
      ,"client/bower_components/angular-ui-router/release/angular-ui-router.js"
      ,"client/bower_components/restangular/dist/restangular.js"
      ,"client/bower_components/angular-animate/angular-animate.js"
      ,"client/bower_components/bootstrap-file/bootstrap-file.js"
      ,"client/bower_components/toastr/toastr.js"
      ,"client/bower_components/raphael/raphael.js"
      ,"client/bower_components/mocha/mocha.js"
      ,"client/bower_components/morris.js/morris.js"
      ,"client/bower_components/jquery-ui/jquery-ui.js"
      ,"client/bower_components/holderjs/holder.js"
      ,"client/bower_components/seiyria-bootstrap-slider/js/bootstrap-slider.js"
      ,"client/bower_components/jquery.slimscroll/jquery.slimscroll.min.js"
      ,"client/bower_components/jquery.easing/js/jquery.easing.min.js"
      ,"client/bower_components/moment/moment.js"
      ,"client/bower_components/flot/jquery.flot.js"
      ,"client/bower_components/jquery-steps/build/jquery.steps.js"
      ,"client/bower_components/angular-wizard/dist/angular-wizard.js"
      ,"client/bower_components/textAngular/dist/textAngular.min.js"
      ,"client/bower_components/flot.tooltip/js/jquery.flot.tooltip.js"
      ,"client/bower_components/angular-ui-tree/dist/angular-ui-tree.js"
      ,"client/bower_components/angularjs-google-maps/dist/ng-map.js"
      ,"client/bower_components/ng-tags-input/ng-tags-input.min.js"
      ,"client/bower_components/firebase/firebase.js"
      ,"client/bower_components/firebase-simple-login/firebase-simple-login.js"
      ,"client/bower_components/angularfire/angularfire.js"
      ,"client/bower_components/gsap/src/uncompressed/TweenMax.js"
      ,"client/bower_components/ng-Fx/dist/ng-Fx.js"
      ,"client/bower_components/anngular-socket-io/mock/socket-io.js"
    ],
    styles: [
      "client/bower_components/font-awesome/css/font-awesome.css"
      ,"client/bower_components/toastr/toastr.css"
      ,"client/bower_components/morris.js/morris.css"
      ,"client/bower_components/jquery-steps/demo/css/jquery.steps.css"
      ,"client/bower_components/angular-ui-tree/dist/angular-ui-tree.min.css"
      ,"client/bower_components/ng-tags-input/ng-tags-input.min.css"
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