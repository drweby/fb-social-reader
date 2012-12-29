define([
	'require',
	'app/tests/main',
	'app/models/user',
	'app/models/analytics',
	'app/controllers/sidebar',
	'app/controllers/lightbox',
	'app/controllers/single'
	], function (
		require,
		Tests,
		User,
		Analytics,
		Sidebar,
		Lightbox,
		Single
	) {

	$ = window.jQuery;

	// jQuery should be in as a WP dependency already
	$(document).ready(function() {
		if (Tests.are_on()) {
			Tests.start();
		} else {
			User.init(function() {
				Sidebar.load(User.user, User.site);
			}, function() {
				Lightbox.load(User.user, User.site);
				Single.load(User.user, User.activity);
				Analytics.init(User.user, User.site);
			});
		}
	});
});