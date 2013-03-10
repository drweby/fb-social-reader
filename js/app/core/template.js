define(["jquery",
        "underscore",
        "backbone"],
        function($, _, Backbone) {

  var Template = Backbone.View.extend({

    initialize: function() {
      if (!this.set_el()) return;
      var _this = this;
      this.get_html(function(html) {
        _this.render();
      });
    },

    set_el: function() {
      if (this.options.el) {
        this.el = this.options.el;
        delete this.options.el;
        return true;
      } else {
        return false;
      }
    },

    get_html: function(cb) {

      // If an absolute filepath is inputted, get that. Otherwise get within the /views/frontend folder.
      var template_url;
      if (/http|https/gi.test(this.options.file)) {
        template_url = this.options.file;
      } else {
        template_url = this.options.plugin_url+'/views/frontend/'+this.options.file;
      }

      var _this = this;
      $.ajax({
        url: template_url
      }).done(function(html) {
        _this.options.html = html;
        if (cb !== undefined) cb();
      });
    },

    render: function() {

      // Get the container
      var $container;
      if (this.options.iframe === true) {
        var parameters = this.options.iframe_css || {};
        var $iframe = $('<iframe />', parameters);
        this.$el.html($iframe);
        $container = $iframe.contents().find('html');
      } else {
        $container = this.$el;
      }

      // Put html with template
      var html = _.template(this.options.html, _.omit(this.options, ['html', 'plugin_url', 'file']));
      $container.html(html);

    }

  });

  return Template;

});