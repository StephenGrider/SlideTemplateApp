angular.module('app.services')

.factory('LineItems', (Restangular) => {
  Restangular.setBaseUrl('http://localhost:3000/');
  var lineItems = Restangular.service('api/v1/line_items');
  
  return {
    like: (item) => {
      lineItems.post({
        item_id: item.id,
        liked: true
      });
    },
    dislike: (item) => {
      lineItems.post({
        item_id: item.id,
        liked: false
      });
    },
    getLiked: () => {
      return lineItems.getList()
    }
  }
})
