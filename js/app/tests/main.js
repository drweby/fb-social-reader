define([
	'require',
	'app/helpers/debugger',
	'app/helpers/url-param',
	'underscore'
], function(
	require,
	Debugger,
	Param,
	_
) {

	var Tests = {};

	Tests.modules = [
		//'helpers/time'
		//'helpers/debugger'
		'helpers/cookie',
		'helpers/single-format'
	];

	Tests.are_on = function() {
		Debugger.log('Seeing if we\'re running tests');
		if (Param.exists('sr_tests')) {
			Debugger.log('Testing is ON');
			return true;
		} else {
			Debugger.log('Testing is OFF');
			return false;
		}
	};

	Tests.start = function() {
		var _this = this;
			Debugger.log('Finished loading qunit.js');
			_.each(_this.modules, function(module) {
				require(['app/tests/'+module], function(obj) {
					Debugger.log('Loaded '+'app/tests/'+module+', now run it');
					_.each(obj.queue, function(method) {
						method();
					});
				});
			});
		
		
	};




	return Tests;

});