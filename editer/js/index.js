/**
 * Created by fgq10 on 2016-03-10.
 */
// 设置
var urlActivities = '';
var urlActivitiesAdd = '';
var urlActivitiesUpdate = '';
var urlActivitiesbahncardVerifies = '';
var urlCatalog = '';
var urlSitting = function (mode,qinxiId) {
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
    urlSitting('safe','192.168.10.89');
}


//输出主页基本框架（第一步）（目前采用html内置）
var cremainpageBasic = function () {
    $('<div style="position: absolute;width: 100%;min-height: 30px;top: 50px;display: block" class="edit column">').appendTo('.mainpage');
    $('<p style="text-align: center;color: #ffffff;font-size: 18px;text-shadow:0px 0px 3px #000">点击编辑此栏目</p>').appendTo('.edit.column');
    $("<img src='' class='headimg' >").appendTo('.mainpage');
    $('<div class="navibar">').appendTo('.mainpage');
    $('<div class="artlist">').appendTo('.mainpage');
    $('<ul class="naviul">').appendTo('.navibar');

}


//
// 输出主页框架----栏目，新建等
//

//columnNum=栏目数量
// columnArray=栏目数组
// columnImgArray=栏目图片数组
//edit=1  编辑模式
//edit=0  普通浏览模式
//catalogIdOnOpen=输出时店面打开的是ID栏目

var cremainpage = function (data, columnImgArray, edit, catalogIdOnOpen) {
    $('.mainpage').show();
    var columnNum = data.content.length;
    var columnArray = data.content;
    for (var i = 0; i < columnNum; i++) {
        $('<li class="navili" type="button">').attr("id", 'columnli' + columnArray[i].id).html(columnArray[i].name).appendTo('.naviulBtn');
        $('<ul style="display: none">').attr("id", 'ul' + columnArray[i].id).appendTo('.artlist');
        //输出创建活动按钮
        $('#ul' + columnArray[i].id).before(newli(columnArray[i].id, 'newActivity', 'img/newpic.png', '新建活动', '您可以单击此处来新建一个活动'));
        console.log(columnArray[i].id);
    }
    $('.pic').attr('Class', 'newpic');
    $('.artlist').find('li').attr('Class', 'newli');
    $('.closeBox').remove();
    $('#ul' + catalogIdOnOpen).show();
    history.pushState({}, '', location.href.split("?")[0] + "?" + catalogIdOnOpen);
    $('.headimg').attr('src', columnImgArray[0]);
    naviBarColor();
    $('#columnli' + catalogIdOnOpen).addClass('navilisel');
    $("<li class='navili edit' id='editCatalog'> 编辑栏目</li>").appendTo('.naviulBtn');
    $('<img src="img/sitting.png" style="width: 15px;position:relative;top: 2px;">').prependTo('.navili.edit');
    btncolumn(columnImgArray);
}


//输出一个项目
//栏目ID，在该栏目下排第几个，图片链接，标题，备注
var newli = function (columnID, id, imgurl, title, note) {
    $('<li class="li">').attr("id", 'a').appendTo('#ul' + columnID);
    $('<div class="closeBox"></div>').appendTo('#a');
    $('<button class="liBtn">').attr("id", columnID).appendTo('#a');
    $('<div class="pic">').css("background-image", "url(" + imgurl + ")").appendTo('#' + columnID);
    $('<div class="textbox" id="b">').appendTo('#' + columnID);
    $('<div style="display: table;height: 90px" id="c">').appendTo('#b');
    $('<div style="display: table-cell;vertical-align: middle" id="d">').appendTo('#c');
    $('<p class="tittle">').html(title).appendTo('#d');
    $('<p class="note">').html(note).appendTo('#d');
    $('<div class="bottomline">').appendTo('#' + columnID);
    $('#a').removeAttr('id').attr('id', id);
    $('#b').removeAttr('id');
    $('#c').removeAttr('id');
    $('#d').removeAttr('id');
}


//栏目按钮
var btncolumn = function (columnImgArray) {
    $('.navili').unbind('click').click(function () {
            if ($(this).children().length > 0) {
            }
            else {
                $('.navilisel').removeClass('navilisel');
                $(this).addClass('navilisel');
                $('ul').hide();
                $('.naviul').show();
                var catalogId = $(this).attr('id').split('columnli')[1];
                console.log(catalogId);
                $('#ul' + catalogId).fadeIn(300);
                // $('.headimg').attr('src', columnImgArray[num - 1]);
                history.pushState({}, '', location.href.split("?")[0] + "?" + catalogId);
            }
        }
    )
}


//页面启始函数
var pagestart = function () {
    $(".datetimepicker").hide();
    mainData();
    $('.btn').click(function () {
        var username = $('#username').val();
        var password = $('#passwd').val();
        mainData(username, password);
    })
}

// 输出主页
var mainData = function (username, password) {
    $.ajax
    ({
        type: "GET",
        url: urlCatalog,
        // url: "http://qinxi:80/rest/activities",
        dataType: 'jsonp',
        async: true,
        username: username,
        password: password,
        data: {},
        success: function (pData) {
            $.ajax
            ({
                type: "GET",
                url: urlCatalog + "?pid=" + pData.content[0].id,
                // url: "http://qinxi:80/rest/activities",
                dataType: 'jsonp',
                async: true,
                username: username,
                password: password,
                data: {},
                success: function (data) {
                    $('#heapot').hide();
                    $('#login').attr('disabled', true);
                    cremainpage(data, ['img/111.jpg'], 1, data.content[0].id);
                    $('[id=editCatalog]').click(function () {
                        window.open('catalog/?' + pData.content[0].id);
                    });
                    $('.newli').click(function () {
                        window.open('activity/?newActivity?' + $(this).parent().attr('id').split('ul')[1]);
                    });

                }
            })
        }
    });
    $.ajax
    ({
        type: "GET",
        url: urlActivities,
        dataType: 'jsonp',
        async: true,
        data: {},
        success: function (data) {
            var columnNum = '';
            var maindata = data.content.rows;
            var activitiesNum = maindata.length;
            //输出节目列表（目前仅有栏目1的节目）
            for (var i = 0; i < activitiesNum; i++) {
                newli(maindata[i].catalogID, maindata[i].id, maindata[i].image, maindata[i].name, maindata[i].startTime);
            }
            $('liBtn').click(function () {
                console.log('输出节目的ID: ' + $(this).attr('id'));
                var seat = $(this).parent().index() - 1;
                var eventdata = data.content.rows[seat];
                history.pushState({title: eventdata.name}, eventdata.name, location.href.split("?")[0] + "?" + eventdata.id);
                modifyEventpage(eventdata);
                $('[Id=datetimePicker]').removeAttr('disabled');
            });
            $('.closeBox').unbind('click').click(function () {
                deleteLiById($(this).parent().find('button').attr('id'));
            })
        }
    });
}

// 删除ID为某某的栏目
var deleteLiById = function (elementId) {
    $.ajax
    ({
        type: 'POST',
        url: urlActivities + "/delete?activityId=" + elementId,
        dataType: 'json',
        async: true,
        contentType: "application/json",
        success: function () {
            $('#' + elementId).parent().hide();
        }
    })

}

// head图片颜色控制（导航栏颜色控制）
var naviBarColor = function () {
    var aaaimg = $('.headimg');
    ColorAnalysis.getColor(aaaimg.get(0), function (result) {
        var thisColor;
        var rgb = result.bgColor.replace(/\(|\)|rgb|\s/g, '').split(/,/);
        thisColor = result.bgColor;
        $('.navibar').css('background-color', thisColor);
    })
}


// 链接控制
// var urlCtrl = function () {
//     if (history.pushState) {
//         window.addEventListener("popstate", function () {
//             if (location.href.split("?")[1].length < 30) {
//                 $('.setpad').fadeOut(50);
//                 $('.mainpage').fadeIn(500);
//                 $('[Id=datetimePicker]').attr('disabled', true);
//             }
//             if (location.href.split("?")[1].length > 30) {
//                 $('.mainpage').fadeOut(50);
//                 $.ajax
//                 ({
//                     type: "GET",
//                     url: "http://localhost:8080/rest/activities",
//                     // url: "http://qinxi:80/rest/activities",
//                     dataType: 'jsonp',
//                     async: true,
//                     data: {},
//                     success: function (data) {
//                         var maindata = data.content.rows;
//                         var activitiesNum = maindata.length;
//                         //输出节目列表（目前仅有栏目1的节目）
//                         for (var seat = 0; seat < activitiesNum; seat++) {
//                             if (maindata[seat].id == location.href.split("?")[1]) {
//                                 var eventdata = new Array(11);
//                                 eventdata[0] = maindata[seat].createTime;
//                                 eventdata[1] = maindata[seat].description;
//                                 eventdata[2] = maindata[seat].endTime;
//                                 eventdata[3] = maindata[seat].id;
//                                 eventdata[4] = maindata[seat].image;
//                                 eventdata[5] = maindata[seat].maxParticipators;
//                                 eventdata[6] = maindata[seat].minParticipators;
//                                 eventdata[7] = maindata[seat].name;
//                                 eventdata[8] = maindata[seat].startTime;
//                                 eventdata[9] = maindata[seat].status;
//                                 eventdata[10] = maindata[seat].url;
//                                 modifyEventpage(eventdata);
//                             }
//                         }
//                     }
//                 });
//                 $('.setpad').fadeIn(500);
//             }
//         })
//     }
// }


$(document).ready(pageSitting);
$(document).ready(pagestart);



