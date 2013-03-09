define(function (require) {

  var $         = require('jquery'),

      User      = require('./core/user'),
      Widgets   = require('./core/widgets/init');

  // replace $() with jquery() - all local
  $(document).ready(function() {
    User.start(function(logged_in) {
      if (logged_in) {
        Widgets(['sidebar', 'lightbox', 'single']);
        User.queue_read();
      } else {
        Widgets(['sidebar']);
      }
    });
  });

});
