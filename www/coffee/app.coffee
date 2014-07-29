angular.module("starter", [
    "ionic"
    "starter.controllers"
    "starter.services"
    "starter.directives"
    "angular-carousel"
  ])
  .run(($ionicPlatform) ->
    $ionicPlatform.ready ->
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar true  if window.cordova and window.cordova.plugins.Keyboard
      StatusBar.styleDefault()  if window.StatusBar
  )
  .config ($stateProvider, $urlRouterProvider) ->
    $stateProvider.state("tab",
      url: "/tab"
      abstract: true
      templateUrl: "templates/tabs.html"
    ).state("tab.dash",
      url: "/dash"
      views:
        "tab-dash":
          templateUrl: "templates/tab-dash.html"
          controller: "DashCtrl"
    ).state("tab.friends",
      url: "/friends"
      views:
        "tab-friends":
          templateUrl: "templates/tab-friends.html"
          controller: "FriendsCtrl"
    ).state("tab.friend-detail",
      url: "/friend/:friendId"
      views:
        "tab-friends":
          templateUrl: "templates/friend-detail.html"
          controller: "FriendDetailCtrl"
    ).state "tab.account",
      url: "/account"
      views:
        "tab-account":
          templateUrl: "templates/tab-account.html"
          controller: "AccountCtrl"

    $urlRouterProvider.otherwise "/tab/dash"

  # if none of the above states are matched, use this as the fallback
