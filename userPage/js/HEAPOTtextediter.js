/**
 * Created by jia on 2016/8/25.
 */
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
                var elementName=$(this).children()[0].nodeName;
                $(this).children().eq(0).replaceWith("<"+elementName+"><br></"+elementName+">");
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
    if (thisPart.parentElement.id == editZoneId||thisPart.parentElement.parentElement.id == editZoneId||thisPart.parentElement.parentElement.parentElement.id == editZoneId) {
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
var creTextTool = function (id, editZoneId, top) {
    creToolBox(id, editZoneId, top);
    var partAttribute = $("#" + editZoneId).find(".activePart").attr('class');
    //console.log(partAttribute);
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
    //首行缩进
    if (partAttribute.match("textindent") == "textindent") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textindent').show();
    }
    else {
        $("#" + editZoneId).parent().find('.toolBar').find('#textnoindent').show();
    }
    //文字大小改变模块
    if (partAttribute.match("textBig") == "textBig") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textBig').show();
    }
    else if (partAttribute.match("textLit") == "textLit") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textLit').show();
    }
    else {
        $("#" + editZoneId).parent().find('.toolBar').find('#text').show();
    }
    //列表序列该改变模块
    if (partAttribute.match("textnumList") == "textnumList") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textnumList').show();
        changeTagName($("#" + editZoneId).find(".activePart"),"ol");
    }
    else if (partAttribute.match("textlist") == "textlist") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textlist').show();
        changeTagName($("#" + editZoneId).find(".activePart"),"ul");
    }
    else {
        $("#" + editZoneId).parent().find('.toolBar').find('#textnoList').show();
        if($("#" + editZoneId).find(".activePart").parent()[0].nodeName=="LI"){
            var act_content=$("#" + editZoneId).find(".activePart").html();
            var ol_class=$("#" + editZoneId).find(".activePart")[0].className;
            var eventName=$("#" + editZoneId).find(".activePart")[0].nodeName;
            $("#" + editZoneId).find(".activePart").parent().parent().replaceWith("<"+eventName+" class='"+ol_class+"'>"+act_content+"</"+eventName+">");
        }
    }
    //文本对齐方式
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
var changeTagName = function (currentNode, targetNodeName) {
    var nodeContent = currentNode.html();
    var nodeClass = currentNode.get(0).className;
    var eventName = currentNode[0].nodeName;
    if(currentNode.parent()[0].nodeName=="DIV"){
        currentNode.replaceWith("<" + targetNodeName + "><li><"+eventName+" class='" + nodeClass + "'>" + nodeContent + "</"+eventName+"></li></" + targetNodeName + ">");
        $("#editZone1").find(".activePart").parent().addClass(nodeClass).removeClass('activePart');
        console.log($("#editZone1").find(".activePart").parent().parent()[0]);
    }
    else if(currentNode.parent()[0].nodeName=="LI") {
        currentNode.parent().parent().replaceWith("<" + targetNodeName + "><li><"+eventName+" class='" + nodeClass + "'>" + nodeContent + "</"+eventName+"></li></" + targetNodeName + ">");
        $("#editZone1").find(".activePart").parent().addClass(nodeClass).removeClass('activePart');
        console.log($("#editZone1").find(".activePart").parent().parent()[0]);
    }
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
var creBtnBox = function (name, addClass) {
    $("<button id='a'>").appendTo("." + addClass);
    $("<p>+</p>").appendTo("#a");
    $("<p></p>").html(name).appendTo("#a");
    $("#a").removeAttr("id");
};
