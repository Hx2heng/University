requirejs.config({
    paths: {
        jquery:'../lib/js/jquery.min',
        dad: '../lib/js/jquery.dad.min'
    }
});

define(['jquery', 'dad'], function($, dad) {
    function Menu(ele, config, data) {
        this.ele = $(ele);
        this.new_data = [];
        this.config = {
            type: [{
                name: "默认",
                valt: 0
            }, {
                name: "类型一",
                valt: 1
            }, {
                name: "类型二",
                valt: 2
            }],
            limit: [3, 4]
        };
        this.handler = {};
        if (!arguments[2]) {
            this.data = [{
                id: 1,
                pId: 0,
                type: 1,
                text: '我的菜单',
            }];
        } else {
            this.data = data;
        }
        $.extend(this.config, config);
    }
    Menu.prototype = {
        setData: function(data) {
            if (data) {
                this.data = data;
            }
            return this.data;
        },
        create: function() {
            var CFG = this.config; //设置数据	
            var data = this.data; //列表数据源
            var ul_1 = [],
                ul_2 = [];
            var data_1_ids = [],
                data_2_ids = [],
                id_index = 0;

            //创建ul_1
            ul_1.ele = $('<ul class="list-group ul-1"></div>');
            var ultitle1 = $("<div class='ul-title'><p>一级菜单</p><div class='icon-btn-group'><span class='glyphicon glyphicon-plus icon-btn' aria-hidden='true'></span></div></div>");
            var li_1_content = $('<div class="li-1-content"></div>"');
            this.options = ''; //类型设置
            for (var i = 0; i < CFG.type.length; i++) {
                this.options = this.options + '<option>' + CFG.type[i].name + '</option>';
                if (CFG.type[i].valt == 1)
                    CFG.type[i].valn = 'key';
                if (CFG.type[i].valt == 2)
                    CFG.type[i].valn = 'url';
            }

            //编辑面板
            //var li_set = $('<div class="input-group li-set"><input type="text" class="form-control text" placeholder="xxx"><span class="input-group-btn"><select class="form-control data-option">' + this.options + '</select></span><span class="input-group-btn"><button class="btn btn-success confirm" type="button">确定</button><button class="btn btn-default cancel" type="button">取消</button></span></div>');
            this.ele.append(ul_1.ele);
            ul_1.ele.append(ultitle1);
            ul_1.ele.append(li_1_content);
            //生成列表
            for (var i = 0; i < data.length; i++) {
                if (data[i].pId == 0) {
                    data_1_ids.push(data[i].id);
                }
            }
            data_1_ids.sort();
            for (var i = 0; i < data_1_ids.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (data[j].id == data_1_ids[i]) {
                        ul_1.push(data[j]);
                    }
                }
            }
            for (var i = 0; i < ul_1.length; i++) {
                ul_1[i].ele = $("<li class='list-group-item li-1'></li>");
                ul_1[i].ele.ul_2 = $('<ul class="list-group ul-2"><div class="ul-title"><p>二级菜单</p><div class="icon-btn-group"><span class="glyphicon glyphicon-plus icon-btn" aria-hidden="true"></span></div></div></div>');
                ul_1[i].ele.ul_2.li_2_content = $('<div class="li-2-content"></div>');
                ul_1[i].ele.ul_2.append(ul_1[i].ele.ul_2.li_2_content);
                ul_1[i].ele.ul_2.eles = [];
                li_1_content.append(ul_1[i].ele);
                ul_1[i].ele.attr("type-index", ul_1[i].type);
                if (CFG.type[ul_1[i].type].valt == 0) ul_1[i].val = ul_1[i].key;
                if (CFG.type[ul_1[i].type].valt == 1) ul_1[i].val = ul_1[i].url;
                ul_1[i].ele.append('<div class ="li-data"><p><span class="data-text">' + ul_1[i].text + '</span><span class="data-type">' + CFG.type[ul_1[i].type].name + '</span><span class="data-val">' + ul_1[i].val + '</span></p><div class="icon-btn-group"><span class="glyphicon glyphicon-pencil icon-btn edit" aria-hidden="true"></span><span class="glyphicon glyphicon-move icon-btn dad1" aria-hidden="true"></span><span class="glyphicon glyphicon-trash icon-btn delete" aria-hidden="true"></span></div></div>');
                //ul_1[i].ele.append('<div class="input-group li-set"><input type="text" class="form-control text" placeholder="xxx" /><span class="input-group-btn"><select class="form-control data-option">' + this.options + '</select></span><span class="input-group-btn"><button class="btn btn-success confirm" type="button">确定</button><button class="btn btn-default cancel" type="button">取消</button></span></div>');
                ul_1[i].ele.append('<div class="li-set" ><div class="input-group"><input type="text" class="form-control text" placeholder="1"><span class="input-group-btn"><button class="btn btn-default confirm" type="button">确定</button><button class="btn btn-default cancel" type="button">取消</button></span></div><div class="input-group li-type-set"><span class="input-group-btn"><select class="form-control data-option" style="width: auto;">' + this.options + '</select></span><input type="text" class="form-control val" placeholder="1" val=' + CFG + '></div></div>');
                ul_1[i].ele.append(ul_1[i].ele.ul_2);
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].pId == 1) {
                    data_2_ids.push(data[i].id);
                }
            };
            data_2_ids.sort();

            for (var i = 0; i < data_2_ids.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (data[j].id == data_2_ids[i]) {
                        id_index = data[j].id.toString().charAt(0) - 1;
                        ul_1[id_index].ele.ul_2.eles.push(data[j]);

                    }
                }
            }


            for (var i = 0; i < ul_1.length; i++) {
                for (var j = 0; j < ul_1[i].ele.ul_2.eles.length; j++) {
                    ul_1[i].ele.ul_2.eles[j].ele = $("<li class='list-group-item li-2'></li>");
                    //ul_1[i].ele.ul_2.li_2_content=$('<div class="li-2-content"></div>');
                    ul_1[i].ele.ul_2.li_2_content.append(ul_1[i].ele.ul_2.eles[j].ele);
                    ul_1[i].ele.ul_2.eles[j].ele.attr("type-index", ul_1[i].ele.ul_2.eles[j].type);
                    if (CFG.type[ul_1[i].ele.ul_2.eles[j].type].valt == 0) ul_1[i].ele.ul_2.eles[j].val = ul_1[i].ele.ul_2.eles[j].key;
                    if (CFG.type[ul_1[i].ele.ul_2.eles[j].type].valt == 1) ul_1[i].ele.ul_2.eles[j].val = ul_1[i].ele.ul_2.eles[j].url;

                    ul_1[i].ele.ul_2.eles[j].ele.append('<div class ="li-data"><p><span class="data-text">' + ul_1[i].ele.ul_2.eles[j].text + '</span><span class="data-type">' + CFG.type[ul_1[i].ele.ul_2.eles[j].type].name + '</span><span class="data-val">' + ul_1[i].ele.ul_2.eles[j].val + '</span></p><div class="icon-btn-group"> <span class="glyphicon glyphicon-pencil icon-btn edit" aria-hidden="true"></span><span class="glyphicon glyphicon-move icon-btn dad" aria-hidden="true"></span><span class="glyphicon glyphicon-trash icon-btn delete" aria-hidden="true"></span></div></div>');
                    ul_1[i].ele.ul_2.eles[j].ele.append('<div class="li-set" ><div class="input-group"><input type="text" class="form-control text" placeholder="1"><span class="input-group-btn"><button class="btn btn-default confirm" type="button">确定</button><button class="btn btn-default cancel" type="button">取消</button></span></div><div class="input-group li-type-set"><span class="input-group-btn"><select class="form-control data-option" style="width: auto;">' + this.options + '</select></span><input type="text" class="form-control val" placeholder="1" val=' + CFG + '></div></div>');
                }
            }
        },
        init: function() {
            this.ele.empty();
            this.setData();
            this.create();
            this.control();
            this.itemAdd();
            this.outData();

        },
        control: function() {
            var _this = this;
            $('.ul-title').unbind("mouseover").on("mouseover", function() {
                $(this).children('.icon-btn-group').stop().fadeIn(200);
            });
            $('.ul-title').unbind("mouseleave").on("mouseleave", function() {
                $(this).children('.icon-btn-group').stop().fadeOut(200);
            });
            $('.ul-1 li').unbind("mouseover").on("mouseover", function() {
                $(this).children().children('.icon-btn-group').stop().fadeIn(200);
                $(this).children('.li-data').find('.data-val').stop().fadeIn(200);
            });
            $('.ul-1 li').unbind("mouseleave").on("mouseleave", function() {
                $(this).children().children('.icon-btn-group').stop().fadeOut(200);
                $(this).children('.li-data').find('.data-val').stop().fadeOut(200);
            });

            //li-set
            $('.data-option').css({
                'width': 'auto'
            });

            //li-data change
            $('.edit').unbind("click").on('click', function() {
                $(this).parents('.li-data').slideUp(200);
                $(this).parents('.li-data').siblings('.li-set').css({
                    'display': 'block'
                });
                $(this).parents('.li-data').siblings('.li-set').find('.text').val($(this).parents('.li-data').find('.data-text').text());
                $(this).parents('.li-data').siblings('.li-set').find('.val').val($(this).parents('.li-data').find('.data-val').text());
                $(this).parents('.li-data').siblings('.li-set').find('.data-option').val($(this).parents('.li-data').find('.data-type').text());

                _this.outData();
                _this.fire('dataChange');
            });
            $('.cancel').unbind("click").on('click', function() {
                $(this).parents('.li-set').slideUp();
                $(this).parents('.li-set').siblings('.li-data').slideDown();
            });
            $('.confirm').unbind("click").on('click', function() {
                var text = $(this).parents('.li-set').find('.text').val();
                var option = $(this).parents('.li-set').find('.data-option').val();
                var val = $(this).parents('.li-set').find('.val').val();
                var index = $(this).parents('.li-set').find('.data-option').prop('selectedIndex');
                var data_text = $(this).parents('.li-set').eq(0).siblings('.li-data').find('.data-text');
                var data_type = $(this).parents('.li-set').eq(0).siblings('.li-data').find('.data-type');
                var data_val = $(this).parents('.li-set').eq(0).siblings('.li-data').find('.data-val');
                var type_index = $(this).parents('li').eq(0);
                if (!text && text == '') {
                    alert('请输入菜单名');
                } else {
                    if($(this).parents('.li-set').eq(0).siblings('.list-group').find('.li-2-content').html()){
                        data_type.text("默认");
                        data_val.text("");
                        type_index.attr("type-index", 0);
                    }
                    else{
                        data_type.text(option);
                        data_val.text(val);
                        type_index.attr("type-index", index);
                    }
                    data_text.text(text);

                    $(this).parents('.li-set').slideUp();
                    $(this).parents('.li-set').siblings('.li-data').slideDown();
                }
                
                _this.outData();
                _this.fire('dataChange');
            });
            $('.delete').unbind("click").on('click', function() {
                $(this).parents('li').eq(0).remove();
                _this.outData();
                _this.fire('dataChange');
            });
            this.itemAdd();
            this.fire('init');
        },
        itemAdd: function() {
            var _this = this;
            //add li_1
            $('.ul-1').children('.ul-title').children('.icon-btn-group').children('.glyphicon-plus').unbind("click").on('click', function() {

                if ($(this).parents('.ul-1').children().children('li').length > _this.config.limit[0] - 1) {
                    //alert('一级菜单最多'+_this.config.limit[0]+'项');
                    _this.fire("overlimit1", _this.config.limit[0]);
                } else {
                    console.log('hellow');
                    $('.ul-1').find('.li-1-content').append("<li class='list-group-item li-1' type-index='0'><div class ='li-data'><p><span class='data-text'>新菜单</span><span class='data-type'>" + _this.config.type[0].name + "</span></p><div class='icon-btn-group'> <span class='glyphicon glyphicon-pencil icon-btn edit' aria-hidden='true'></span><span class='glyphicon glyphicon-move icon-btn dad1' aria-hidden='true'></span><span class='glyphicon glyphicon-trash icon-btn delete' aria-hidden='true'></span></div></div><div class='li-set' ><div class='input-group'><input type='text' class='form-control text' placeholder='1'><span class='input-group-btn'><button class='btn btn-default confirm' type='button'>确定</button><button class='btn btn-default cancel' type='button'>取消</button></span></div><div class='input-group li-type-set'><span class='input-group-btn'><select class='form-control data-option' style='width: auto;'>" + this.options + "</select></span><input type='text' class='form-control val' placeholder='1' val=''></div></div></div><ul class='list-group ul-2'><div class='ul-title'><p>二级菜单</p><div class='icon-btn-group'><span class='glyphicon glyphicon-plus icon-btn' aria-hidden='true'></span></div></div><div class='li-2-content'></div></ul></li>");
                    _this.control();
                    _this.fire('dataChange');
                }

            });
            //add li_2
            $('.ul-2').children('.ul-title').children('.icon-btn-group').children('.glyphicon-plus').unbind("click").on('click', function() {

                if ($(this).parents('.ul-2').find('li').length > _this.config.limit[1] - 1) {
                    //alert('二级菜单最多'+_this.config.limit[1]+'项');
                    _this.fire("overlimit2", _this.config.limit[1]);
                } else {
                   $(this).parents('.ul-2').parents('li').find('.data-type').eq(0).html('默认');
                   $(this).parents('.ul-2').parents('li').attr("type-index",0);
                    console.log( $(this).parents('.ul-2').parents('li').find('.data-type').eq(0).html());
                    $(this).parents('.ul-2').find('.li-2-content').append("<li class='list-group-item li-2' type-index='0'><div class ='li-data'><p><span class='data-text'>新菜单</span><span class='data-type'>" + _this.config.type[0].name + "</span></p><div class='icon-btn-group'> <span class='glyphicon glyphicon-pencil icon-btn edit' aria-hidden='true'></span><span class='glyphicon glyphicon-move icon-btn dad' aria-hidden='true'></span><span class='glyphicon glyphicon-trash icon-btn delete' aria-hidden='true'></span></div></div><div class='li-set' ><div class='input-group'><input type='text' class='form-control text' placeholder='1'><span class='input-group-btn'><button class='btn btn-default confirm' type='button'>确定</button><button class='btn btn-default cancel' type='button'>取消</button></span></div><div class='input-group li-type-set'><span class='input-group-btn'><select class='form-control data-option' style='width: auto;'>" + this.options + "</select></span><input type='text' class='form-control val' placeholder='1' val=''></div></div></li>");
                    _this.control();
                    _this.fire('dataChange');
                }

            });
        },
        outData: function() {
            this.new_data = [];
            var CFG = this.config;
            var new_data = [];
            var ul_1 = this.ele.find('.ul-1');
            var li_1 = ul_1.children('.li-1-content').children('li');

            for (var i = 0; i < li_1.length; i++) {
                li_1[i].dpId = 0;
                li_1[i].did = 1 + i;
                li_1[i].dtext = li_1.eq(i).find('.data-text').eq(0).text();
                li_1[i].dtype = li_1.eq(i).attr("type-index");

                if (CFG.type[li_1[i].dtype].valt == 0) li_1[i].dkey = li_1.eq(i).find('.data-val').eq(0).text();
                if (CFG.type[li_1[i].dtype].valt == 1) li_1[i].durl = li_1.eq(i).find('.data-val').eq(0).text();
                li_1[i].li_2 = li_1.eq(i).find('li');
                new_data.push(li_1[i]);

                for (var j = 0; j < li_1[i].li_2.length; j++) {
                    li_1[i].li_2[j].dpId = 1;
                    li_1[i].li_2[j].did = (i + 1) * 10 + j + 1;
                    li_1[i].li_2[j].dtext = li_1.eq(i).find('li').eq(j).find('.data-text').eq(0).text();
                    li_1[i].li_2[j].dtype = li_1.eq(i).find('li').eq(j).attr("type-index");
                    if (CFG.type[li_1[i].li_2[j].dtype].valt == 0) li_1[i].li_2[j].dkey = li_1.eq(i).find('li').eq(j).find('.data-val').eq(0).text();
                    if (CFG.type[li_1[i].li_2[j].dtype].valt == 1) li_1[i].li_2[j].durl = li_1.eq(i).find('li').eq(j).find('.data-val').eq(0).text();
                    new_data.push(li_1[i].li_2[j]);

                }

            }

            for (var i = 0; i < new_data.length; i++) {
                this.new_data[i] = {
                    id: new_data[i].did,
                    pId: new_data[i].dpId,
                    type: new_data[i].dtype,
                    text: new_data[i].dtext,
                    key: new_data[i].dkey,
                    url: new_data[i].durl
                };
            }
            return this.new_data;
        },
        //！自定义事件！
        on: function(type, fn) {
            if (typeof this.handler[type] == 'undefined') {
                this.handler[type] = [];
            }
            this.handler[type].push(fn);
        },
        fire: function(type, data) {
            if (this.handler[type] instanceof Array) {
                var handler = this.handler[type];
                for (var i = 0; i < handler.length; i++) {
                    handler[i](data);
                }
                //this.handler[type] = undefined;
            }
        }
    }

    return Menu;
})
