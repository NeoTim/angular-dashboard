'use strict'
angular
  .module('gulpApp')
  .config ($stateProvider)->
    getPages = ()=>
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
    states = $stateProvider
    list = getPages()
    for key of list
      for i in list[key]
        url = '/' +key+ '/'+ i
        state = 'page-' +key+'-'+ i
        template = 'app/views/dashboard/' +key+'/'+ i + '.html'
        states.state(state, {
          url: url,
          templateUrl: template
        });

