angular.module('app.controllers')

.controller('DashCtrl', ($scope) => {} )

.controller('LikedCtrl', ($scope, Items) => {
  $scope.items = [];
  
  $scope.$on("$ionicView.enter", (event) => {
    Items.index({liked: true}).then((items) => {
      $scope.items = items;
    });
  });
  
  $scope.remove = (chat) => {
    Items.remove(chat);
  }
})

.controller('ChatDetailCtrl', ($scope, $stateParams, Chats) => {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', ($scope, Friends) => {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', ($scope, $stateParams, Friends) => {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', ($scope) => {
  $scope.settings = {
    enableFriends: true
  };
});
