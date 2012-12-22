define(['require', 'app/controllers/user', 'app/controllers/sidebar', 'app/controllers/lightbox'], function (require, User, Sidebar, Lightbox) {

	$ = window.jQuery;

	// jQuery should be in as a WP dependency already
	$(document).ready(function() {

	// Initialise the user and load stuff
	User.init(function() {
		Sidebar.load(SR.model.user, SR.model.site);
	}, function() {
		Lightbox.load();
		//window._sr.load_friends_read_single();
  });

});