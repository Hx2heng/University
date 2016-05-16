requirejs.config({
	paths: {
		bootstrap: 'bootstrap.min',
		iemodes: 'asset/ie-emulation-modes-warning',
		iebug: 'asset/ie10-viewport-bug-workaround',
		holder: 'asset/holder'
	}
});

define(["jquery"], function($, Popover) {

 	$('.main-right').css({
			'min-height': $('.left-side').outerHeight()+'px'
		});
	$('.main-left').css({
			'min-height': $('.left-side').outerHeight()-$('.footer').outerHeight() + 'px'
		});
	$(window).scroll(function() {
		var eTop = $(window).scrollTop();
		if ($(window).width() >= 751) {


			$(".main-left").css({
				"top": eTop
			});

		} else {
			$(".main-left").css({
				"top": 0
			});
		}
	});
	$(window).resize(function() {
		var eHeight = $(".left-side").height() - $(".footer").height();
		if ($(window).width() >= 751) {

			$("#tree").css({
				"max-height": eHeight - 170 + "px"
			});
			// $(".main-left").css({"height":eHeight});
		} else {
			$(".main-left").css({
				"top": 0
			});
		}
		$('.main-right').css({
			'min-height': $('.left-side').outerHeight()
		});
		$('.main-left').css({
			'min-height': $('.left-side').outerHeight()-$('.footer').outerHeight() + 'px'
		});
	});



});