angular.module("starter.directives")
.directive 'card', ($ionicGesture, MovementService) ->

  restrict: 'E'
  replace: true
  templateUrl: 'templates/directives/card.html'
  link: (scope, elem, attrs) ->
    MovementService.reset(elem)
    draggable = true

    dragFn = (e) ->
      # if draggable
      MovementService.stop()
      MovementService.drag(e.gesture.deltaX, e.gesture.deltaY, elem)
      # cardExit('right', e.gesture.deltaX, e.gesture.deltaY, 'asdf') if e.gesture.deltaX > 200
      # cardExit('left', e.gesture.deltaX, e.gesture.deltaY, 'asdf') if e.gesture.deltaX < -200
    $ionicGesture.on('drag', dragFn, elem);

    releaseFn = (e) ->
      # if draggable
      currentX = e.gesture.deltaX
      currentY = e.gesture.deltaY
      if draggable
        cardExit('right', currentX, currentY, 'lkl') if currentX > 200
        cardExit('left', currentX, currentY, 'lkl') if currentX < -200

      MovementService.spring(currentX, currentY, elem)
    $ionicGesture.on "release", releaseFn, elem


    afterExit = (elem) ->

    cardExit = (direction, currentX, currentY, b) ->
      console.log(b)
      MovementService.exit(direction, currentX, currentY, elem, afterExit)
      scope.$emit('card:exit')

    advance = ->
      console.log('advancing')
    scope.$on('advance', advance)
