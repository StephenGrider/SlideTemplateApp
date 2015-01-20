angular.module('starter.controllers', [])

.controller('AppCtrl', ($scope, $ionicModal, $timeout) => {
  $scope.loginData = {};
  
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.closeLogin = () => {
    $scope.modal.hide();
  };
  
  $scope.login = () => {
    $scope.modal.show();
  };
  
  $scope.doLogin = () => {
    $scope.closeLogin();
  };
})

.controller('PlaylistsCtrl', ($scope) => {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', ($scope, $stateParams) => {
  
});
