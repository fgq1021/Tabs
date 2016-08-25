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











