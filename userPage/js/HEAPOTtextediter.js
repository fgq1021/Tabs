/**
 * Created by jia on 2016/8/25.
 */
var mainBodyEditZone = function (id) {
    $('#' + id).attr("contenteditable", "true");
    $('#' + id).after("<input class='focustest'>");
    var activePart = $('.activePart').get(0);
    var activePartHeight = 0;
    $('#' + id).click(function (e) {
        activePart = event.srcElement;//获取事件的目标元素
        //console.log(e.target);
        verifyTool(activePart, id);
    });
    document.onselectionchange = function () {
        console.log(window.getSelection().anchorNode,typeof  window.getSelection().anchorNode);
        if(window.getSelection().anchorNode!=null){
            console.log(window.getSelection().anchorNode.nodeName);
            if(window.getSelection().anchorNode.nodeName=='#text'){
                activePart = window.getSelection().anchorNode.parentNode;
                verifyTool(activePart, id);
            }
        }
        /*activePart = window.getSelection().anchorNode.parentNode;
        verifyTool(activePart, id);
        if ((activePart != window.getSelection().anchorNode.parentNode && window.getSelection().anchorNode.parentNode != $('#' + id).get(0)) || activePart.clientHeight != activePartHeight) {
             activePart = window.getSelection().anchorNode.parentNode;
             verifyTool(activePart, id);
        }
        if (window.getSelection().anchorNode.parentNode == $('#' + id).get(0)) {
            $("#" + id).find('.activePart').removeClass("activePart");
            $(activePart).addClass("activePart");
         }
         activePartHeight = activePart.clientHeight;*/
    };
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
        //console.log($(this).children().eq(0).get(0).tagName);
        if ($(this).children().eq(0).html() == "<br>" && $(this).children().eq(0).get(0).tagName != "DIV") {
            if ((event.keyCode == 8)) {
                event.keyCode = 0;
                event.returnValue = false;
            }
            //console.log("第一段已经删除");
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
        //console.log(event.keyCode + "keydown");
        $("<p>").html("keydown" + iii()).prependTo("#logBox");
    });
    $('#' + id).keyup(function () {
        //console.log(event.keyCode + "keyup");
        $("<p>").html("keyup" + iii()).prependTo("#logBox");
    });
    $('#' + id).keypress(function () {
        //console.log(event.keyCode + "keypress");
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
var creTextTool = function (id, editZoneId, top) {
    creToolBox(id, editZoneId, top);
    var partAttribute = $("#" + editZoneId).find(".activePart").attr('class');
    //console.log(partAttribute);
    fillToolBar("../../userPage/css/toolBarImg/text-sizeBig.png", "normal", "大号", "textBig", textSize);
    fillToolBar("../../userPage/css/toolBarImg/text-sizeLit.png", "normal", "小号", "textLit", textSize);
    fillToolBar("../../userPage/css/toolBarImg/text-size.png", "normal", "", "text", textSize);
    fillToolBar("../../userPage/css/toolBarImg/text-left.png", "normal", "", "textleft",textPosition);
    fillToolBar("../../userPage/css/toolBarImg/text-center.png", "normal", "居中", "textcenter",textPosition);
    fillToolBar("../../userPage/css/toolBarImg/text-right.png", "normal", "居右", "textright",textPosition);
    fillToolBar("../../userPage/css/toolBarImg/text-noList.png", "normal", "", "textnoList",textList);
    fillToolBar("../../userPage/css/toolBarImg/text-list.png", "normal", "无序", "textlist",textList);
    fillToolBar("../../userPage/css/toolBarImg/text-numList.png", "normal", "有序", "textnumList",textList);
    fillToolBar("../../userPage/css/toolBarImg/text-noindent.png", "normal", "", "textnoindent",textIndent);
    fillToolBar("../../userPage/css/toolBarImg/text-indent.png", "normal", "缩进", "textindent",textIndent);
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
var changeTagName = function (currentNode, targetNodeName) {
    var nodeClass = currentNode.get(0).className;
    if(currentNode[0].nodeName=="P"){
        //如果当前节点的兄弟元素节点名字是p的话则执行
        if(!currentNode.siblings().nodeName){
            var nodeContent = currentNode.html();
            currentNode.replaceWith("<" + targetNodeName + "><li class='" + nodeClass + "'>" + nodeContent + "</li></" + targetNodeName + ">");
        }
    }
    //如果当前选中的元素节点名字是li的话则
    else{
        var nodeContent = currentNode.parent().html();
        //console.log(nodeContent);
        currentNode.parent().replaceWith("<" + targetNodeName + ">" + nodeContent + "</" + targetNodeName + ">");
        //console.log($("#editZone1").parent().find('.focustest')[0]);
        /*$("#editZone1").find(".activePart").blur(function(){
            console.log('先失去焦点');
            $("#editZone1").parent().find('.focustest').focus(function(){
                console.log('获取焦点');
            });
        });*/
        $("#editZone1").parent().find('.focustest').focus();
        //$("#editZone1").find(".activePart").focus();不起作用，获取不到
        //focus函数括号里面不写函数
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
        var activePart = $(this).parent().parent().parent().find('.activePart').get(0);//找到选中的段落
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
        changeTagName($("#editZone1").find(".activePart"),"ul");
    }
    else if (whichBtn.id == "textlist") {
        targetPart.addClass("textnumList").removeClass("textlist");
        editZone.find("#textlist").hide();
        editZone.find("#textnumList").show();
        changeTagName($("#editZone1").find(".activePart"),"ol");
    }
    else if (whichBtn.id == "textnumList") {
        targetPart.removeClass("textnumList");
        editZone.find("#textnumList").hide();
        editZone.find("#textnoList").show();
        if($("#editZone1").find(".activePart")[0].nodeName!=="P"){
            var act_content=$("#editZone1").find(".activePart").parent()[0].innerText;
            //console.log(act_content);
            var length=$("#editZone1").find("ol>li").length;
            //console.log(length);
            var ol_class=$("#editZone1").find(".activePart")[0].className;
            for(var i=0,li_content=[],li_class=[];i<length;i++){
                li_content[i]=$("#editZone1").find("ol>li")[i].innerText;
                //console.log(li_content[i]);
                li_class[i]=$("#editZone1").find("ol>li")[i].className;
                //console.log(li_class[i]);
                //$($("#" + editZoneId).find("ol>li")[i]).replaceWith("<p class='"+li_class+"'>"+li_content+"</p>");
            }
            //console.log(li_content,li_content.length);
            $("#editZone1").find(".activePart").parent().empty();
            for(var i=0,str='';i<li_content.length;i++){
                str+="<p class='"+li_class[i]+"'>"+li_content[i]+"</p>";
            }
            //console.log(str);
            $("#editZone1").find("ol").replaceWith(str);
            //$("#" + editZoneId).find(".activePart").parent().replaceWith("<p class='"+ol_class+"'>"+act_content+"</p>");
        }
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