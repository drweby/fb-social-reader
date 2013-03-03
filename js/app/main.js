define(function (require) {

  var $         = require('jquery'),

      User      = require('./core/user'),
      Widgets   = require('./core/widgets/init');

  // replace $() with jquery() - all local
  $(document).ready(function() {
    var user = new User();
    user.start(function() {
      Widgets(['sidebar', 'lightbox', 'single']);
    });
  });

});
