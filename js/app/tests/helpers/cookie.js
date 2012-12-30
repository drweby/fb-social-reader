define([
	'require',
	'app/helpers/cookie'
	], function(
		require,
		Cookie
	) {
	
	var Test = {};

	Test.module = 'Cookie';

	Test.run = function() {

		module('Cookie');

		test( "set", function() {
			Cookie.set('sr_test_cookie1', 'my test str', null);
			ok(Cookie.exists('sr_test_cookie1'));
			Cookie.set('sr_test_cookie2', 'my test str', 30);
			ok(Cookie.exists('sr_test_cookie2'));
		});
	

		test('get', function() {
			Cookie.set('sr_test_cookie1', 'my test str', null);
			strictEqual(Cookie.get('sr_test_cookie1'), 'my test str');
			Cookie.set('sr_test_cookie2', 'my test str', 30);
			strictEqual(Cookie.get('sr_test_cookie2'), 'my test str');
			strictEqual(Cookie.get('sr_test_cookie10'), false);
		});
	

		test('remove', function() {
			Cookie.set('sr_test_cookie1', 'my test str', null);
			Cookie.remove('sr_test_cookie1');
			strictEqual(Cookie.get('sr_test_cookie1'), false);
			Cookie.set('sr_test_cookie2', 'my test str', 30);
			Cookie.remove('sr_test_cookie2');
			strictEqual(Cookie.get('sr_test_cookie2'), false);
		});
	

		test('exists', function() {
			Cookie.set('sr_test_cookie1', 'my test str', null);
			strictEqual(Cookie.exists('sr_test_cookie1'), true);
			Cookie.set('sr_test_cookie2', 6, 30);
			strictEqual(Cookie.exists('sr_test_cookie2'), true);
			Cookie.remove('sr_test_cookie3');
			strictEqual(Cookie.exists('sr_test_cookie3'), false);
		});

	};

	return Test;

});