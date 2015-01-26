angular.module('app.services')

.factory('Items', (Restangular) => {
  Restangular.setBaseUrl('http://localhost:3000/');
  var itemStore = [];
  
  var options = { 
    unrated: true 
  };
  
  var req = Restangular.all('api/v1/items')
  
  var promise = req.getList(options).then( (items) => {
    itemStore = itemStore.concat(items);
  });
  
  return {
    index: () => {
      return req.getList();
    },
    getItem: (deck) => {
      if(!itemStore.length) {
        promise.then(() => {
          deck.push(itemStore.pop());
        });
      } else {
        return deck.push(itemStore.pop());
      }
    }
  };
})