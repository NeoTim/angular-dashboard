'use strict'
angular
  .module('collapseNav', [])
  .directive('collapseNav', [ ->
    return {
      restrict: 'A'
      link: (scope, ele, attrs) ->
        $lists = ele.find('ul').parent('li') # only target li that has sub ul
        $lists.append('<i class="fa fa-caret-right icon-has-ul"></i>')
        $a = $lists.children('a')
        $listsRest = ele.children('li').not($lists)
        $aRest = $listsRest.children('a')

        app = $('#app')

        $a.on('click', (event) ->

          # disable click event when Nav is in mini style
          if ( app.hasClass('nav-min') ) then return false

          $this = $(this)
          $parent = $this.parent('li')
          $lists.not( $parent ).removeClass('open').find('ul').slideUp()
          $parent.toggleClass('open').find('ul').slideToggle()

          event.preventDefault()
        )

        $aRest.on('click', (event) ->
          $lists.removeClass('open').find('ul').slideUp()
        )

        # reset collapse NAV, sub Ul should slideUp
        scope.$on('minNav:enabled', (event) ->
          $lists.removeClass('open').find('ul').slideUp()
        )

    }
  ])