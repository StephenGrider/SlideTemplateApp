angular.module("starter.services")
.factory "MovementService", ->
  intervalId = null
  dampeningCoefficient = .75
  currentX = 0
  currentY = 0

  exit: (direction, startingX, startingY, elementToMove, callback) ->
    intervalId = setInterval(->
      if startingX < -500 or startingX > 500
        clearInterval intervalId
        callback()
      if direction is "right" then startingX += 10 else startingX -= 10

      elementToMove.style[ionic.CSS.TRANSFORM] = "translate3d(" + (startingX) + "px," + (startingY) + "px, 0px) rotate3d(0,0,1," + startingX / 6 + "deg)"

    , 13)

  drag: (x, y, node) ->
    node.style[ionic.CSS.TRANSFORM] = "translate3d(" + (x) + "px," + (y) + "px, -100px) rotate3d(0,0,1," + x / 4 + "deg)"

  spring: (startingX, startingY, element) ->
    currentX = startingX
    currentY = startingY
    intervalId = setInterval(->
      clearInterval intervalId  if currentX < .1 and currentX > -.1 and currentY < .1 and currentY > -.1
      currentX *= dampeningCoefficient
      currentY *= dampeningCoefficient
      element.style[ionic.CSS.TRANSFORM] = "translate3d(" + (currentX) + "px," + (currentY) + "px, 0px) rotate3d(0,0,1," + currentX / 6 + "deg)"

    , 13)

  stop: ->
    clearInterval intervalId
