/*
  Handles the javascript global for Social Reader. 
*/
define(function (require) {


  var Global = Backbone.Model.extend({

    initialize: function() {
      this.set(window.SocialReaderData);
      delete window.SocialReaderData;
    }

  });

  window.SocialReader = new Global();
  return window.SocialReader;
  
});