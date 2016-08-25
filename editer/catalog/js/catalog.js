/**
 * Created by fgq10 on 2016-04-12.
 */

/**
 * Created by fgq10 on 2016-03-04.
 */
//输出一个栏目
var crecolumn = function (name, seat, img, num) {
    $('<div class="columnbox">').attr('id', +seat).appendTo('.columnform');
    $('<div class="close-box">').appendTo('#' + seat);
    $('<input class="inputbox-main" style="margin-bottom: 0px" placeholder="请输入栏目名（建议不超过三个字）" required="required">').val(name).appendTo('#' + seat);
    $('<div class="setbox-secondary" style="margin: 0px" id="b">').appendTo('#' + seat);
    $('<select class="inputdate" placeholder="从左到右按照数字排列" required="required">').appendTo('#b');
    $('<p class="inputbox-name">栏目排序</p>').appendTo('#b');
    $('#b').removeAttr('Id');
    $('<div class="setbox-secondary" style="margin: 0px" id="b">').appendTo('#' + seat);
    $('<input class="inputdate" type="file">').appendTo('#b');
    $('<p class="inputbox-name">封面大图</p>').appendTo('#b');
    $('#b').removeAttr('Id');
    $('<div class="setbox-secondary" style="margin: 0px" id="b">').appendTo('#' + seat);
    $('<p class="inputbox-name">包含活动数</p>').appendTo('#b');
    $('<p class="outputbox">').html(num).appendTo('#b');
    $('#b').removeAttr('Id');
    seleter();
    $('.inputdate').unbind();
    changeSeleterID();
    //关闭一个栏目
    $('.close-box').unbind('click').click(function () {
        var thisID = $(this).parent().attr('id');
        var columnNum = $('.columnbox').length;
        alert('删除第' + thisID + '个')
        for (var i = thisID; i < columnNum; i++) {
            var j = i * 1 + 1;
            $("[Id=" + j + "]").attr('id', +i);
        }
        $(this).parent().remove();
        seleter();
    })
}

var columnForm = function () {
    $('#btnNewColumn').click(function () {
        var columnNum = $('.columnbox').length;
        crecolumn('', columnNum + 1, '', 0);
    });
}

var seleter = function () {
    var columnNum = $('.columnbox').length;
    //alert('seleter');
    $('option').remove();
    for (var i = 0; i < columnNum; i++) {
        //alert('changeOption');
        var j = i + 1;
        $("<option>第" + j + "个栏目</option>").attr("value", j).attr('id', j).appendTo('select');
        $("[Id=" + j + "]").find("[Id=" + j + "]").attr("selected", "selected");
    }
}

var changeSeleterID = function () {
    $('.inputdate').change(function () {
        var thisID = $(this).parent().parent().attr('id');
        var changeID = $(this).val();
        var columnNum = $('.columnbox').length;
        if (thisID > changeID) {
            for (var i = thisID; i >= changeID; i--) {
                var j = i * 1 + 1;
                $("[Id=" + i + "]").attr('id', +j);
            }
        }
        else if (thisID < changeID) {
            for (var i = thisID; i <= changeID; i++) {
                var j = i - 1;
                //alert("把第"+i+"个变成第"+j+"个");
                $("[Id=" + i + "]").attr('id', +j);
            }
        }
        //alert(changeID);
        $(this).parent().parent().attr('Id', +changeID);
        //排序
        $('.inputdate').unbind();
        for (var i = 1; i <= columnNum; i++) {
            //alert('排序'+i)
            $("[Id=" + i + "]").appendTo('.columnform');
        }
        seleter();
        changeSeleterID();
    })

}

var pageStart = function () {
    var catalogId = location.href.split('?')[1];
    $.ajax
    ({
        type: "GET",
        url: "http://localhost:8080/rest/catalogs?pid=" + catalogId,
        dataType: 'jsonp',
        async: true,
        data: {},
        success: function (data) {
            for (var i = 0; i < data.content.length; i++) {
                var catalogData=data.content[i];
                crecolumn(catalogData.name,i+1,catalogData.img,'');

            }
        }
    })
}

$(document).ready(pageStart);
$(document).ready(columnForm);

