/**
 * Created by fgq10 on 2016-04-12.
 */

//设置
var urlActivities = '';
var urlActivitiesAdd = '';
var urlActivitiesUpdate = '';
var urlActivitiesbahncardVerifies = '';
var urlCatalog = '';
var urlSitting = function (mode, qinxiId) {
    if (mode == 'nginx') {
        urlActivities = 'http://localhost:8080/rest/activities/';
        urlActivitiesAdd = 'http://localhost:8080/rest/activities/add';
        urlActivitiesUpdate = 'http://localhost:8080/rest/activities/update';
        urlActivitiesbahncardVerifies = 'http://localhost:8080/rest/activities/bahncardVerifies';
        urlCatalog = 'http://localhost:8080/rest/catalogs';
    }
    else if (mode == 'normal') {
        urlActivities = 'http://qinxi:80/rest/activities/';
        urlActivitiesAdd = 'http://qinxi:80/rest/activities/add';
        urlActivitiesUpdate = 'http://qinxi:80/rest/activities/update';
        urlActivitiesbahncardVerifies = 'http://qinxi:80/rest/activities/bahncardVerifies';
        urlCatalog = 'http://qinxi:80/rest/catalogs';

    }
    else if (mode == 'safe') {
        urlActivities = 'http://' + qinxiId + ':80/rest/activities/';
        urlActivitiesAdd = 'http://' + qinxiId + ':80/rest/activities/add';
        urlActivitiesUpdate = 'http://' + qinxiId + ':80/rest/activities/update';
        urlActivitiesbahncardVerifies = 'http://' + qinxiId + ':80/rest/activities/bahncardVerifies';
        urlCatalog = 'http://' + qinxiId + ':80/rest/catalogs';


    }
}

var pageSitting = function () {
    urlSitting('nginx', '192.168.10.89');
}

// 页面启始
var pageStart = function () {
    console.log(location.href.split("?")[1]);
    if (location.href.split("?")[1] == 'newActivity') {
    }
    else {
        $('title').html('数据载入中')
        $.ajax
        ({
            type: "GET",
            url: urlActivities + location.href.split("?")[1],
            // url: "http://qinxi:80/rest/activities",
            dataType: 'jsonp',
            async: true,
            data: {},
            success: function (data) {
                console.log(data);
                var eventdata = data.content.activity;
                $('title').html('修改活动-' + eventdata.name);
                $('.inputbox-main.name').val(eventdata.name);
                $('.inputbox-main.description').val(eventdata.description);
                $('.inputdate.startTime').val(eventdata.startTime);
                $('.inputdate.endTime').val(eventdata.endTime);
                $('.inputdate.maxParticipators').val(eventdata.maxParticipators);
                var formElements = data.content.form;
                buildForm(formElements);
                $('.databox').show();
                eventVerificationData(data);
            }
        })

    }
}


// 输出整个表单
var buildForm = function (formElements) {
    $('.formbox').children().remove();
    var elements = formElements.inputs;
    var numOfElement = elements.length;
    for (var i = 0; i < numOfElement; i++) {
        if (elements[i].type == 1) {
            cre1(elements[i]);
        }
        if (elements[i].type == 4) {
            cre2(elements[i]);
        }
        if (elements[i].type == 3) {
            cre3(elements[i]);
        }
        if (elements[i].type == 7) {
            cre4(elements[i]);
        }
    }
}

// 输出活动报名核销情况
var eventVerificationData = function (data) {
    $('.databox').show();
    $('.eventUrl').children().eq(0).attr('href', 'http://sijiache.heapot.com/webui/activity_one.php?id=' + data.content.activity.id);
    $('.eventUrl').children().eq(1).find('p').html('http://sijiache.heapot.com/webui/activity_one.php?id=' + data.content.activity.id);
    $('.chkbox').children().remove();
    var verifiersData = data.content.bahncardVerifies.rows;
    for (var i = 0; i < verifiersData.length; i++) {
        crtchk(verifiersData[i].verifierName, '暂无');
    }

}

//表单功能
var form = function () {
    var newElement = {
        "name": "",
        "type": '',
        "notNull": false,
        "options": [
            {
                "name": "",
                "value": "",
                "checked": ""
            }]
    }
    $('#btn1').click(function () {
        cre1(newElement);
    });
    $('#btn2').click(function () {
        cre2(newElement);
    });
    $('#btn3').click(function () {
        cre3(newElement);
    });
    $('#btn4').click(function () {
        cre4(newElement);
    });
    // 保存按钮
    $('#btn21').click(function () {
        // 判断此按钮是否可用并给出为什么不可用的解释
        if ($('.inputbox-main.name').val() == '') {
            $('.messageBar').find('p').html('请输入活动标题');
            $('.messageBar').css('background', 'red').fadeIn(300);
            $('html,body').animate({scrollTop: $('.mainset-tittle').offset().top}, 500);
            $('.inputbox-main.name').focus();
        }
        else {
            $('.messageBar').find('p').html('提交中');
            $('.messageBar').css('background', '#007aff').fadeIn(300);
            var inputNum = $('.formbox').find('.close-box').length;
            //清除无名项选项
            for (var i = 1; i <= inputNum; i++) {
                var thisBox = $('.formbox').children().eq(i);
                var thisNameBox = thisBox.find('.inputbox-main');
                if (thisNameBox.val() == '') {
                    thisBox.attr('id', 'removeable');
                }
            }
            $("[Id=removeable]").remove();
            whip();
            //输入inputData数据
            inputNum = $('.formbox').find('.close-box').length;
            var inputData = new Array(inputNum);
            for (var i = 0; i < inputNum; i++) {
                var thisBox = $('.formbox').children().eq(i);
                var inputType = thisBox.attr('Class');
                if (inputType == 'inputTextBox') {
                    inputData[i] = {
                        "name": thisBox.find('.inputbox-main').val(),
                        "type": 1,
                        "notNull": true
                    }
                }
                else if (inputType == 'ssbox') {
                    var selectionNum = thisBox.find('.inputbox-secondary').length - 1;
                    var selection = new Array(selectionNum);
                    for (var a = 0; a < selectionNum; a++) {
                        // var b = a * 1 + 1;
                        selection[a] = {
                            "name": thisBox.find('.inputbox-secondary').eq(a).val(),
                            "value": a,
                            "checked": "false"
                        }
                        if (thisBox.find('.select-box').attr('Class') == 'select-box selected-box') {
                            selection[a].checked = 'true'
                        }
                    }
                    inputData[i] = {
                        "name": thisBox.find('.inputbox-main').val(),
                        "type": 4,
                        "notNull": true,
                        "options": selection

                    }
                }
                else if (inputType == 'msbox') {
                    var selectionNum = thisBox.find('.inputbox-secondary').length - 1;
                    var selection = new Array(selectionNum);
                    for (var a = 0; a < selectionNum; a++) {
                        selection[a] = {
                            "name": thisBox.find('.inputbox-secondary').eq(a).val(),
                            "value": a,
                            "checked": "false"
                        }
                        if (thisBox.find('.check-box').attr('Class') == 'check-box checked-box') {
                            selection[a].checked = 'true'
                        }
                    }
                    inputData[i] = {
                        "name": thisBox.find('.inputbox-main').val(),
                        "type": 3,
                        "notNull": true,
                        "options": selection

                    }
                }
                else if (inputType == 'inputDescriptionBox') {
                    inputData[i] = {
                        "name": thisBox.find('.inputbox-main').val(),
                        "type": 7
                    }

                }
            }
            console.log(JSON.stringify(inputDataFromUser()));
            // 判断保存按钮的作用
            if (location.href.split("?")[1] == 'newActivity') {
                $.ajax
                ({
                    type: 'POST',
                    url: urlActivitiesAdd,
                    dataType: 'json',
                    async: true,
                    username: 'operating',
                    password: 'operating123',
                    contentType: "application/json",
                    // data: JSON.stringify({
                    //     "activity": {
                    //         "name": $('.name').val(),
                    //         "description": $('.description').val(),
                    //         "image": "123",
                    //         "startTime": $('.startTime').val(),
                    //         "endTime": $('.endTime').val(),
                    //         "maxParticipators": $('.maxParticipators').val()
                    //     },
                    //     "inputs": inputData
                    // }),
                    data: JSON.stringify(inputDataFromUser()),

                    success: function () {
                        $('.databox').show();
                        $('.messageBar').find('p').html('提交成功');
                        $('.messageBar').css('background', '#007aff').fadeOut(1000);
                    }
                });
            }
            else {
                console.log({
                    "activity": {
                        "name": $('.name').val(),
                        "description": $('.description').val(),
                        "image": "123",
                        "startTime": $('.startTime').val(),
                        "endTime": $('.endTime').val(),
                        "maxParticipators": $('.maxParticipators').val(),
                        "id": location.href.split("?")[1]
                    },
                    "form": {
                        "inputs": inputData
                    }

                });
                $.ajax
                ({
                    type: 'POST',
                    url: urlActivitiesUpdate,
                    dataType: 'json',
                    async: true,
                    username: 'operating',
                    password: 'operating123',
                    contentType: "application/json",
                    // data:activityData,
                    data: JSON.stringify({
                        "activity": {
                            "name": $('.name').val(),
                            "description": $('.description').val(),
                            "image": "123",
                            "startTime": $('.startTime').val(),
                            "endTime": $('.endTime').val(),
                            "maxParticipators": $('.maxParticipators').val(),
                            "id": location.href.split("?")[1]
                        },
                        "inputs": inputData
                    }),

                    success: function () {
                        $('.databox').show();
                        $('.messageBar').find('p').html('提交成功');
                        $('.messageBar').css('background', '#007aff').fadeOut(1000);
                    }
                });

            }
        }

    });
    // 另存按钮
    $('#btn22').click(function () {
        // 判断此按钮是否可用并给出为什么不可用的解释
        if ($('.inputbox-main.name').val() == '') {
            $('.messageBar').find('p').html('请输入活动标题');
            $('.messageBar').css('background', 'red').fadeIn(300);
            $('html,body').animate({scrollTop: $('.mainset-tittle').offset().top}, 500);
            $('.inputbox-main.name').focus();
        }
        else {
            $('.messageBar').find('p').html('提交中');
            $('.messageBar').css('background', '#007aff').fadeIn(300);
            var inputNum = $('.formbox').find('.close-box').length;
            //清除无名项选项
            for (var i = 1; i <= inputNum; i++) {
                var thisBox = $('.formbox').children().eq(i);
                var thisNameBox = thisBox.find('.inputbox-main');
                if (thisNameBox.val() == '') {
                    thisBox.attr('id', 'removeable');
                }
            }
            $("[Id=removeable]").remove();
            whip();
            //输入inputData数据
            inputNum = $('.formbox').find('.close-box').length;
            var inputData = new Array(inputNum);
            for (var i = 0; i < inputNum; i++) {
                var thisBox = $('.formbox').children().eq(i);
                var inputType = thisBox.attr('Class');
                if (inputType == 'inputTextBox') {
                    inputData[i] = {
                        "name": thisBox.find('.inputbox-main').val(),
                        "type": 1,
                        "notNull": true
                    }
                }
                else if (inputType == 'ssbox') {
                    var selectionNum = thisBox.find('.inputbox-secondary').length - 1;
                    var selection = new Array(selectionNum);
                    for (var a = 0; a < selectionNum; a++) {
                        // var b = a * 1 + 1;
                        selection[a] = {
                            "name": thisBox.find('.inputbox-secondary').eq(a).val(),
                            "value": a,
                            "checked": "false"
                        }
                        if (thisBox.find('.select-box').attr('Class') == 'select-box selected-box') {
                            selection[a].checked = 'true'
                        }
                    }
                    inputData[i] = {
                        "name": thisBox.find('.inputbox-main').val(),
                        "type": 4,
                        "notNull": true,
                        "options": selection

                    }
                }
                else if (inputType == 'msbox') {
                    var selectionNum = thisBox.find('.inputbox-secondary').length - 1;
                    var selection = new Array(selectionNum);
                    for (var a = 0; a < selectionNum; a++) {
                        selection[a] = {
                            "name": thisBox.find('.inputbox-secondary').eq(a).val(),
                            "value": a,
                            "checked": "false"
                        }
                        if (thisBox.find('.check-box').attr('Class') == 'check-box checked-box') {
                            selection[a].checked = 'true'
                        }
                    }
                    inputData[i] = {
                        "name": thisBox.find('.inputbox-main').val(),
                        "type": 3,
                        "notNull": true,
                        "options": selection

                    }
                }
                else if (inputType == 'inputDescriptionBox') {
                    inputData[i] = {
                        "name": thisBox.find('.inputbox-main').val(),
                        "type": 7
                    }

                }
            }

            $.ajax
            ({
                type: 'POST',
                url: urlActivitiesAdd,
                dataType: 'json',
                async: true,
                username: 'operating',
                password: 'operating123',
                contentType: "application/json",
                // data:activityData,
                data: JSON.stringify({
                    "activity": {
                        "name": $('.name').val(),
                        "description": $('.description').val(),
                        "image": "123",
                        "startTime": $('.startTime').val(),
                        "endTime": $('.endTime').val(),
                        "maxParticipators": $('.maxParticipators').val()
                    },
                    "inputs": inputData
                }),

                success: function () {
                    $('.databox').show();
                    $('.messageBar').find('p').html('提交成功');
                    $('.messageBar').css('background', '#007aff').fadeOut(1000);
                }
            });
        }

    });
    // 清空按钮
    $('#btn23').click(function () {
        $('.formbox').children('div').remove();
        whip();
    });

}

// 获取用户填写的活动数据（input）
var inputDataFromUser = function () {
    var activityData = "";
    if (location.href.split("?")[1] == 'newActivity') {
        activityData = {
            "name": $('.name').val(),
            "description": $('.description').val(),
            "image": "123",
            "startTime": $('.startTime').val(),
            "endTime": $('.endTime').val(),
            "maxParticipators": $('.maxParticipators').val(),
            "catalogId": location.href.split("?")[2]
        }
    }
    else {
        activityData = {
            "id": location.href.split("?")[1],
            "name": $('.name').val(),
            "description": $('.description').val(),
            "image": "123",
            "startTime": $('.startTime').val(),
            "endTime": $('.endTime').val(),
            "maxParticipators": $('.maxParticipators').val()
        }
    }
    var formData = "";
    var inputNum = $('.formbox').find('.close-box').length;
    var inputData = new Array(inputNum);
    for (var i = 0; i < inputNum; i++) {
        var thisBox = $('.formbox').children().eq(i);
        var inputType = thisBox.attr('Class');
        if (inputType == 'inputTextBox') {
            inputData[i] = {
                "name": thisBox.find('.inputbox-main').val(),
                "type": 1,
                "notNull": true
            }
        }
        else if (inputType == 'ssbox') {
            var selectionNum = thisBox.find('.inputbox-secondary').length - 1;
            var selection = new Array(selectionNum);
            for (var a = 0; a < selectionNum; a++) {
                // var b = a * 1 + 1;
                selection[a] = {
                    "name": thisBox.find('.inputbox-secondary').eq(a).val(),
                    "value": a,
                    "checked": "false"
                }
                if (thisBox.find('.select-box').attr('Class') == 'select-box selected-box') {
                    selection[a].checked = 'true'
                }
            }
            inputData[i] = {
                "name": thisBox.find('.inputbox-main').val(),
                "type": 4,
                "notNull": true,
                "options": selection

            }
        }
        else if (inputType == 'msbox') {
            var selectionNum = thisBox.find('.inputbox-secondary').length - 1;
            var selection = new Array(selectionNum);
            for (var a = 0; a < selectionNum; a++) {
                selection[a] = {
                    "name": thisBox.find('.inputbox-secondary').eq(a).val(),
                    "value": a,
                    "checked": "false"
                }
                if (thisBox.find('.check-box').attr('Class') == 'check-box checked-box') {
                    selection[a].checked = 'true'
                }
            }
            inputData[i] = {
                "name": thisBox.find('.inputbox-main').val(),
                "type": 3,
                "notNull": true,
                "options": selection

            }
        }
        else if (inputType == 'inputDescriptionBox') {
            inputData[i] = {
                "name": thisBox.find('.inputbox-main').val(),
                "type": 7
            }

        }
    }
    if (location.href.split("?")[1] == 'newActivity') {
        formData = {
            "inputs": inputData
        }
    }
    else {
        formData = {
            "activityId": location.href.split("?")[1],
            "inputs": inputData
        }
    }
    var inputData = {
        "activity": activityData,
        "form": formData
    }
    return inputData;
}


//formbox关闭按钮
var clbox = function () {
    $('.formbox').find('.close-box').unbind('click').click(function () {
        $(this).parent().remove();
        whip();
    });
}
//datetime清空按钮
var clearDatetime = function () {
    $('.setbox.datetime').find('.close-box').click(function () {
        $(this).parent().find('.inputdate').val('')
    })
}

//多选选中
var mselected = function () {
    $('.msbox').find('.check-box').unbind('click').click(function () {
        if ($(this).attr('Class') == 'check-box') {
            $(this).addClass('checked-box');
        }
        else if ($(this).attr('Class') == 'check-box checked-box') {
            $(this).removeClass('checked-box');
        }
    })
}

//单选选中
var singleSelected = function () {
    $('.ssbox').find('.select-box').unbind('click').click(function () {
        $(this).parent().parent().find('.select-box').attr('Class', 'select-box');
        $(this).addClass('selected-box');
    })
}

//表单内提示文字何时隐藏
var whip = function () {
    var crenum = $('.formbox').children('div').size();
    if (crenum === 1) {
        $('.formbox').children('p').hide();
        $('.formbox').animate({
            minHeight: "10px"
        }, 100)
    }
    else if (crenum === 0) {
        $('.formbox').children('p').show();
        $('.formbox').animate({
            minHeight: "100px"
        }, 100)
    }
}

//创建输入项
var cre1 = function (elementData) {
    $('<div class="inputTextBox" id="a"></div>').appendTo('.formbox');
    $('<button type="button" class="close-box"></button>').appendTo('#a');
    $('<div class="setbox" style="margin-bottom: 0px" id="b"></div>').appendTo('#a');
    $('<input class="inputbox-main" style="margin-bottom: 0px" placeholder="请输入您想让用户填写的内容">').val(elementData.name).appendTo('#b');
    $('#b').removeAttr('Id');
    $('#a').removeAttr('Id');
    clbox();
    whip();
    autoFillForm();
}

//创建单选
var cre2 = function (elementData) {
    $('<div class="ssbox" id="a"></div>').appendTo('.formbox');
    $('<button type="button" class="close-box"></button>').appendTo('#a');
    $('<div class="setbox" style="margin: 0px" id="b">').appendTo('#a');
    $('<input class="inputbox-main" style="margin-bottom: 0px"  placeholder="请输入您想让用户选择的内容">').val(elementData.name).appendTo('#b');
    $('#b').removeAttr('Id');
    var NumOfOption = elementData.options.length;
    for (var i = 0; i < NumOfOption; i++) {
        $('<div class="setbox" style="margin: 0px" id="b">').appendTo('#a');
        $('<input class="inputbox-secondary" placeholder="请输入单选选项">').val(elementData.options[i].name).appendTo('#b');
        if (elementData.options[i].checked == 'true') {
            $('<div class="select-box selected-box"></div>').appendTo('#b');
        }
        else {
            $('<div class="select-box"></div>').appendTo('#b');
        }
        $('#b').removeAttr('Id');
    }
    $('<div class="setbox" style="margin: 0px" id="b">').appendTo('#a');
    $('<input class="inputbox-secondary" placeholder="请输入单选选项">').appendTo('#b');
    $('<div class="select-box"></div>').appendTo('#b');
    $('#b').removeAttr('Id');
    $('#a').removeAttr('Id');
    clbox();
    whip();
    newcre2box();
    singleSelected();
    autoFillForm();
}

//创建多选
var cre3 = function (elementData) {
    $('<div class="msbox" id="a"></div>').appendTo('.formbox');
    $('<button type="button" class="close-box"></button>').appendTo('#a');
    $('<div class="setbox" style="margin: 0px" id="b">').appendTo('#a');
    $('<input class="inputbox-main" style="margin-bottom: 0px"  placeholder="请输入您想让用户选择的内容">').val(elementData.name).appendTo('#b');
    $('#b').removeAttr('Id');
    var NumOfOption = elementData.options.length;
    for (var i = 0; i < NumOfOption; i++) {
        $('<div class="setbox" style="margin: 0px" id="b">').appendTo('#a');
        $('<input class="inputbox-secondary" placeholder="请输入多选选项">').val(elementData.options[i].name).appendTo('#b');
        $('<div class="check-box"></div>').appendTo('#b');
        if (elementData.options[i].checked == 'true') {
            $('<div class="check-box checked-box"></div>').appendTo('#b');
        }
        else {
            $('<div class="check-box"></div>').appendTo('#b');
        }
        $('#b').removeAttr('Id');
    }
    $('<div class="setbox" style="margin: 0px" id="b">').appendTo('#a');
    $('<input class="inputbox-secondary" placeholder="请输入多选选项">').appendTo('#b');
    $('<div class="check-box"></div>').appendTo('#b');
    $('#b').removeAttr('Id');
    $('#a').removeAttr('Id');
    clbox();
    whip();
    newcre3box();
    mselected();
    autoFillForm();
}

//创建描述行
var cre4 = function (elementData) {
    $('<div class="inputDescriptionBox" id="a"></div>').appendTo('.formbox');
    $('<button type="button" class="close-box"></button>').appendTo('#a');
    $('<div class="setbox" id="b"></div>').appendTo('#a');
    $('<input class="inputbox-main" style="margin-bottom: 0px"  placeholder="请描述下面将要填写的内容">').val(elementData.name).appendTo('#b');
    $('#b').removeAttr('Id');
    $('#a').removeAttr('Id');
    clbox();
    whip();
    autoFillForm();
}

//单选自动补充选项
var newcre2box = function () {
    $('.ssbox').find('div').on('keyup', function () {
        console.log(222222222)
        if ($(this).index() == ($(this).parent('.ssbox').find('>div').length - 0)) {
            $(this).after('<div class="setbox" style="margin: 0px" id="b">');
            $('<input class="inputbox-secondary" placeholder="请输入新的选项">').appendTo('#b');
            $('<div class="select-box"></div>').appendTo('#b');
            $('#b').removeAttr('Id');
            newcre2box();
            singleSelected();
        }
        else if (($(this).index() < ($(this).parent('.ssbox').find('>div').length - 0)) && ($(this).find('input').val().length == 0)) {
            if ($(this).find('.inputbox-secondary').length == 1) {
                $(this).remove();
            }


        }
    })
}

//多选自动补充选项
var newcre3box = function () {
    $('.msbox').find('div').on('keyup', function () {
        if ($(this).index() == ($(this).parent('.msbox').find('>div').length - 0)) {
            $(this).after('<div class="setbox" style="margin: 0px" id="b">');
            $('<input class="inputbox-secondary" placeholder="请输入新的选项">').appendTo('#b');
            $('<div class="check-box"></div>').appendTo('#b');
            $('#b').removeAttr('Id');
            newcre3box();
            mselected();
        }
        else if (($(this).index() < ($(this).parent('.msbox').find('>div').length - 0)) && ($(this).find('input').val().length == 0)) {
            $(this).remove();
        }
    })
}


// 智能补充表单
var autoFillForm = function () {
    $('.formbox').find('.inputbox-main').unbind('keyup').bind('keyup', function () {
        var inputSel = $(this).parent();
        $('#autoFill').remove();
        $('.autoFillSel').removeClass("autoFillSel").css('height', "");
        $(this).after("<div id='autoFill'>");
        $(this).parent().addClass('autoFillSel');
        $.ajax
        ({
            type: "GET",
            url: "http://sijiache.heapot.com/webui/api/createform.php?name=" + $(this).val(),
            dataType: 'jsonp',
            jsonp: "callback",
            jsonpCallback: "success_jsonpCallback",
            async: true,
            data: {},
            success: function (data) {
                console.log(data);
                var numOfName = data.content.name.length;
                if (numOfName < 5) {
                    inputSel.css("height", 34 + 34 * numOfName + "px");
                    for (var i = 0; i < numOfName; i++) {
                        $("<div class='autoFillElement' id='a' >").appendTo("#autoFill");
                        $("<button type='button' class='autoFillButton' id='b' >").appendTo("#a");
                        $("<p class='inputbox-name'>").html(data.content.name[i]).appendTo("#b");
                        $("<p class='outputbox'>").html(data.describe).appendTo("#b");
                        $("<p style='display: none'>").html("{'name':" + data.content.name[i] + ",'type':" + data.type + ",'input':" + 1 + "}").appendTo("#b");
                        $("#b").click(function () {

                            inputSel.find('.inputbox-main').val($(this).children().eq(0).text());
                        });
                        $("#a").removeAttr("id");
                        $("#b").removeAttr("id");
                    }
                }
            }
        })

    })
}

//清除智能填充表单


//触发输出一个新建核销员的表单
var chkform = function () {
    $('#btncrtchk').click(function () {
        var alt = $('#crtchkform').length;
        if (alt == 0) {
            crtchkform();
        }
    });
}


//输出一个新建核销员的表单
var crtchkform = function (chkname, chknum, stime, etime) {
    $('<div style="margin-bottom: 12.5px" id="crtchkform"></div>').prependTo('.chkbox');
    $('<div class="conform-box"></div>').appendTo('#crtchkform');
    $('<input class="inputbox-main" style="margin-bottom: 0px" placeholder="请输入核销员名称">').appendTo('#crtchkform');
    $('<div class="setbox-secondary chknum" style="margin: 0px"id="b">').appendTo('#crtchkform');
    $('<input class="inputdate" type="number" placeholder="请输入四位数字">').appendTo('#b');
    $('<p class="inputbox-name">核销码</p>').appendTo('#b');
    $('#b').removeAttr('Id');
    $('<div class="setbox-secondary stime" style="margin: 0px"id="b">').appendTo('#crtchkform');
    $('<input class="inputdate" type="datetime-local">').appendTo('#b');
    $('<p class="inputbox-name">生效日期</p>').appendTo('#b');
    $('#b').removeAttr('Id');
    $('<div class="setbox-secondary etime" style="margin: 0px"id="b">').appendTo('#crtchkform');
    $('<input class="inputdate" type="datetime-local">').appendTo('#b');
    $('<p class="inputbox-name">失效日期</p>').appendTo('#b');
    $('#b').removeAttr('Id');
    //$('#a').removeAttr('Id');


//触发输出一个核销员
    $('.conform-box').click(function () {
        var chkname = $('#crtchkform').children('.inputbox-main').val();
        var chknum = $('#crtchkform').children('.chknum').find('input').val();
        var stime = $('#crtchkform').children('.stime').val();
        var etime = $('#crtchkform').children('.etime').val();
        if ((chkname.length > 0) || (chknum.length > 0)) {
            $.ajax
            ({
                type: 'POST',
                url: urlActivitiesbahncardVerifies,
                dataType: 'json',
                async: true,
                contentType: "application/json",
                data: JSON.stringify({
                    "activityId": location.href.split("?")[1],
                    "verifierName": chkname,
                    "password": chknum,
                    "startTime": stime,
                    "endTime": etime
                }),
                success: function () {
                    crtchk(chkname, '暂无');
                    $('#crtchkform').remove();
                }

            })
        }
    })

}


//输出一个核销员
var crtchk = function (chkname, num) {
    $('<div class="setbox" id="a">').prependTo('.chkbox');
    $('<button type="button" class="close-box"></button>').appendTo('#a');
    $('<p class="inputbox-name">').text(chkname).appendTo('#a');
    $('<p class="outputbox" style="right: 46.5px">').text(num).appendTo('#a');
    $('<div class="inputbox-secondary" style="width: 100%"></div>').appendTo('#a');
    $('#a').removeAttr('Id');
    clbox();
}


$(document).ready(pageSitting);
$(document).ready(pageStart);
$(document).ready(form);
$(document).ready(clearDatetime);
$(document).ready(chkform);
$(document).ready(autoFillForm);