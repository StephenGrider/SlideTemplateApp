angular.module("app.directives")

.directive('noScroll', ($document) => {
  
  return {
    restrict: 'A',
    link: ($scope, $element, $attr) => {
      
      $document.on('touchmove', (e) => {
        e.preventDefault();
      });
    }
  }
});