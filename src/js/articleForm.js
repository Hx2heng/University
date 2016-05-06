requirejs.config({
	paths: {
		jquery:'../lib/js/jquery.min',
		bootstrap: '../lib/js/bootstrap.min',
		ueditor:'../lib/js/ueditor.all.min',
		ueditorconfig:'../lib/js/ueditor.config'
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		}
	}
});

require(["jquery","bootstrap","ueditor","ueditorconfig"], function($,bootstrap,ueditor,ueditorconfig) {
	console.log(UE);

	//Editor
	var ue = UE.getEditor('editor');
});