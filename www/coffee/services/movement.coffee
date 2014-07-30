angular.module("starter.services")
.factory "MovementService", ->
  intervalId = null
  dampeningCoefficient = .75
  currentX = 0
  currentY = 0

  reset: (elem) ->
    elem.css(ionic.CSS.TRANSFORM, "translate3d(0px, 0px, 0px")

  exit: (direction, startingX, startingY, elem, cb) ->
    setTimeout( =>
      # if startingX < -800 or startingX > 800
      #   cb() if cb

      if direction is "right" then startingX += 10 else startingX -= 10
      elem.css(ionic.CSS.TRANSFORM, "translate3d(" + (startingX) + "px," + (startingY) + "px, 0px) rotate3d(0,0,1," + startingX / 6 + "deg)")
      unless startingX < -800 or startingX > 800
        @exit.call(@, direction, startingX, startingY, elem, cb)
      else
        @reset(elem)

    , 13)


  drag: (x, y, node) ->
    node.css(ionic.CSS.TRANSFORM, "translate3d(" + (x) + "px," + (y) + "px, -100px) rotate3d(0,0,1," + x / 4 + "deg)")

  spring: (startingX, startingY, elem) ->
    currentX = startingX
    currentY = startingY
    intervalId = setInterval(->
      clearInterval intervalId  if currentX < .1 and currentX > -.1 and currentY < .1 and currentY > -.1
      currentX *= dampeningCoefficient
      currentY *= dampeningCoefficient
      elem.css(ionic.CSS.TRANSFORM, "translate3d(" + (currentX) + "px," + (currentY) + "px, 0px) rotate3d(0,0,1," + currentX / 6 + "deg)")

    , 13)

  stop: ->
    clearInterval(intervalId)
