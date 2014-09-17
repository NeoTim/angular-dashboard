'use strict'
angular
  .module('gulpApp')
  .controller 'AppCtrl', [
    '$scope', '$location', 'Auth', 'uiPages',
    ($scope, $location, Auth, uiPages) ->

      $scope.isSpecificPage = ()->
        path = $location.path()
        return _.contains(['/404', '/pages/500', '/login', '/signup', '/pages/signin1', '/pages/signin2', '/pages/signup', '/pages/signup1', '/pages/signup2', '/pages/forgot', '/lock-screen'], path)

      pages = uiPages.all()
      $scope.menu = [{
        'title': 'Home',
        'link': '/'
      }]
      for key of pages
        page = {
          title: key,
          icon: pages[key].icon,
          subPages: []
        }
        for item in pages[key]
          url = '/' +key+ '/'+ item
          state = 'page-' + key +'-'+ item
          page.subPages.push({title: item, link: url})

        $scope.menu.push(page)

      $scope.isCollapsed = true
      $scope.isLoggedIn = Auth.isLoggedIn
      $scope.isAdmin = Auth.isAdmin
      $scope.getCurrentUser = Auth.getCurrentUser

      $scope.logout = ()->
        Auth.logout()
        $location.path('/login')


      $scope.isActive = (route)->
        return route is $location.path()

      return $scope.main = {
        brand: 'Square',
        name: 'Lisa Doe'
      }
  ]
