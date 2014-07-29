angular.module("starter.directives")
.directive 'card', ($ionicGesture, MovementService) ->

  restrict: 'E'
  templateUrl: '/templates/directives/card.html'
  scope: {
      index: '=index'
    }
  link: (scope, elem, attrs) ->
    # draggable = true
    #
    # dragFn = (e) ->
    #   if draggable
    #     MovementService.stop()
    #     MovementService.drag(e.gesture.deltaX, e.gesture.deltaY, elem[0].childNodes[0])
    #     cardExit('right', e.gesture.deltaX, e.gesture.deltaY) if e.gesture.deltaX > 200
    #     cardExit('left', e.gesture.deltaX, e.gesture.deltaY) if e.gesture.deltaX < -200
    # $ionicGesture.on('drag', dragFn, elem);
    #
    # releaseFn = (e) ->
    #   currentX = e.gesture.deltaX
    #   currentY = e.gesture.deltaY
    #   if draggable
    #     cardExit('right', currentX, currentY) if currentX > 200
    #     cardExit('left', currentX, currentY) if currentX < -200
    #
    #   MovementService.spring(currentX, currentY, elem[0].childNodes[0])
    # $ionicGesture.on "release", releaseFn, elem
    #
    #
    # afterExit = ->
    #
    #
    #
    # cardExit = (direction, currentX, currentY) ->
    #   draggable = false
    #   MovementService.exit(direction, currentX, currentY, elem[0].childNodes[0], afterExit)
    #   scope.$emit('card:exit')
    #
    # advance = ->
    #   console.log('advancing')
    # scope.$on('advance', advance)
