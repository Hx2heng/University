requirejs.config({
	paths: {
		jquery:'../lib/js/jquery.min',
		bootstrap: '../lib/js/bootstrap.min'
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		}
	}
});

require(["jquery","bootstrap"], function($,bootstrap) {
	
});