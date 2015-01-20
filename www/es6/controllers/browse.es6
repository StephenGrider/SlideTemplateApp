angular.module("app.controllers")

.controller("BrowseCtrl", ($scope, $ionicSwipeCardDelegate) => {
  var cardTypes = [{
    title: 'Swipe down to clear the card',
    image: 'img/ionic.png'
  }, {
    title: 'Where is this?',
    image: 'img/ionic.png'
  }, {
    title: 'What kind of grass is this?',
    image: 'img/ionic.png'
  }, {
    title: 'What beach is this?',
    image: 'img/ionic.png'
  }, {
    title: 'What kind of clouds are these?',
    image: 'img/ionic.png'
  }];
  
  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
  
  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };
  
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };
  
  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
})