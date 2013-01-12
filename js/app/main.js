define(function (require) {

	var Tests = require('app/tests/main');
	var User = require('app/models/user');
	var Analytics = require('app/models/analytics');
	var Sidebar = require('app/controllers/sidebar');
	var Lightbox = require('app/controllers/lightbox');
	var Single = require('app/controllers/single');

	window.$ = window.jQuery;

	// jQuery should be in as a WP dependency already
	window.$(document).ready(function() {
		if (Tests.are_on()) {
			Tests.start();
		} else {
			User.init(function() {
				Sidebar.load();
			}, function() {
				Lightbox.load();
				Single.load();
				Analytics.init();
			});
		}
	});
});