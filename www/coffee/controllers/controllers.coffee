angular.module("starter.controllers", [])

.controller("DashCtrl", ($scope) ->
  cardReserve = [];
  $scope.cards = [(val: 1), (val: 2), (val: 3), (val: 4)]

  newCard = ->
    cardReserve.push($scope.cards.shift())

    if $scope.cards.length == 2
      for card, index in cardReserve
        $scope.cards.push(cardReserve[index])
      cardReserve = [];
      console.log('finish', $scope.cards)

  $scope.$on('card:exit', ->
    $scope.$apply(newCard))

)

.controller("FriendsCtrl", ($scope, Friends) ->
  $scope.friends = Friends.all()
)

.controller("FriendDetailCtrl", ($scope, $stateParams, Friends) ->
  $scope.friend = Friends.get($stateParams.friendId)
)

.controller("AccountCtrl", ($scope) ->

)
