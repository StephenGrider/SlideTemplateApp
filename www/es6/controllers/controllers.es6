angular.module('app.controllers')

.controller('DashCtrl', ($scope) => {} )

.controller('ChatsCtrl', ($scope, Chats) => {
  $scope.chats = Chats.all();
  $scope.remove = (chat) => {
    Chats.remove(chat);
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
