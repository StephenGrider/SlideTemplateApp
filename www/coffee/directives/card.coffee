angular.module("starter.directives")
.directive 'card', ($ionicGesture, MovementService) ->

  restrict: 'E'
  templateUrl: '/templates/directives/card.html'
  link: (scope, elem, attrs) ->
    currentX = currentY = 0

    dragFn = (e) ->
      MovementService.stop()
      MovementService.drag(e.gesture.deltaX, e.gesture.deltaY, elem[0].childNodes[0])
    $ionicGesture.on('drag', dragFn, elem);

    releaseFn = (e) ->
      currentX = e.gesture.deltaX
      currentY = e.gesture.deltaY
      # exitScene("right") if e.gesture.deltaX > 200
      # exitScene("left") if e.gesture.deltaX < -200
      MovementService.spring(currentX, currentY, elem[0].childNodes[0])
    $ionicGesture.on "release", releaseFn, elem
