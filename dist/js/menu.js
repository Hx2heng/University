requirejs.config({
	paths: {
		jquery:'../lib/js/jquery.min',
		bootstrap: '../lib/js/bootstrap.min',
		dad: '../lib/js/jquery.dad.min',
		mes: '../lib/js/messenger.min',
		mestf: '../lib/js/messenger-theme-flat'
	},
	shim:{
		bootstrap:{
			deps:['jquery']
		}
	}
});

require(["jquery", "menu-control", "mes"], function($, Menu) {
	//demo object
	function Demo(ele) {
		this.ele = $(ele);
	}
	Demo.prototype = {
		create: function(data) {
			this.ele.hide();
			this.ele.fadeIn(200);
			this.ele.find('ul').eq(0).empty();
			var data = data;
			var li_1 = [];
			for (var i = 0; i < data.length; i++) {
				if (data[i].pId == 0) {
					li_1.push(data[i]);
				}
			}
			for (var i = 0; i < li_1.length; i++) {
				li_1[i].ele = $('<li class="demo-1-li"><p>' + li_1[i].text + '</p></li>');
				li_1[i].ul_2 = $('<ul class="demo-2-ul"><span class="demo-angle"></span></div>');
				li_1[i].ul_2.li_2 = [];
				li_1[i].ele.append(li_1[i].ul_2);
				this.ele.find('ul').eq(0).append(li_1[i].ele);
			}
			for (var i = 0; i < data.length; i++) {
				if (data[i].pId == 1) {
					var id_index = data[i].id.toString().charAt(0) - 1;
					li_1[id_index].ul_2.li_2.push(data[i]);
				}
			}
			for (var i = 0; i < li_1.length; i++) {
				for (var j = 0; j < li_1[i].ul_2.li_2.length; j++) {
					li_1[i].ul_2.li_2[j].ele = $('<li class="demo-2-li"><p>' + li_1[i].ul_2.li_2[j].text + '</p></li>');
					li_1[i].ul_2.append(li_1[i].ul_2.li_2[j].ele);
				}
			}

			this.init();
		},
		init: function() {
			//demo btn

			var demo_li_num = $('.demo-1-ul').children('li').length;
			$('.demo-1-ul').find('.demo-1-li').eq(0).css({
				'border': 'none'
			});
			$('.demo-1-ul').find('.demo-1-li').each(function() {
				$(this).css({
					'width': 100 / demo_li_num + '%'
				});
				$(this).on("click", function() {
					if ($(this).find('li').length != 0) {
						$(this).siblings().children('.demo-2-ul').hide();
						$(this).children('.demo-2-ul').toggle();
					}
				});
			});
			//demo-2-ul-position
			$('.demo-2-ul').each(function() {
				$(this).css({
					'top': -$(this).outerHeight() - 8 + 'px'
				});

			});

		}

	}


	$(document).ready(function() {
		//测试菜单
		var menu_data = [{
			id: 1,
			pId: 0,
			type: 0,
			text: '威莱新闻',
			key: '1',
			url: '222'
		}, {
			id: 13,
			pId: 1,
			type: 1,
			text: '新品上市',
			key: '1',
			url: ''
		}, {
			id: 11,
			pId: 1,
			type: 0,
			text: '每日新闻',
			key: '1',
			url: ''
		}, {
			id: 12,
			pId: 1,
			type: 0,
			text: '公司简介',
			key: '',
			url: 'http://www.baidu.com'
		}, {
			id: 3,
			pId: 0,
			type: 1,
			text: '威莱活动',
			key: '',
			url: 'http://www.baidu.com'
		}, {
			id: 31,
			pId: 1,
			type: 1,
			text: '消灭细菌',
			key: '1',
			url: ''
		}, {
			id: 32,
			pId: 1,
			type: 2,
			text: '威帅拼图',
			key: '1',
			url: ''
		}, {
			id: 2,
			pId: 0,
			type: 1,
			text: '会员专区',
			key: '1',
			url: ''
		}, {
			id: 21,
			pId: 1,
			type: 2,
			text: '签到',
			key: '1',
			url: ''
		}, {
			id: 22,
			pId: 1,
			type: 2,
			text: '会员社区',
			key: '1',
			url: ''
		}];

		//创建menu对象
		var menu = new Menu('.setul', {
			type: [{name:"默认",valt:0},{name:"类型一",valt:1},{name:"类型二",valt:0}],
			limit: [3, 4]
		}, menu_data);

		menu.init();
		//创建demo对象
		var demo = new Demo('.menu-demo');
		demo.create(menu.outData());

		//menu对象事件
		menu.on('dataChange', function() {
			var data = menu.outData();
			demo.create(data);
		});
		menu.on('overlimit1', function(e) {
			//$('.menu-setborad').prepend('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>警告!</strong>  一级菜单最多' + e + '项。</div>');
			Messenger().post({
				message: '一级菜单最多' + e + '项。',
				type: 'error',
				hideAfter: 4,
				showCloseButton: true
			});

		});
		menu.on('overlimit2', function(e) {
			//$('.menu-setborad').prepend('<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>警告!</strong>  二级菜单最多' + e + '项。</div>');
			Messenger().post({
				message: '二级菜单最多' + e + '项。',
				type: 'error',
				hideAfter: 4,
				showCloseButton: true
			});
		});


		//操作按钮
		$('#reduction').on("click", function() {
			try{
			menu.setData(menu_data);
			menu.init();
			demo.create(menu.outData());
			Messenger().post({
				message: '还原菜单成功。',
				type: 'success',
				hideAfter: 4,
				showCloseButton: true
			});
			}
			catch(err){
				Messenger().post({
				message: '还原菜单失败。',
				type: 'error',
				hideAfter: 4,
				showCloseButton: true
			});
			}
		});
		$('#save').on("click", function() {
			var data = menu.outData();
			menu.setData(data);
			menu.init();
			demo.create(data);
			console.log(menu.new_data)
		});
		$('#cancel').on("click", function() {



		});


		//拖拽
		menu.on('init', setdad);

		function setdad() {
			$('.dad').on('mouseenter', function() {
				$(this).parents('.li-2-content').addClass('dowebok');
				$('.dowebok').dad({
					target: '.li-2',
					placeholder: '移动至这里',
					draggable: '.dad',
					callback: function(e) {
						$('.dads-children-clone').remove();
						var data = menu.outData();
						menu.setData(data);
						menu.init();
						demo.create(data);
					}
				});
			});
			$('.dad1').on('mouseenter', function() {

				$(this).parents('.li-1-content').addClass('dowebok');
				$('.dowebok').dad({
					target: '.li-1',
					placeholder: '移动至这里',
					draggable: '.dad1',
					callback: function(e) {
						$('.dads-children-clone').remove();
						var data = menu.outData();
						menu.setData(data);
						menu.init();
						demo.create(data);
					}
				});
			});
			$('.dad').on('mouseleave', function() {
				$('.dads-children-clone').remove();
				var data = menu.outData();
				menu.setData(data);
				menu.init();
			});
			$('.dad').on('mousedown', function() {
				$('.dad1').unbind('mouseenter').unbind('mouseleave');
				$('.dad').unbind('mouseenter').unbind('mouseleave');
			});
			$('.dad1').on('mouseleave', function() {
				var data = menu.outData();
				menu.setData(data);
				menu.init();
			});
			$('.dad1').on('mousedown', function() {
				$('.dad1').unbind('mouseenter').unbind('mouseleave');
				$('.dad').unbind('mouseenter').unbind('mouseleave');
			});
		}
		setdad();

		//错误提示
		Messenger.options = {
			extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-left messenger-theme-flat messenger-user'
		};
		
	});
});