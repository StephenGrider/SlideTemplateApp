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
