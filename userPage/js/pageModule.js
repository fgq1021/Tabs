/**
 * Created by heapot on 16/7/1.
 */

//输出一个项目
//栏目ID，在该栏目下排第几个，图片链接，标题，备注,editable=1(编辑模式),editable=2(可删除)
var newli = function (columnID, id, imgurl, title, note, editable) {
    $('<li class="li">').attr("id", 'a').appendTo('#ul' + columnID);
    var normal = function () {
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
    };
    if (editable == 2) {
        $('<div class="closeBox"></div>').appendTo('#a');
        normal();
    }
    else if (editable == 0) {
        normal();
    }
    else if (editable == 1) {
        $('<div class="pic">').css("background-image", "url(" + imgurl + ")").appendTo('#a');
        $('<div class="textbox" id="b">').appendTo('#a');
        $('<div style="display: table;height: 90px;width: 100%" id="c">').appendTo('#b');
        $('<div style="display: table-cell;vertical-align: middle" id="d">').appendTo('#c');
        $("<textarea class='inputTittle' rows='1' placeholder='请在此处输入标题'> ").html(title).appendTo('#d');
        $('<p class="note">').html(note).appendTo('#d');
        $('#a').removeAttr('id').attr('id', id);
        $('#b').removeAttr('id');
        $('#c').removeAttr('id');
        $('#d').removeAttr('id');
        adjustInputHeight($('.inputTittle'), 2);
        $('.inputTittle').keyup(function () {
            adjustInputHeight($('.inputTittle'), 2);
        });
    }
    $('.inputTittle').css("height", $('.inputTittle').scrollHeight);

};

var adjustInputHeight = function (nowInput, maxrows) {
    var rowsBegin = nowInput.attr("rows");
    console.log(nowInput, nowInput.attr("rows"), rowsBegin);
    if (rowsBegin > 1) {
        nowInput.attr("rows", rowsBegin - 1);
    }
    while (nowInput.get(0).scrollHeight != nowInput.get(0).clientHeight && nowInput.attr("rows") < maxrows) {
        var rowsNow = rowsBegin;
        if (rowsNow > 1) {
            rowsNow--;
        }
        console.log("!=", nowInput.get(0).scrollHeight, nowInput.get(0).clientHeight, rowsNow);
        nowInput.attr("rows", rowsNow);
        while (nowInput.get(0).scrollHeight > nowInput.get(0).clientHeight && rowsNow < maxrows) {
            rowsNow++;
            nowInput.attr("rows", rowsNow);
            console.log(">", nowInput.get(0).scrollHeight, nowInput.get(0).clientHeight, rowsNow);
        }
    }
};