'use strict'

angular.module 'gulpApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'restangular',
  'gulpApp.directives',
  'gulpApp.localization',
  'gulpApp.ui.ctrls',
  'gulpApp.ui.ctrls',
  'gulpApp.ui.directives',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'

]
.config (RestangularProvider, $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) ->
  $urlRouterProvider
  .otherwise '/'
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setRestangularFields({
    id: "_id",
    route: "restangularRoute",
    selfLink: "self.href"
  });

  $locationProvider.html5Mode true
  $httpProvider.interceptors.push 'authInterceptor'

.run ($rootScope, $location, Auth) ->
  # Redirect to login if route requires auth and you're not logged in
  $rootScope.$on '$stateChangeStart', (event, next) ->
    Auth.isLoggedInAsync (loggedIn) ->
      $location.path "/login" if next.authenticate and not loggedIn
