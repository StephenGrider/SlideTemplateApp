angular.module("starter.controllers", [])

.controller("DashCtrl", ($scope) ->
  $scope.$on('card:exit', -> console.log('hey'))
)

.controller("FriendsCtrl", ($scope, Friends) ->
  $scope.friends = Friends.all()
)

.controller("FriendDetailCtrl", ($scope, $stateParams, Friends) ->
  $scope.friend = Friends.get($stateParams.friendId)
)

.controller("AccountCtrl", ($scope) ->

)
