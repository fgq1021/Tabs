/**
 * Created by fgq10 on 2016-06-13.
 */


var pageStart = function () {

};

// 标题模块
var creTitle = function (titleData) {
    $("<div class='artTitle'>").attr("id", titleData.id).appendTo(".infoBox");
    $("<div class='userImg'>").css("background-image", titleData.img).appendTo(".artTitle");
    $("<p class='title'>").html(titleData.title).css("color", getHSLA(H, 4, 15)).appendTo(".artTitle");
    $("<p class='title2'>").html(titleData.author).css("color", getHSLA(H, 4, 60)).appendTo(".artTitle");
};


// 时间模块
// time={
//     name:"开始时间",
//     date:"2016/05/21",
//     time:"12:00"
// };
var creTimeModule = function (times) {
    var timeLineWidth = parseInt(document.body.clientWidth * 0.93);
    $("#TimeModule").remove();
    creFunctionModule("TimeModule", "infoBox");
    $("<div class='timeModule'>").appendTo("#TimeModule");
    $("<div class='timeLine'>").appendTo(".timeModule");
    for (var i = 0; i < times.length; i++) {
        if (i == 0) {
            creTimeBox(times[i], "left", 0);
        }
        else if (i == times.length - 1) {
            creTimeBox(times[i], "right", timeLineWidth);
        }
        else {
            var startTime = new Date(IosDate(times[0].dateTime));
            var endTime = new Date(IosDate(times[times.length - 1].dateTime));
            var iTime = new Date(IosDate(times[i].dateTime));
            var percent = parseInt(timeLineWidth * (iTime - startTime) / (endTime - startTime));
            var minPercent = 78 + 39 + 1;
            if (percent < minPercent) {
                percent = minPercent;
            }
            else if (percent > timeLineWidth - minPercent) {
                percent = timeLineWidth - minPercent;
            }
            console.log(startTime);
            console.log(endTime);
            console.log(iTime);
            console.log(timeLineWidth);
            console.log(percent);
            creTimeBox(times[i], "center", percent);
        }
    }
    $('.BtnBlock.now').css("background-color", getHSLA(H, 100, 50));
};
// index=left,right,center
var creTimeBox = function (timeData, index, i) {
    var date = IosDate(timeData.dateTime.split(" ")[0]);
    var timefull = timeData.dateTime.split(" ")[1];
    var time = timefull.split(':')[0] + ":" + timefull.split(':')[1];
    if (timeData.type == "now") {
        if (index == "center") {
            $("<div class='timeBox'>").addClass(index).attr("id", i).css("left", i - 39).appendTo(".timeModule");
            $("<button class='BtnBlock'>").attr("id", timeData.name).html(timeData.name).addClass("now").appendTo(".timeBox" + "#" + i);
            $("<p class='dateBlock'>").html(timeData.note.split(" ")[0]).appendTo(".timeBox" + "#" + i);
            $("<p class='timeBlock'>").html(timeData.note.split(" ")[1]).appendTo(".timeBox" + "#" + i);
            var BtnBlockWidth = $('.timeBox' + "#" + i).find(".BtnBlock")[0].clientWidth;
            $('.timeBox' + "#" + i).css("left", i - 78 + BtnBlockWidth / 2).css("width", BtnBlockWidth);
        }
        else {
            $("<div class='timeBox'>").addClass(index).attr("id", i).appendTo(".timeModule");
            $("<button class='BtnBlock'>").attr("id", timeData.name).html(timeData.name).addClass("now").appendTo(".timeBox" + "#" + i);
            $("<p class='dateBlock'>").html(timeData.note.split(" ")[0]).appendTo(".timeBox" + "#" + i);
            $("<p class='timeBlock'>").html(timeData.note.split(" ")[1]).appendTo(".timeBox" + "#" + i);
        }
    }
    else {
        if (index == "center") {
            $("<div class='timeBox'>").addClass(index).attr("id", i).css("left", "calc(" + i + "% - 39px)").appendTo(".timeModule");
            $("<button class='BtnBlock'>").attr("id", timeData.name).html(timeData.name).appendTo(".timeBox" + "#" + i);
            $("<p class='dateBlock'>").html(date).appendTo(".timeBox" + "#" + i);
            $("<p class='timeBlock'>").html(time).appendTo(".timeBox" + "#" + i);
            var BtnBlockWidth = $('.timeBox' + "#" + i).find(".BtnBlock")[0].clientWidth;
            console.log(BtnBlockWidth);
            $('.timeBox' + "#" + i).css("left", i - 78 + BtnBlockWidth / 2);
        }
        else {
            $("<div class='timeBox'>").addClass(index).attr("id", i).appendTo(".timeModule");
            $("<button class='BtnBlock'>").attr("id", timeData.name).html(timeData.name).appendTo(".timeBox" + "#" + i);
            $("<p class='dateBlock'>").html(date).appendTo(".timeBox" + "#" + i);
            $("<p class='timeBlock'>").html(time).appendTo(".timeBox" + "#" + i);
        }
    }

};

var IosDate = function (date) {
    date = date.replace(/-/g, "/");
    return date;
};


var creFunctionModule = function (id, appendToClass) {
    $("<div class='functionModule'>").attr("id", id).appendTo("." + appendToClass);
    $("<div class='splitLine'>").appendTo("#" + id);
};


// 日期格式化为纯数字
var dateFormat = function (fullDate) {
    if (fullDate.length == 19) {
        var date = fullDate.split(" ")[0].split("-");
        var time = fullDate.split(" ")[1].split(":");
        var formatedDate = date[0] + date[1] + date[2] + time[0] + time[1] + time[2];
        console.log(fullDate, formatedDate);
        return formatedDate;
    }
    else {
        return "00000000000000"
    }
};

// 当前日期格式化为纯数字
var dateNowNum = function () {
    var mydate = new Date();
    var a = mydate.getFullYear() + "" + AA((mydate.getMonth() + 1)) + "" + AA(mydate.getDate()) + "" + AA(mydate.getHours()) + "" + AA(mydate.getMinutes()) + "" + AA(mydate.getSeconds());
    return a;
};

// 将数字变为两位
var AA = function (X) {
    var A = "" + X;
    if (A.length == 0) {
        A = "00";
    }
    else if (A.length == 1) {
        A = "0" + A;
    }
    return A;
};


// 参与人数模块
var crePopulationModule = function (populationData) {
    creFunctionModule("populationMudule", "infoBox");
    $("<div class='populationModule'>").appendTo("#populationMudule");
    $("<p class='title'>").html("尚余" + (populationData[0] - populationData[1]) * 1 + "人次").css("color", getHSLA(H, 100, 50)).appendTo(".populationModule");
    $("<p class='note'>").html("共" + populationData[0] + "人次").css("color", getHSLA(H, 85, 20)).appendTo(".populationModule");
    $("<div class='dataBox'>").css("background-color", getHSLA(H, 100, 50)).appendTo(".populationModule");
    $("<div class='data level1'>").css("width", populationData[1] / populationData[0] * 100 + "%").css("background-color", getHSLA(H, 100, 35)).appendTo(".dataBox");
    $("<div class='data level2'>").css("width", populationData[2] / populationData[0] * 100 + "%").css("background-color", getHSLA(H, 100, 20)).appendTo(".dataBox");

};

var mainBodyEditZone = function (id) {
    $('#' + id).attr("contenteditable", "true");
    $('#' + id).after("<input class='focustest'>");
    var activePart = $('.activePart').get(0);
    var activePartHeight = 0;
    $('#' + id).click(function () {
        activePart = event.srcElement;
        verifyTool(activePart, id);
    });
    var i = 0;
    function iii() {
        i++;
        return i;
    }
    $(window).scroll(function () {
        console.log($(document).scrollTop(), $('.toolBoxInline').get(0).offsetTop);
        if ($('#' + id).get(0).offsetTop <= $(document).scrollTop() + 13) {
            $('.toolBoxFixed').show();
            $('.toolBoxInline').hide();
            $('#' + id).css("margin-top", "75px");
        }
        if ($('#' + id).get(0).offsetTop >= $(document).scrollTop() + 13) {
            $('.toolBoxFixed').hide();
            $('.toolBoxInline').show();
            $('#' + id).removeAttr("style");
        }
    });
    $('#' + id).keydown(function () {
        console.log($(this).children().eq(0).get(0).tagName);
        if ($(this).children().eq(0).html() == "<br>" && $(this).children().eq(0).get(0).tagName != "DIV") {
            if ((event.keyCode == 8)) {
                event.keyCode = 0;
                event.returnValue = false;
            }
            console.log("第一段已经删除");
        }
        else if ($(this).children().eq(0).html() == "<br>" && $(this).children().eq(0).get(0).tagName == "DIV") {
            if ((event.keyCode == 8)) {
                event.keyCode = 0;
                event.returnValue = false;
                $(this).children().eq(0).replaceWith("<p><br></p>");
                $('.focustest').focus();
                $(this).focus();
            }
        }
        console.log(event.keyCode + "keydown");
        $("<p>").html("keydown" + iii()).prependTo("#logBox");
    });
    $('#' + id).keyup(function () {
        console.log(event.keyCode + "keyup");
        $("<p>").html("keyup" + iii()).prependTo("#logBox");

    });
    $('#' + id).keypress(function () {
        console.log(event.keyCode + "keypress");
        $("<p>").html("keypress" + iii()).prependTo("#logBox");
    });
};

var verifyTool = function (thisPart, editZoneId) {
    if (thisPart.parentElement.id == editZoneId||thisPart.parentElement.parentElement.id == editZoneId) {
        if (thisPart.id == "") {
            $("#" + editZoneId).parent().find('.activePart').removeClass("activePart").removeClass("addPartActive");
            $(thisPart).addClass("activePart");
            var thisPartTop = thisPart.offsetTop;
            var thisPartBottom = thisPart.offsetTop + thisPart.clientHeight;
            creTextTool("textTools-" + $(thisPart).index(), editZoneId, thisPartTop + 13);
            creAddBtn("addBtn-" + $(thisPart).index(), editZoneId, thisPartBottom + 5)
        }
    }
};

var creToolBox = function (id, editZoneId, top) {
    $("#" + editZoneId).parent().find(".toolBar").attr("id", id).children().remove();
};
var creAddBtn = function (id, editZoneId, top) {
    $("#" + editZoneId).parent().find(".addBtnLine").remove();
    $("<div class='addBtnLine'>").attr("id", id).css("top", top * 1 + "px").appendTo("." + $("#" + editZoneId).parent().attr('class'));
    $("<div class='btnZone'>").appendTo("#" + id);
    $("<div class='addBtn'>").appendTo("#" + id);
    $("<div class='line'>").appendTo("#" + id);
    $("<div class='addBar'>").appendTo("#" + id);
    fillBtnBox("addBar");
    $('.btnZone').click(function () {
        console.log(111);
        var addBtnA = $(this).parent().find(".addBtn");
        if (addBtnA.attr("class").match("addBtnClose") == "addBtnClose") {
            $(addBtnA).removeClass("addBtnClose").addClass("addBtnRe");
            $(addBtnA).parent().removeClass("addActive");
            $(addBtnA).parent().find(".addBar").removeClass("addBarActive");
            $(addBtnA).parent().parent().find(".activePart").removeClass("addPartActive");
        }
        else {
            $(addBtnA).removeClass("addBtnRe").addClass("addBtnClose");
            $(addBtnA).parent().addClass("addActive");
            $(addBtnA).parent().find(".addBar").addClass("addBarActive");
            $(addBtnA).parent().parent().find(".activePart").addClass("addPartActive");
        }
    });
};
var creBtnBox = function (name, addClass) {
    $("<button id='a'>").appendTo("." + addClass);
    $("<p>+</p>").appendTo("#a");
    $("<p></p>").html(name).appendTo("#a");
    $("#a").removeAttr("id");
};

var fillBtnBox = function (addClass) {
    creBtnBox("图片", addClass);
    creBtnBox("报名表单", addClass);
    creBtnBox("视频", addClass);
    creBtnBox("投票", addClass);
    creBtnBox("投票", addClass);
    creBtnBox("投票", addClass);
    creBtnBox("投票", addClass);
    creBtnBox("投票", addClass);
};

var creTextTool = function (id, editZoneId, top) {
    creToolBox(id, editZoneId, top);
    var partAttribute = $("#" + editZoneId).find(".activePart").attr('class');
    console.log(partAttribute);
    fillToolBar("../../userPage/css/toolBarImg/text-sizeBig.png", "normal", "", "textBig", textSize);
    fillToolBar("../../userPage/css/toolBarImg/text-sizeLit.png", "normal", "", "textLit", textSize);
    fillToolBar("../../userPage/css/toolBarImg/text-size.png", "normal", "", "text", textSize);
    fillToolBar("../../userPage/css/toolBarImg/text-left.png", "normal", "", "textleft",textPosition);
    fillToolBar("../../userPage/css/toolBarImg/text-center.png", "normal", "", "textcenter",textPosition);
    fillToolBar("../../userPage/css/toolBarImg/text-right.png", "normal", "", "textright",textPosition);
    fillToolBar("../../userPage/css/toolBarImg/text-noList.png", "normal", "", "textnoList",textList);
    fillToolBar("../../userPage/css/toolBarImg/text-list.png", "normal", "", "textlist",textList);
    fillToolBar("../../userPage/css/toolBarImg/text-numList.png", "normal", "", "textnumList",textList);
    fillToolBar("../../userPage/css/toolBarImg/text-noindent.png", "normal", "", "textnoindent",textIndent);
    fillToolBar("../../userPage/css/toolBarImg/text-indent.png", "normal", "", "textindent",textIndent);
    if (partAttribute.match("textindent") == "textindent") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textindent').show();
    }
    else {
        $("#" + editZoneId).parent().find('.toolBar').find('#textnoindent').show();
    }
    if (partAttribute.match("textBig") == "textBig") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textBig').show();
    }
    else if (partAttribute.match("textLit") == "textLit") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textLit').show();
    }
    else {
        $("#" + editZoneId).parent().find('.toolBar').find('#text').show();
    }
    if (partAttribute.match("textnumList") == "textnumList") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textnumList').show();
    }
    else if (partAttribute.match("textlist") == "textlist") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textlist').show();
    }
    else {
        $("#" + editZoneId).parent().find('.toolBar').find('#textnoList').show();
    }
    if (partAttribute.match("textright") == "textright") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textright').show();
    }
    else if (partAttribute.match("textcenter") == "textcenter") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textcenter').show();
    }
    else {
        $("#" + editZoneId).parent().find('.toolBar').find('#textleft').show();
    }
    $("<div class='splitLine'>").appendTo("#" + id);
};
// width =normal/wide
var fillToolBar = function (img, width, name, toolId, toolFunction) {
    $("<button class='tool'>").attr("id", toolId).unbind("click").click(function () {
        toolFunction(this);
        //console.log(this);
        var activePart = $(this).parent().parent().parent().find('.activePart').get(0);
        verifyTool(activePart, $(this).parent().parent().parent().find('.mainBodyEditZone').attr("id"));
    }).appendTo(".toolBar");
    if (width == "normal") {
        $("<div class='toolPic'>").css('background-image', 'url(' + img + ')').appendTo("[Id=" + toolId + "]");
    }
    else if (width == "wide") {
        $("<div class='toolPic'>").css("background-image", "url(" + img + ")").addClass("toolPicWide").appendTo('#' + toolId);
    }
    $("<div class='toolName'>").html(name).appendTo('#' + toolId);
};

var textSize = function (whichBtn) {
    var editZone = $(whichBtn).parent().parent().parent();
    var targetPart = $(whichBtn).parent().parent().parent().find(".activePart");
    if (whichBtn.id == "text") {
        targetPart.addClass("textBig");
        editZone.find("#text").hide();
        editZone.find("#textBig").show();
    }
    else if (whichBtn.id == "textBig") {
        targetPart.addClass("textLit").removeClass("textBig");
        editZone.find("#textBig").hide();
        editZone.find("#textLit").show();
    }
    else if (whichBtn.id == "textLit") {
        targetPart.removeClass("textLit");
        editZone.find("#textLit").hide();
        editZone.find("#text").show();
    }
};
var textList = function (whichBtn) {
    var editZone = $(whichBtn).parent().parent().parent();//编辑区域
    var targetPart = $(whichBtn).parent().parent().parent().find(".activePart");//编辑区选中的部分
    if (whichBtn.id == "textnoList") {
        targetPart.addClass("textlist");
        editZone.find("#textnoList").hide();
        editZone.find("#textlist").show();
    }
    else if (whichBtn.id == "textlist") {
        targetPart.addClass("textnumList").removeClass("textlist");
        editZone.find("#textlist").hide();
        editZone.find("#textnumList").show();
    }
    else if (whichBtn.id == "textnumList") {
        targetPart.removeClass("textnumList");
        editZone.find("#textnumList").hide();
        editZone.find("#textnoList").show();
    }
};
var textPosition = function (whichBtn) {
    var editZone = $(whichBtn).parent().parent().parent();//编辑区域
    var targetPart = $(whichBtn).parent().parent().parent().find(".activePart");//编辑区选中的部分
    if (whichBtn.id == "textleft") {
        targetPart.addClass("textright");
        editZone.find("#textleft").hide();
        editZone.find("#textright").show();
    }
    else if (whichBtn.id == "textright") {
        targetPart.addClass("textcenter").removeClass("textright");
        editZone.find("#textright").hide();
        editZone.find("#textcenter").show();
    }
    else if (whichBtn.id == "textcenter") {
        targetPart.removeClass("textcenter");
        editZone.find("#textcenter").hide();
        editZone.find("#textleft").show();
    }
};
var textIndent = function (whichBtn) {
    var editZone = $(whichBtn).parent().parent().parent();//编辑区域
    var targetPart = $(whichBtn).parent().parent().parent().find(".activePart");//编辑区选中的部分
    if (whichBtn.id == "textnoindent") {
        targetPart.addClass("textindent");
        editZone.find("#textnoindent").hide();
        editZone.find("#textindent").show();
    }
    else if (whichBtn.id == "textindent") {
        targetPart.removeClass("textindent");
        editZone.find("#textindnet").hide();
        editZone.find("#textnoindent").show();
    }
};
