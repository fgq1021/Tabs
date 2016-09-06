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
        // IE下,event对象有srcElement属性,但是没有target属性;Firefox下,event对象有target属性,但是没有srcElement属性.但他们的作用是相当的
        verifyTool(activePart, id);
    });
    document.onselectionchange = function () {
        // console.log(window.getSelection().anchorNode,typeof  window.getSelection().anchorNode);
        if (window.getSelection().anchorNode != null) {
            if (activePart != window.getSelection().anchorNode.parentNode && window.getSelection().anchorNode.nodeName == "#text") {
                activePart = window.getSelection().anchorNode.parentNode;
                verifyTool(activePart, id);
                $("#" + id).find('.activePart').removeClass("activePart");
                $(activePart).addClass("activePart");
            }
            else if (activePart != window.getSelection().anchorNode && window.getSelection().anchorNode.nodeName != "#text") {
                activePart = window.getSelection().anchorNode;
                verifyTool(activePart, id);
                $("#" + id).find('.activePart').removeClass("activePart");
                $(activePart).addClass("activePart");
            }
            var message = $('#editZone1').html();
            window.localStorage.setItem('editZone1', message);
        }
        /*if ((activePart != window.getSelection().anchorNode.parentNode && window.getSelection().anchorNode.parentNode != $('#' + id).get(0)) || activePart.clientHeight != activePartHeight) {
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
        console.log($(document).scrollTop(), $('.toolBoxInline').get(0).offsetTop,$('#' + id).get(0).offsetTop);
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
            console.log("第一段已经删除");
        }
        else if ($(this).children().eq(0).html() == "<br>" && $(this).children().eq(0).get(0).tagName == "DIV") {
            if ((event.keyCode == 8)) {
                event.keyCode = 0;
                event.returnValue = false;
                console.log("替换元素");
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
    if (thisPart.parentElement.id == editZoneId || thisPart.parentElement.parentElement.id == editZoneId) {
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
    //console.log(partAttribute,$("#" + editZoneId).find(".activePart")[0]);
    textReplace();
    fillToolBar("../../userPage/css/toolBarImg/text-sizeBig.png", "normal", "大号", "textBig", textSize);
    fillToolBar("../../userPage/css/toolBarImg/text-sizeLit.png", "normal", "中号", "textLit", textSize);
    fillToolBar("../../userPage/css/toolBarImg/text-size.png", "normal", "", "text", textSize);
    fillToolBar("../../userPage/css/toolBarImg/text-left.png", "normal", "", "textleft", textPosition);
    fillToolBar("../../userPage/css/toolBarImg/text-center.png", "normal", "居中", "textcenter", textPosition);
    fillToolBar("../../userPage/css/toolBarImg/text-right.png", "normal", "居右", "textright", textPosition);
    fillToolBar("../../userPage/css/toolBarImg/text-noList.png", "normal", "", "textnoList", textList);
    fillToolBar("../../userPage/css/toolBarImg/text-list.png", "normal", "无序", "textlist", textList);
    fillToolBar("../../userPage/css/toolBarImg/text-numList.png", "normal", "有序", "textnumList", textList);
    fillToolBar("../../userPage/css/toolBarImg/text-noindent.png", "normal", "", "textnoindent", textIndent);
    fillToolBar("../../userPage/css/toolBarImg/text-indent.png", "normal", "引用", "textindent", textIndent);
    fillToolBar("../../userPage/css/toolBarImg/text-bigindent.png", "normal", "缩进", "textbigindent", textIndent);
    if (partAttribute.match("textindent") == "textindent") {
        $("#" + editZoneId).parent().find('.toolBar').find('#textindent').show();
    }
    else  if(partAttribute.match("textbigindent") == "textbigindent"){
        $("#" + editZoneId).parent().find('.toolBar').find('#textbigindent').show();
    }
    else{
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
    if (currentNode[0].nodeName == "P") {
        //如果当前节点的兄弟元素节点名字是p的话则执行
        if (!currentNode.siblings().nodeName) {
            var nodeContent = currentNode.html();
            currentNode.replaceWith("<" + targetNodeName + "><li class='" + nodeClass + "'>" + nodeContent + "</li></" + targetNodeName + ">");
        }
    }
    //如果当前选中的元素节点名字是li的话则
    else {
        var nodeContent = currentNode.parent().html();
        //console.log(nodeContent);
        currentNode.parent().replaceWith("<" + targetNodeName + ">" + nodeContent + "</" + targetNodeName + ">");
        $("#editZone1").find('.activePart').siblings().addClass("textnumList").removeClass("textlist");
        /*$("#editZone1").parent().find('.focustest').focus();*/
        //focus函数括号里面不写函数，表示获取焦点；括号里面写函数表示当获取焦点后执行焦点里面的内容
    }
};
//文本字体大小控制函数
var textSize = function (whichBtn) {
    var editZone = $(whichBtn).parent().parent().parent();
    var targetPart = $(whichBtn).parent().parent().parent().find(".activePart");
    if (whichBtn.id == "text") {
        targetPart.addClass("textBig");
        editZone.find("#text").hide();
        editZone.find("#textBig").show();
        noCoexist();
        undockClass();
    }
    else if (whichBtn.id == "textBig") {
        targetPart.addClass("textLit").removeClass("textBig");
        editZone.find("#textBig").hide();
        editZone.find("#textLit").show();
        undockClass();
    }
    else if (whichBtn.id == "textLit") {
        targetPart.removeClass("textLit");
        editZone.find("#textLit").hide();
        editZone.find("#text").show();
        undockClass();
    }
};
//若当前元素是li的话，若点击字体大小控制按钮时候，会变成段落模式(文本class与序列class不共存)
var noCoexist=function(){
    var targetPart=$("#editZone1").find('.activePart');
    var targetPart_class=$("#editZone1").find('.activePart').attr('class');
    var targetPart_content=$("#editZone1").find('.activePart').html();
    //如果序列内容只有一项
    if(targetPart[0].nodeName == 'LI'&&targetPart.siblings().length == 0){
        var li_content=targetPart.html();
        var li_class=targetPart[0].className;
        targetPart.parent().replaceWith('<p class="'+li_class+'">'+li_content+'</p>');
        //console.log(targetPart.parent()[0].nodeName,$("#editZone1").find('.activePart'));
        if(targetPart.parent()[0].nodeName == 'UL'){
            $("#editZone1").find('.activePart').removeClass('textlist');
        }
        else{
            $("#editZone1").find('.activePart').removeClass('textnumList');
        }
    }
    //如果序列内容不只有一项
    else if(targetPart[0].nodeName == 'LI'&&targetPart.siblings().length > 0){
        var li_length=targetPart.parent().find('li').length;
        var act_index=targetPart.parent().find('li').index(targetPart);//输出的是选中元素在li中的下标
        // 如果是第一个元素，则要替换的文本换成p元素，其他内容仍然是序列标签
        if(act_index == 0){
            targetPart.parent().before('<p class="'+targetPart_class+'">'+targetPart_content+'</p>');
            for(var i=1,previous_str='';i<li_length;i++){
                var previous_content = targetPart.parent().find('li')[i].innerText;
                var previous_class = targetPart.parent().find('li')[i].className;
                previous_str += "<li class='"+previous_class+"'>"+previous_content+"</li>";
            }
            if(targetPart.parent()[0].nodeName == 'OL'){
                $("#editZone1").find('.activePart').removeClass('textnumList');
                $("#editZone1").find('.activePart+ol').replaceWith('<ol>'+previous_str+'</ol>');
            }
            else if(targetPart.parent()[0].nodeName == 'UL'){
                $("#editZone1").find('.activePart').removeClass('textlist');
                $("#editZone1").find('.activePart+ul').replaceWith('<ul>'+previous_str+'</ul>');
            }
        }
        //如果是最后一个元素，则要替换的文本换成p元素，其他内容仍然是序列标签
        else if(li_length == (act_index+1)){
            targetPart.parent().after('<p class="'+targetPart_class+'">'+targetPart_content+'</p>');
            targetPart.remove();
            var act_nodeName=$("#editZone1").find('.activePart').prev()[0].nodeName;
            if(act_nodeName=='OL'){
                $("#editZone1").find('.activePart').removeClass('textnumList');
            }
            else if(act_nodeName=='UL'){
                $("#editZone1").find('.activePart').removeClass('textlist');
            }
            /*for(var i=0,finally_str='';i<li_length-1;i++){
                var finally_content = targetPart.parent().find('li')[i].innerText;
                var finally_class = targetPart.parent().find('li')[i].className;
                finally_str += "<li class='"+finally_class+"'>"+finally_content+"</li>>";
            }
            console.log(finally_str);*/
        }
        //否则选中文本不是序列的边缘，替换文本换成p标签，其余内容会生成2个序列
        else{
            for(var i=0,middle_str='';i<act_index;i++){
                var middle_content = targetPart.parent().find('li')[i].innerText;
                var middle_class = targetPart.parent().find('li')[i].className;
                middle_str += "<li class='"+middle_class+"'>"+middle_content+"</li>";
            }
             for(var i=act_index+1,center_str='';i<li_length;i++){
                var center_content = targetPart.parent().find('li')[i].innerText;
                var center_class = targetPart.parent().find('li')[i].className;
                center_str += "<li class='"+center_class+"'>"+center_content+"</li>";
            }
            if(targetPart.parent()[0].nodeName == 'OL'){
                targetPart.parent().before('<ol>'+middle_str+'</ol>');
                targetPart.parent().after('<ol>'+center_str+'</ol>');
                targetPart.parent().after('<p class="'+targetPart_class+'">'+targetPart_content+'</p>');
                targetPart.parent().next().removeClass('textnumList');
                targetPart.parent().remove();
            }
            else if(targetPart.parent()[0].nodeName == 'UL'){
                targetPart.parent().before('<ul>'+middle_str+'</ul>');
                targetPart.parent().after('<ul>'+center_str+'</ul>');
                targetPart.parent().after('<p class="'+targetPart_class+'">'+targetPart_content+'</p>');
                targetPart.parent().next().removeClass('textlist');
                targetPart.parent().remove();
            }
        }
    }
};
//若选中的元素是li则要进行同步替换
var synchronousReplace=function(){
    var targetPart=$("#editZone1").find(".activePart");
    //console.log(targetPart[0],targetPart.attr('class'),targetPart[0].nodeName);
    if(targetPart[0].nodeName=='LI'&&targetPart.siblings().length>0){
        targetPart.siblings().attr('class','').addClass(targetPart.attr('class')).removeClass('activePart');
    }
};
//文本序列列表
var textList = function (whichBtn) {
    var editZone = $(whichBtn).parent().parent().parent();//编辑区域
    var targetPart = $(whichBtn).parent().parent().parent().find(".activePart");//编辑区选中的部分
    if (whichBtn.id == "textnoList") {
        targetPart.addClass("textlist");
        editZone.find("#textnoList").hide();
        editZone.find("#textlist").show();
        changeTagName($("#editZone1").find(".activePart"), "ul");
        deleteClass();
        //情况是该选中的元素已经是个序列
        combineContent('UL');
    }
    else if (whichBtn.id == "textlist") {
        targetPart.addClass("textnumList").removeClass("textlist");
        editZone.find("#textlist").hide();
        editZone.find("#textnumList").show();
        changeTagName($("#editZone1").find(".activePart"), "ol");
        deleteClass();
        combineContent('OL');
    }
    else if (whichBtn.id == "textnumList") {
        targetPart.removeClass("textnumList");
        editZone.find("#textnumList").hide();
        editZone.find("#textnoList").show();
        if (targetPart[0].nodeName == "LI") {
            var act_content = targetPart.parent()[0].innerText;
            var length = targetPart.parent().find('li').length;
            var ol_class = $("#editZone1").find(".activePart")[0].className;
            for (var i = 0, li_content = [], li_class = []; i < length; i++) {
                li_content[i] = targetPart.parent().find('li')[i].innerText;
                li_class[i] = targetPart.parent().find('li')[i].className;
                //$(targetPart.parent().find('li')[i]).replaceWith("<p class='"+li_class[i]+"'>"+li_content[i]+"</p>");
            }
            $("#editZone1").find(".activePart").parent().empty();
            for (var i = 0, str = ''; i < li_content.length; i++) {
                str += "<p class='" + li_class[i] + "'>" + li_content[i] + "</p>";
            }
            $("#editZone1").find("ol:empty").replaceWith(str);
            $("#editZone1").find('.activePart').siblings().removeClass("textnumList");
        }
    }
};
//合并列表文本
var combineContent=function(targetName){
    //若该选中元素只有上一个兄弟元素为序列模式
    var active=$("#editZone1").find(".activePart");
    var active_content=active.parent().html();
    /*console.log(active_content,active.parent().prev()[0]);*/
    //如果前面没有元素，后面有元素
    if(active.parent().prev()[0] == undefined&&active.parent().next()[0]!=undefined){
        if(active.parent().next()[0].nodeName==targetName){
            active.parent().next().prepend(active_content);
            /*console.log('与下面的列表合并',active[0]);*/
            active.parent().remove();
        }
    }
    //如果后面没有元素，前面有元素
    else if(active.parent().next()[0] == undefined&&active.parent().prev()[0] != undefined){
        if(active.parent().prev()[0].nodeName==targetName){
            active.parent().prev().append(active_content);
            /*console.log('与上面的列表合并',active[0]);*/
            active.parent().remove();
        }
    }
    //如果前面后面都有内容：两种情况：一种两个列表合并；另一种三个列表合并
    else if(active.parent().prev()[0] != undefined&&active.parent().next()[0] != undefined){
        //若选中的元素可合并1个，另种情况：和上面合并 和下面合并
        if(active.parent().prev()[0].nodeName==targetName&&active.parent().next()[0].nodeName!=targetName){
            active.parent().prev().append(active_content);
            console.log('与上面的列表合并',active[0]);
            active.parent().remove();
        }
        else if(active.parent().prev()[0].nodeName!=targetName&&active.parent().next()[0].nodeName==targetName){
            active.parent().next().prepend(active_content);
            /*console.log('与下面的列表合并',active[0]);*/
            active.parent().remove();
        }
        //若该选中元素负级的上一个兄弟元素以及下一个兄弟元素都是序列，三个序列都能合并
        else if(active.parent().prev()[0].nodeName==targetName&&active.parent().next()[0].nodeName==targetName){
            /*console.log('与上面下面列表均合并');*/
            active.parent().prev().append(active_content);
            active.parent().prev().append(active.parent().next().html());
            active.parent().next().remove();
            $("#editZone1").find(".activePart").parent().next().remove();
        }
    }
};
//进入序列列表模式时，将其他class属性去掉
var deleteClass=function(){
    var targetPart=$("#editZone1").find(".activePart");
    var partAttribute=targetPart.attr('class');
    if(partAttribute.match("textBig") == "textBig"){
        targetPart.removeClass('textBig');
    }
    else if(partAttribute.match("textLit") == "textLit"){
        targetPart.removeClass('textLit');
    }
    else if(partAttribute.match("textindent") == "textindent"){
        targetPart.removeClass('textindent');
    }
    else if(partAttribute.match("textbigindent") == "textbigindent"){
        targetPart.removeClass('textbigindent');
    }
    else if(partAttribute.match("textright") == "textright"){
        targetPart.removeClass('textright');
    }
    else if(partAttribute.match("textcenter") == "textcenter"){
        targetPart.removeClass('textcenter');
    }
};
//切换到引用模式时，将其他class属性去掉
var removeClass=function(){
    var targetPart=$("#editZone1").find(".activePart");
    var partAttribute=targetPart.attr('class');
    if(partAttribute.match("textBig") == "textBig"){
        targetPart.removeClass('textBig');
    }
    else if(partAttribute.match("textLit") == "textLit"){
        targetPart.removeClass('textLit');
    }
    else if(partAttribute.match("textright") == "textright"){
        targetPart.removeClass('textright');
    }
    else if(partAttribute.match("textcenter") == "textcenter"){
        targetPart.removeClass('textcenter');
    }
};
//切换到标题模式时，将其他class属性去掉
var undockClass=function(){
    var targetPart=$("#editZone1").find(".activePart");
    var partAttribute=targetPart.attr('class');
    if(partAttribute.match("textindent") == "textindent"){
        targetPart.removeClass('textindent');
    }
    else if(partAttribute.match("textbigindent") == "textbigindent"){
        targetPart.removeClass('textbigindent');
    }
    else if(partAttribute.match("textright") == "textright"){
        targetPart.removeClass('textright');
    }
    else if(partAttribute.match("textcenter") == "textcenter"){
        targetPart.removeClass('textcenter');
    }
};
//切换到文本位置模式，将其他模式的class属性去掉
var discardClass=function(){
    var targetPart=$("#editZone1").find(".activePart");
    var partAttribute=targetPart.attr('class');
    if(partAttribute.match("textindent") == "textindent"){
        targetPart.removeClass('textindent');
    }
    else if(partAttribute.match("textbigindent") == "textbigindent"){
        targetPart.removeClass('textbigindent');
    }
    else if(partAttribute.match("textBig") == "textBig"){
        targetPart.removeClass('textBig');
    }
    else if(partAttribute.match("textLit") == "textLit"){
        targetPart.removeClass('textLit');
    }
};
//文本居中方式
var textPosition = function (whichBtn) {
    var editZone = $(whichBtn).parent().parent().parent();//编辑区域
    var targetPart = $(whichBtn).parent().parent().parent().find(".activePart");//编辑区选中的部分
    if (whichBtn.id == "textleft") {
        targetPart.addClass("textright");
        editZone.find("#textleft").hide();
        editZone.find("#textright").show();
        noCoexist();
        discardClass();
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
//文本首行缩进
var textIndent = function (whichBtn) {
    var editZone = $(whichBtn).parent().parent().parent();//编辑区域
    var targetPart = $(whichBtn).parent().parent().parent().find(".activePart");//编辑区选中的部分
    if (whichBtn.id == "textnoindent") {
        targetPart.addClass("textindent");
        editZone.find("#textnoindent").hide();
        editZone.find("#textindent").show();
        noCoexist();
        removeClass();
    }
    else if(whichBtn.id == "textindent"){
        targetPart.addClass("textbigindent").removeClass("textindent");
        editZone.find("#textindent").hide();
        editZone.find("#textbigindent").show();
        removeClass();
    }
    else if (whichBtn.id == "textbigindent") {
        targetPart.removeClass("textbigindent");
        editZone.find("#textbigindent").hide();
        editZone.find("#textnoindent").show();
        removeClass();
    }
};
//有序列表之后回车产生的div用p替换
var textReplace =function(){
    /*if($("#editZone1").find("div")[0]){
        console.log('div标签名字可以替换');
        $("#editZone1").find("div").replaceWith('<p><br></p>');
    }
    else */if($("#editZone1").find("div.activePart")[0]){
        console.log($("#editZone1").find("div.activePart")[0]);
        if($("#editZone1").find("div.activePart")[0].innerHTML=='<br>'){
            console.log('div.activePart标签名字可以替换');
            $("#editZone1").find("div.activePart").replaceWith('<p><br></p>');
        }
    }
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
