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

      this.items.first().set('active', true);
    }
  });

  //= model begin
  Frontend.Carousel = Backbone.Model.extend({
    defaults: {
      label: '',
      url: '',
      active: false,
      num: 0
    },
  });

  Frontend.CarouselCollection = Backbone.Collection.extend({
    model: Frontend.Carousel,

    setAllNum: function() {
      this.each(function(model, i) {
        model.set('num', i + 1);
      });
    }
  });
  //= model end

  //= item view begin
  Frontend.CarouselCollectionView = Backbone.View.extend({
    initialize: function(options) {
      this.options = options;
      this.setElement(document.querySelector('[data-role="carousel-items"]'));
      var self = this;

      this.collection.setAllNum();
      this.collection.each(function(model, i) {
        var itemView = new Frontend.CarouselItemView({ model: model });
        self.$el.append(itemView.render().$el);
      });
    }
  });

  Frontend.CarouselItemView = Backbone.View.extend({
    template: function() {
      return _.template($('#carousel-item-template').html());
    },

    initialize: function(options) {
      this.options = options;
      var self = this;

      this.listenTo(this.model, 'change', function() {
        if (self.model.get('active')) {
          self.toActive();
        } else {
          self.toInactive();
        }
      });
    },

    render: function() {
      this.$el = $(this.template()(this.model.toJSON()));
      return this;
    },

    toActive: function() {
      this.$el.addClass('active');
    },

    toInactive: function() {
      this.$el.removeClass('active');
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
