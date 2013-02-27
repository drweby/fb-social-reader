define(function (require) {

  var $         = require('jquery');
  var User      = require('app/models/user');
  var Analytics = require('app/models/analytics');
  var Sidebar   = require('app/controllers/sidebar');
  var Lightbox  = require('app/controllers/lightbox');
  var Single    = require('app/controllers/single');

  // replace $() with jquery() - all local
  $(document).ready(function() {
    User.init(function() {
      Sidebar.load();
    }, function() {
      Lightbox.load();
      Single.load();
      Analytics.init();
    });
  });

});
