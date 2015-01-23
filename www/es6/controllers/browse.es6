angular.module("app.controllers")

.controller("BrowseCtrl", ($scope, $ionicSwipeCardDelegate, Items) => {
  $scope.cards = [];
  Items.getItem($scope.cards);
  
  $scope.cardSwiped = (index) => {
    $scope.addCard();
  };
  
  $scope.cardDestroyed = (index) => {
    $scope.cards.splice(index, 1);
  };
  
  $scope.addCard = () => {
    Items.getItem($scope.cards);
  };

})

.controller('CardCtrl', ($scope, $ionicSwipeCardDelegate) => {
  $scope.goAway = () => {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
})