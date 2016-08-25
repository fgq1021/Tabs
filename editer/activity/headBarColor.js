/**
 * Created by lidazongguan on 16/7/5.
 */
var pageStart = function () {
    topSwitchBox(["查看", "编辑"], 0);
    hslBox(60, 10, $('.head'), $('.head'));
    var startTime = {
        name: "开始时间",
        dateTime: "2014-05-21 08:00:00",
        type: "startTime"
    };
    var time2 = {
        name: "进行中呀",
        dateTime: "2016-10-22 12:00:00",
        type: "now",
        note: "   "
    };
    var endTime = {
        name: "结束时间",
        dateTime: "2016-12-21 23:00:00",
        type: "endTime"
    };
    var times = [startTime, time2, endTime];
    creTimeModule(times);
    hslBox2(60, 10, $('.now'), $("#TimeModule"));
    hslBoxPopAndTitle(60, 10, $('.dataBox'), $("#populationMudule0"));
    hslBox2(60, 10, $('.level1'), $("#populationMudule1"));
    hslBox2(60, 10, $('.level2'), $("#populationMudule2"));
    $("#allDataBtn").click(function () {
        $('#allData').val($("body").get(0).innerHTML);
    })
};

// classname
var hslBox = function (hppi, ppi, what, boxLocation) {
    var creID = what.attr("class");
    // boxLocation.after("<div class='colorBar' id='" + what.attr("class") + "'>");
    boxLocation.after("<div class='colorBar' id='" + creID + "'>");
    $('#' + creID).css("height", 100 * 34 / ppi);
    for (var i = 0; i < 360 / hppi; i++) {
        $('<div class="colorBox">').attr("id", "h" + i).css("width", 100 * 34 / ppi).appendTo('#' + creID);
        for (var l = 0; l < 100 / ppi; l++) {
            for (var s = 0; s < 100 / ppi; s++) {
                console.log(i);
                $('<div class="colorDot">').click(function () {
                    console.log($(this).css("background-color"));
                    what.css("background-color", $(this).css("background-color")).css("color", $(this).css("background-color")).attr("id", $(this).attr("id"));
                    $(this).removeClass("active");
                }).css("background-color", "hsl(" + i * hppi + "," + s * ppi + "%," + l * ppi + "%)").attr("id", "h" + i * hppi + "s" + s * ppi + "l" + l * ppi).appendTo(".colorBox" + "#h" + i);
            }
        }
    }
    what.click(function () {
        $('#' + creID).find('#' + $(this).attr("id")).addClass("active");
    })
};

// classname2
var hslBox2 = function (hppi, ppi, what, boxLocation) {
    var creID = what.attr("class").split(" ")[1];
    // boxLocation.after("<div class='colorBar' id='" + what.attr("class") + "'>");
    boxLocation.after("<div class='colorBar' id='" + creID + "'>");
    $('#' + creID).css("height", 100 * 34 / ppi);
    for (var i = 0; i < 360 / hppi; i++) {
        $('<div class="colorBox">').attr("id", "h" + i).css("width", 100 * 34 / ppi).appendTo('#' + creID);
        for (var l = 0; l < 100 / ppi; l++) {
            for (var s = 0; s < 100 / ppi; s++) {
                console.log(i);
                $('<div class="colorDot">').click(function () {
                    console.log($(this).css("background-color"));
                    what.css("background-color", $(this).css("background-color")).css("color", $(this).css("background-color")).attr("id", $(this).attr("id"));
                    $(this).removeClass("active");
                }).css("background-color", "hsl(" + i * hppi + "," + s * ppi + "%," + l * ppi + "%)").attr("id", "h" + i * hppi + "s" + s * ppi + "l" + l * ppi).appendTo(".colorBox" + "#h" + i);
            }
        }
    }
    what.click(function () {
        $('#' + creID).find('#' + $(this).attr("id")).addClass("active");
    })
};
// hslBoxPopAndTitle
var hslBoxPopAndTitle = function (hppi, ppi, what, boxLocation) {
    var creID = what.attr("class").split(" ")[1];
    // boxLocation.after("<div class='colorBar' id='" + what.attr("class") + "'>");
    boxLocation.after("<div class='colorBar' id='" + creID + "'>");
    $('#' + creID).css("height", 100 * 34 / ppi);
    for (var i = 0; i < 360 / hppi; i++) {
        $('<div class="colorBox">').attr("id", "h" + i).css("width", 100 * 34 / ppi).appendTo('#' + creID);
        for (var l = 0; l < 100 / ppi; l++) {
            for (var s = 0; s < 100 / ppi; s++) {
                console.log(i);
                $('<div class="colorDot">').click(function () {
                    console.log($(this).css("background-color"));
                    what.css("background-color", $(this).css("background-color")).css("color", $(this).css("background-color")).attr("id", $(this).attr("id"));
                    $(".title").css("background-color", $(this).css("background-color")).css("color", $(this).css("background-color")).attr("id", $(this).attr("id"));
                    $(this).removeClass("active");
                }).css("background-color", "hsl(" + i * hppi + "," + s * ppi + "%," + l * ppi + "%)").attr("id", "h" + i * hppi + "s" + s * ppi + "l" + l * ppi).appendTo(".colorBox" + "#h" + i);
            }
        }
    }
    what.click(function () {
        $('#' + creID).find('#' + $(this).attr("id")).addClass("active");
    })
};


var rgbBox = function (ppi) {
    $('.colorBox').css("width", 255 * 5 / ppi);
    for (var r = 0; r < 255 / ppi; r++) {
        for (var g = 0; g < 255 / ppi; g++) {
            for (var b = 0; b < 255 / ppi; b++) {
                console.log(r + g + b);
                $('<div class="colorDot">').css("background-color", "rgb(" + r * ppi + "," + g * ppi + "," + b * ppi + ")").appendTo(".colorBox");

            }
        }
    }
};

$(document).ready(pageStart());