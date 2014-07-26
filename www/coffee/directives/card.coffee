angular.module("starter.directives")
.directive 'card', ($ionicGesture, MovementService) ->

  restrict: 'E'
  templateUrl: '/templates/directives/card.html'
  scope: '{}'
  link: (scope, elem, attrs, controller) ->
    currentX = currentY = 0
    scope.cardId = 123
    dragFn = (e) ->
      MovementService.stop()
      MovementService.drag(e.gesture.deltaX, e.gesture.deltaY, elem[0].childNodes[0])
    $ionicGesture.on('drag', dragFn, elem);

    releaseFn = (e) ->
      currentX = e.gesture.deltaX
      currentY = e.gesture.deltaY
      scope.$emit('card:exit') if e.gesture.deltaX > 200
      scope.$emit('card:exit') if e.gesture.deltaX < -200

      MovementService.spring(currentX, currentY, elem[0].childNodes[0])
    $ionicGesture.on "release", releaseFn, elem
