/**
 * Created by fgq10 on 2016-06-16.
 */
var pageStart = function () {
    topSwitchBox(btnNames, location.href.split("?")[1]);
    newli(1, 123165431, "http://img1.gamersky.com/image2016/07/20160701_djy_248_4/gamersky_01small_02_2016711637A75.jpg", "外媒报道《守望先锋》收录中国见义勇为大学生：缅怀英雄", "作者:Byron", 1);
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
    crePopulationModule([20000, 15000, 5000]);
    // console.log($('.head').css("color"));
    // console.log(formatColor($('.head').css("color")));
    // console.log(formatColor("rgba(0, 178, 255, 0.78)"));
    // console.log(formatColor("hsla(198, 100%, 50%, 0.78)"));
    console.log(formatColor("#5F00CC"));
    // console.log(getHSLA(198, 80, 50));
    // console.log(getHSLA(198, 80, 50, 0.5));
    mainBodyEditZone("editZone1");
    if(localStorage['editZone1']){
        //console.log(localStorage['editZone1']);
        editZone1.innerHTML=localStorage['editZone1'];
     }
    fillBtnBox("addBarBottom");
};
var btnNames = ["查看", "编辑"];
// 目前只支持两个按钮
var titleData = {
    id: "13133",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/0c54c537707083.5749845080083.jpg",
    title: "什么样的李杨才是最逗比的李杨，周末揭晓",
    author: "Byron"
};
/*var json='[{"class":"textBig"},{"class":"textLit"}]';
 var result=eval(json);
 console.log(result);*/
/*var json='{"textSize1":"addClass=textBig","textSize2":"addClass=textLit"}';
var result=JSON.parse(json);
var control=location.href.split("?")[1];
console.log(result,control);
if(result.textSize1 == control){
    var targetPart=$("#editZone1").find('.activePart');
    targetPart.addClass("textBig");
}*/
$(document).ready(pageStart);