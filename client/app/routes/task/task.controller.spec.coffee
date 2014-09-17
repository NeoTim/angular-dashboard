'use strict'

describe('Controller: TaskCtrl', ()->

  # load the controller's module
  beforeEach(module('gulpApp'));

  TaskCtrl = null
  scope = null

  # Initialize the controller and a mock scope
  beforeEach(inject(($controller, $rootScope)->
    scope = $rootScope.$new()
    TaskCtrl = $controller('TaskCtrl', {
      $scope: scope
    })
  ))

  it('should ...', ()->
    expect(1).toEqual(1)
  )
)
