angular.module("starter", ["ionic", "starter.controllers", "starter.services", "starter.directives", "angular-carousel"]).run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state("tab", {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  }).state("tab.dash", {
    url: "/dash",
    views: {
      "tab-dash": {
        templateUrl: "templates/tab-dash.html",
        controller: "DashCtrl"
      }
    }
  }).state("tab.friends", {
    url: "/friends",
    views: {
      "tab-friends": {
        templateUrl: "templates/tab-friends.html",
        controller: "FriendsCtrl"
      }
    }
  }).state("tab.friend-detail", {
    url: "/friend/:friendId",
    views: {
      "tab-friends": {
        templateUrl: "templates/friend-detail.html",
        controller: "FriendDetailCtrl"
      }
    }
  }).state("tab.account", {
    url: "/account",
    views: {
      "tab-account": {
        templateUrl: "templates/tab-account.html",
        controller: "AccountCtrl"
      }
    }
  });
  return $urlRouterProvider.otherwise("/tab/dash");
});

angular.module("starter.directives", []);

angular.module("starter.directives").directive('card', function($ionicGesture, MovementService) {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/card.html',
    scope: {
      index: '=index'
    },
    link: function(scope, elem, attrs) {
      var advance, afterExit, cardExit, dragFn, draggable, releaseFn;
      draggable = true;
      dragFn = function(e) {
        console.log('drag');
        if (draggable) {
          MovementService.stop();
          MovementService.drag(e.gesture.deltaX, e.gesture.deltaY, elem[0].childNodes[0]);
          if (e.gesture.deltaX > 200) {
            cardExit('right', e.gesture.deltaX, e.gesture.deltaY);
          }
          if (e.gesture.deltaX < -200) {
            return cardExit('left', e.gesture.deltaX, e.gesture.deltaY);
          }
        }
      };
      $ionicGesture.on('drag', dragFn, elem);
      releaseFn = function(e) {
        var currentX, currentY;
        currentX = e.gesture.deltaX;
        currentY = e.gesture.deltaY;
        if (draggable) {
          if (currentX > 200) {
            cardExit('right', currentX, currentY);
          }
          if (currentX < -200) {
            cardExit('left', currentX, currentY);
          }
        }
        return MovementService.spring(currentX, currentY, elem[0].childNodes[0]);
      };
      $ionicGesture.on("release", releaseFn, elem);
      afterExit = function() {};
      cardExit = function(direction, currentX, currentY) {
        draggable = false;
        MovementService.exit(direction, currentX, currentY, elem[0].childNodes[0], afterExit);
        return scope.$emit('card:exit');
      };
      advance = function() {
        return console.log('advancing');
      };
      return scope.$on('advance', advance);
    }
  };
});

angular.module("starter.controllers", []).controller("DashCtrl", function($scope) {
  return $scope.$on('card:exit', function() {
    return $scope.$emit('advance');
  });
}).controller("FriendsCtrl", function($scope, Friends) {
  return $scope.friends = Friends.all();
}).controller("FriendDetailCtrl", function($scope, $stateParams, Friends) {
  return $scope.friend = Friends.get($stateParams.friendId);
}).controller("AccountCtrl", function($scope) {});

angular.module("starter.services", []).factory("Friends", function() {
  var friends;
  friends = [
    {
      id: 0,
      name: "Scruff McGruff"
    }, {
      id: 1,
      name: "G.I. Joe"
    }, {
      id: 2,
      name: "Miss Frizzle"
    }, {
      id: 3,
      name: "Ash Ketchum"
    }
  ];
  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      return friends[friendId];
    }
  };
});

angular.module("starter.services").factory("MovementService", function() {
  var currentX, currentY, dampeningCoefficient, intervalId;
  intervalId = null;
  dampeningCoefficient = .75;
  currentX = 0;
  currentY = 0;
  return {
    exit: function(direction, startingX, startingY, elementToMove, cb) {
      console.log('a');
      return setTimeout((function(_this) {
        return function() {
          if (startingX < -800 || startingX > 800) {
            console.log('a');
            stopExit();
            if (cb) {
              cb();
            }
          }
          if (direction === "right") {
            startingX += 10;
          } else {
            startingX -= 10;
          }
          elementToMove.style[ionic.CSS.TRANSFORM] = "translate3d(" + startingX + "px," + startingY + "px, 0px) rotate3d(0,0,1," + startingX / 6 + "deg)";
          if (!(startingX < -800 || startingX > 800)) {
            return _this.exit.call(_this, direction, startingX, startingY, elementToMove, cb);
          }
        };
      })(this), 13);
    },
    drag: function(x, y, node) {
      return node.style[ionic.CSS.TRANSFORM] = "translate3d(" + x + "px," + y + "px, -100px) rotate3d(0,0,1," + x / 4 + "deg)";
    },
    spring: function(startingX, startingY, element) {
      currentX = startingX;
      currentY = startingY;
      return intervalId = setInterval(function() {
        if (currentX < .1 && currentX > -.1 && currentY < .1 && currentY > -.1) {
          clearInterval(intervalId);
        }
        currentX *= dampeningCoefficient;
        currentY *= dampeningCoefficient;
        return element.style[ionic.CSS.TRANSFORM] = "translate3d(" + currentX + "px," + currentY + "px, 0px) rotate3d(0,0,1," + currentX / 6 + "deg)";
      }, 13);
    },
    stop: function() {
      return clearInterval(intervalId);
    }
  };
});
