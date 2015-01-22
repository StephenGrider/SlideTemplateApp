(function(ionic) {
  
  // Get transform origin poly
  var d = document.createElement('div');
  var transformKeys = ['webkitTransformOrigin', 'transform-origin', '-webkit-transform-origin', 'webkit-transform-origin',
  '-moz-transform-origin', 'moz-transform-origin', 'MozTransformOrigin', 'mozTransformOrigin'];
  
  var TRANSFORM_ORIGIN = 'webkitTransformOrigin';
  for(var i = 0; i < transformKeys.length; i++) {
    if(d.style[transformKeys[i]] !== undefined) {
      TRANSFORM_ORIGIN = transformKeys[i];
      break;
    }
  }
  
  var transitionKeys = ['webkitTransition', 'transition', '-webkit-transition', 'webkit-transition',
  '-moz-transition', 'moz-transition', 'MozTransition', 'mozTransition'];
  var TRANSITION = 'webkitTransition';
  for(var i = 0; i < transitionKeys.length; i++) {
    if(d.style[transitionKeys[i]] !== undefined) {
      TRANSITION = transitionKeys[i];
      break;
    }
  }
  
  var SwipeableCardController = ionic.views.View.inherit({
    initialize: function(opts) {
      this.cards = [];
      
      var ratio = window.innerWidth / window.innerHeight;
      
      this.maxWidth = window.innerWidth - (opts.cardGutterWidth || 0);
      this.maxHeight = opts.height || 300;
      this.cardGutterWidth = opts.cardGutterWidth || 10;
      this.cardPopInDuration = opts.cardPopInDuration || 400;
      this.cardAnimation = opts.cardAnimation || 'pop-in';
    },
    /**
    * Push a new card onto the stack.
    */
    pushCard: function(card) {
      var self = this;
      
      this.cards.push(card);
      this.beforeCardShow(card);
      
      card.transitionIn(this.cardAnimation);
      setTimeout(function() {
        card.disableTransition(self.cardAnimation);
      }, this.cardPopInDuration + 100);
    },
    /**
    * Set up a new card before it shows.
    */
    beforeCardShow: function() {
      var nextCard = this.cards[this.cards.length-1];
      if(!nextCard) return;
      
      // Calculate the top left of a default card, as a translated pos
      var topLeft = window.innerHeight / 2 - this.maxHeight/2;
      
      var cardOffset = Math.min(this.cards.length, 3) * 5;
      
      // Move each card 5 pixels down to give a nice stacking effect (max of 3 stacked)
      nextCard.setPopInDuration(this.cardPopInDuration);
      nextCard.setZIndex(this.cards.length);
    },
    /**
    * Pop a card from the stack
    */
    popCard: function(animate) {
      var card = this.cards.pop();
      if(animate) {
        card.swipe();
      }
      return card;
    }
  });
  
  var SwipeableCardView = ionic.views.View.inherit({
    initialize: function(opts) {
      opts = ionic.extend({
      }, opts);
      
      ionic.extend(this, opts);
      
      this.el = opts.el;
      
      this.startX = this.startY = this.x = this.y = 0;
      
      this.bindEvents();
    },
    
    setZIndex: function(index) {
      this.el.style.zIndex = index;
    },
    
    setWidth: function(width) {
      this.el.style.width = width + 'px';
    },
    
    setHeight: function(height) {
      this.el.style.height = height + 'px';
    },
    
    setPopInDuration: function(duration) {
      this.cardPopInDuration = duration;
    },
    
    transitionIn: function(animationClass) {
      var self = this;
      
      this.el.classList.add(animationClass + '-start');
      this.el.classList.add(animationClass);
      this.el.style.display = 'block';
      setTimeout(function() {
        self.el.classList.remove(animationClass + '-start');
      }, 100);
    },
    
    /**
    * Disable transitions on the card (for when dragging)
    */
    disableTransition: function(animationClass) {
      this.el.classList.remove(animationClass);
    },
    
    swipe: function() {
      this.transitionOut();
    },
    
    bindEvents: function() {
      var self = this;
      ionic.onGesture('dragstart', function(e) {
        var cx = window.innerWidth / 2;
        if(e.gesture.touches[0].pageX < cx) {
          self._transformOriginRight();
        } else {
          self._transformOriginLeft();
        }
        ionic.requestAnimationFrame(function() { self._doDragStart(e) });
      }, this.el);
      
      ionic.onGesture('drag', function(e) {
        ionic.requestAnimationFrame(function() { self._doDrag(e) });
      }, this.el);
      
      ionic.onGesture('dragend', function(e) {
        ionic.requestAnimationFrame(function() { self._doDragEnd(e) });
      }, this.el);
    },
    
    // Rotate anchored to the left of the screen
    _transformOriginLeft: function() {
      // this.el.style[TRANSFORM_ORIGIN] = 'top center';
      // this.rotationDirection = -1;
    },
    
    _transformOriginRight: function() {
      // this.el.style[TRANSFORM_ORIGIN] = 'right center';
      // this.rotationDirection = -1;
    },
    
    _doDragStart: function(e) {
      var width = this.el.offsetWidth;
      var point = window.innerWidth / 2 + this.rotationDirection * (width / 2)
      var distance = Math.abs(point - e.gesture.touches[0].pageX);// - window.innerWidth/2);
      
      this.touchDistance = distance * 10;
      
    },
    
    _doDrag: function(e) {
      var o = e.gesture.deltaX;
      
      this.dragging = true;
      this.rotationAngle = o / 8;
      this.x = this.startX + (e.gesture.deltaX * 0.8);
      
      this._applyPosition()
    },
    
    _increment: function(val) {
      return val * 1.03
    },
    
    _decrement: function(val) {
      if(val < 1 && val > -1) {
        return 0;
      } else {
        return val * .60;
      }
    },
    
    _springBack: function(e) {
      if(this.dragging) {
        return;
      }
      
      this.x = this._decrement(this.x)
      this.y = this._decrement(this.y)
      this.rotationAngle = this._decrement(this.rotationAngle)
      
      this._applyPosition()
      ionic.requestAnimationFrame(function() { this._springBack(e) }.bind(this));
    },
    
    _applyPosition: function() {
      this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + 'px, ' + this.y  + 'px, 0) rotate3d(0,0,1,' + (this.rotationAngle || 0) + 'deg)';
    },
    
    _doDragEnd: function(e) {
      this.dragging = false
      if(e.gesture.deltaX > window.innerWidth * .4) {
        this.transitionOut(e);
        setTimeout(this.onDestroy.bind(this), 600)
        this.onSwipe()
      } else {
        ionic.requestAnimationFrame(function() { this._springBack(e) }.bind(this));
      }
    },
    
    transitionOut: function() {
      this.x = this._increment(this.x)
      this.y = this._increment(this.y)
      this.rotationAngle = this._increment(this.rotationAngle)      
      this._applyPosition()
      
      ionic.requestAnimationFrame(this.transitionOut.bind(this));
    }
  });
  
  angular.module('ionic.contrib.ui.cards', ['ionic'])
  
  .directive('swipeCard', ['$timeout', function($timeout) {
    return {
      restrict: 'E',
      template: '<div class="swipe-card" ng-transclude></div>',
      require: '^swipeCards',
      transclude: true,
      scope: {
        onCardSwipe: '&',
        onDestroy: '&'
      },
      link: function($scope, $element, $attr, swipeCards) {
        var el = $element[0];
        
        var swipeableCard = new SwipeableCardView({
          el: el,
          onSwipe: function() {
            $timeout(function() {
              $scope.onCardSwipe();
            });
          },
          onDestroy: function() {
            $timeout(function() {
              $scope.onDestroy();
            });
          },
        });
        $scope.$parent.swipeCard = swipeableCard;
        
        swipeCards.swipeController.pushCard(swipeableCard);
        
      }
    }
  }])
  
  .directive('swipeCards', ['$rootScope', function($rootScope) {
    return {
      restrict: 'E',
      template: '<div class="swipe-cards" ng-transclude></div>',
      transclude: true,
      scope: true,
      controller: function($scope, $element) {
        var swipeController = new SwipeableCardController({
        });
        
        $rootScope.$on('swipeCard.pop', function(isAnimated) {
          swipeController.popCard(isAnimated);
        });
        
        this.swipeController = swipeController;
        
        //return swipeController;
      }
    }
  }])
  
  .factory('$ionicSwipeCardDelegate', ['$rootScope', function($rootScope) {
    return {
      popCard: function($scope, isAnimated) {
        $rootScope.$emit('swipeCard.pop', isAnimated);
      },
      getSwipeableCard: function($scope) {
        return $scope.$parent.swipeCard;
      }
    }
  }]);
  
})(window.ionic);
