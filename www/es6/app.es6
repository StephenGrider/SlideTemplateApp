angular.module("app.controllers", [])
angular.module("app.directives", [])
angular.module('app.services', [])

angular.module('app', [
  'ionic', 
  'app.services', 
  'app.controllers', 
  'app.directives', 
  'ionic.contrib.ui.cards',
  'restangular'
])


.run(($ionicPlatform) => {
  $ionicPlatform.ready( () => {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(($ionicConfigProvider) => {
  $ionicConfigProvider.views.maxCache(5);
})

.config((RestangularProvider) => {
  var guid = JSON.parse(localStorage.getItem("_amzn:guid"));;
  if(!guid) {
    guid = Guid.raw();
    localStorage.setItem("_amzn:guid", JSON.stringify(guid));
  }
  RestangularProvider.setDefaultHeaders({GUID_TOKEN: guid});
})

.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  
  .state('tab', { 
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })
  
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  
  .state('tab.liked', {
    url: '/liked',
    views: {
      'tab-liked': {
        templateUrl: 'templates/tab-liked.html',
        controller: 'LikedCtrl'
      }
    }
  })
  .state('tab.chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })
  
  .state('tab.friends', {
    url: '/friends',
    views: {
      'tab-friends': {
        templateUrl: 'templates/tab-friends.html',
        controller: 'FriendsCtrl'
      }
    }
  })
  
  .state('tab.friend-detail', {
    url: '/friend/:friendId',
    views: {
      'tab-friends': {
        templateUrl: 'templates/friend-detail.html',
        controller: 'FriendDetailCtrl'
      }
    }
  })

  .state('tab.browse', {
    url: "/browse",
    views: {
      'tab-browse': {
        templateUrl: "templates/browse.html",
        controller: 'BrowseCtrl'
      }
    }
  })
  
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });
  
  $urlRouterProvider.otherwise('/tab/dash');
});
