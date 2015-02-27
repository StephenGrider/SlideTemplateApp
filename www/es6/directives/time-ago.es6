angular.module("app.directives")

.directive('timeago', () => {
  return {
    restrict: 'E',
    template: '{{duration}} ago',
    link: ($scope, $element, $attr) => {
      var time = ((new Date()).getTime() - new Date($attr.time).getTime()) / 1000

      if (time < 60) {
        $scope.duration = `${time} seconds ago`
      }
      else if (time < 600) {
        $scope.duration = `${~~time/60} minutes ago`
      }
      else if (time < 86400) {
        $scope.duration = `${~~time/60/60} hours ago`
      }
      else {
        $scope.duration = `${~~time/60/60/24} days ago`
      }
    }
  }
});
