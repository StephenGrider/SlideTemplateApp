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

angular.module("starter.controllers", []).controller("DashCtrl", function($scope) {}).controller("FriendsCtrl", function($scope, Friends) {
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

angular.module("starter.controllers", []).controller("DashCtrl", function($scope) {
  var cardReserve, newCard;
  cardReserve = [];
  $scope.cards = [
    {
      val: 1
    }, {
      val: 2
    }, {
      val: 3
    }, {
      val: 4
    }, {
      val: 5
    }
  ];
  newCard = function() {
    var card, index, _i, _len;
    cardReserve.push($scope.cards.shift());
    if ($scope.cards.length === 2) {
      for (index = _i = 0, _len = cardReserve.length; _i < _len; index = ++_i) {
        card = cardReserve[index];
        $scope.cards.push(cardReserve[index]);
      }
      return cardReserve = [];
    }
  };
  return $scope.$on('card:exit', function() {
    return $scope.$apply(newCard);
  });
}).controller("FriendsCtrl", function($scope, Friends) {
  return $scope.friends = Friends.all();
}).controller("FriendDetailCtrl", function($scope, $stateParams, Friends) {
  return $scope.friend = Friends.get($stateParams.friendId);
}).controller("AccountCtrl", function($scope) {});

angular.module("starter.directives", []);

angular.module("starter.directives").directive('card', function($ionicGesture, MovementService) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/directives/card.html',
    link: function(scope, elem, attrs) {
      var advance, afterExit, cardExit, dragFn, draggable, releaseFn;
      MovementService.reset(elem);
      draggable = true;
      dragFn = function(e) {
        MovementService.stop();
        return MovementService.drag(e.gesture.deltaX, e.gesture.deltaY, elem);
      };
      $ionicGesture.on('drag', dragFn, elem);
      releaseFn = function(e) {
        var currentX, currentY;
        currentX = e.gesture.deltaX;
        currentY = e.gesture.deltaY;
        if (draggable) {
          if (currentX > 200) {
            cardExit('right', currentX, currentY, 'lkl');
          }
          if (currentX < -200) {
            cardExit('left', currentX, currentY, 'lkl');
          }
        }
        return MovementService.spring(currentX, currentY, elem);
      };
      $ionicGesture.on("release", releaseFn, elem);
      afterExit = function(elem) {};
      cardExit = function(direction, currentX, currentY, b) {
        console.log(b);
        MovementService.exit(direction, currentX, currentY, elem, afterExit);
        return scope.$emit('card:exit');
      };
      advance = function() {
        return console.log('advancing');
      };
      return scope.$on('advance', advance);
    }
  };
});

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
    reset: function(elem) {
      return elem.css(ionic.CSS.TRANSFORM, "translate3d(0px, 0px, 0px");
    },
    exit: function(direction, startingX, startingY, elem, cb) {
      return setTimeout((function(_this) {
        return function() {
          if (direction === "right") {
            startingX += 10;
          } else {
            startingX -= 10;
          }
          elem.css(ionic.CSS.TRANSFORM, "translate3d(" + startingX + "px," + startingY + "px, 0px) rotate3d(0,0,1," + startingX / 6 + "deg)");
          if (!(startingX < -800 || startingX > 800)) {
            return _this.exit.call(_this, direction, startingX, startingY, elem, cb);
          } else {
            return _this.reset(elem);
          }
        };
      })(this), 13);
    },
    drag: function(x, y, node) {
      return node.css(ionic.CSS.TRANSFORM, "translate3d(" + x + "px," + y + "px, -100px) rotate3d(0,0,1," + x / 4 + "deg)");
    },
    spring: function(startingX, startingY, elem) {
      currentX = startingX;
      currentY = startingY;
      return intervalId = setInterval(function() {
        if (currentX < .1 && currentX > -.1 && currentY < .1 && currentY > -.1) {
          clearInterval(intervalId);
        }
        currentX *= dampeningCoefficient;
        currentY *= dampeningCoefficient;
        return elem.css(ionic.CSS.TRANSFORM, "translate3d(" + currentX + "px," + currentY + "px, 0px) rotate3d(0,0,1," + currentX / 6 + "deg)");
      }, 13);
    },
    stop: function() {
      return clearInterval(intervalId);
    }
  };
});
