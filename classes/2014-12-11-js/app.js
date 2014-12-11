(function() {

  // Application namespace
  window.Frontend = {};

  // Bootstrap function
  Frontend.initialize = function() {
    new Frontend.CarouselView();
  };

  Frontend.CarouselView = Backbone.View.extend({
    initialize: function() {
      this.setElement(document.querySelector('[data-role="carousel"]'));

      this.items = new Frontend.CarouselCollection(this.$el.data('items'));
      this.itemsView = new Frontend.CarouselCollectionView({ collection: this.items });
      this.bulletsView = new Frontend.CarouselBulletCollectionView({ collection: this.items });
    }
  });

  //= model begin
  Frontend.Carousel = Backbone.Model.extend({
    defaults: {
      label: '',
      url: '',
      active: false
    }
  });

  Frontend.CarouselCollection = Backbone.Collection.extend({
    model: Frontend.Carousel
  });
  //= model end

  //= item view begin
  Frontend.CarouselCollectionView = Backbone.View.extend({
    initialize: function(options) {
      this.options = options;
    }
  });

  Frontend.CarouselItemView = Backbone.View.extend({
    initialize: function(options) {
      this.options = options;
    }
  });
  //= item view end

  //= control view
  Frontend.CarouselControl = Backbone.View.extend({
    initialize: function(options) {
      this.options = options;
    }
  });

  //= bullet view begin
  Frontend.CarouselBulletCollectionView = Backbone.View.extend({
    initialize: function(options) {
      this.options = options;
    }
  });

  Frontend.CarouselBulletView = Backbone.View.extend({
    initialize: function(options) {
      this.options = options;
    }
  });
  //= bullet view end

  // DOM Ready
  jQuery(function($) {
    Frontend.initialize();
  });
}).call(this)
