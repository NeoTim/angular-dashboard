'use strict';
(function(){
  angular
    .module('stageApp')
    .config( dashboard )
    function dashboard($stateProvider){
      var states = $stateProvider
      var list = getPages();
      for(var key in list){
        for (var i = 0; i < list[key].length; i++) {
          var url = '/' + key + '/'+ list[key][i]
          var state = 'page-' + key +'-'+ list[key][i];
          var template = 'app/views/dashboard/' + key +'/'+ list[key][i] + '.html';
          console.log(state)
          states.state(state, {
            url: url,
            templateUrl: template
          });
        };
      }
      function getPages(){
        return {
          charts: [
            'others',
            'flot',
            'morris'
          ],
          dashboard: [
            'dashboard'
          ],
          forms: [
            'elements',
            'layouts',
            'validation',
            'wizard'
          ],
          mail: [
            'compose',
            'inbox',
            'single'
          ],
          maps: [
            'gmap',
            'jqvmap'
          ],
          pages: [
            '404',
            '500',
            'about',
            'blank',
            'contact',
            'features',
            'forgot_password',
            'invoice',
            'lock_screen',
            'profle',
            'services',
            'signin',
            'signup'
          ],
          tables: [
            'dynamic',
            'responsive',
            'static'
          ],
          tasks: [
            'tasks'
          ],
          ui: [
            'buttons',
            'calendar',
            'components',
            'grids',
            'icons',
            'nested_lists',
            'pricing_tables',
            'timeline',
            'typography',
            'widgets',
          ]
        }
      }
    }

}).call(this);


