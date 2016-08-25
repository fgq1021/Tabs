/**
 * Created by fgq10 on 2016-06-16.
 */
var H = null;
var topSwitchBox = function (btnNames, h) {
    H = h;
    $(".switchBox").remove();
    $('.head').css("background-color", getHSLA(h, 100, 40)).css("color", getHSLA(h, 100, 40));
    $("<div class='switchBox'>").appendTo(".head");
    $("<div class='switchBar'>").appendTo(".switchBox");
    // $("<div class='switchBtnShadow'>").appendTo(".switchBar");
    $("<div class='switchBtnLine'>").appendTo(".switchBar");
    for (var i = 0; i < 1; i++) {
        $("<button class='left sel'>").html(btnNames[0]).appendTo(".switchBar");
        $("<button class='right'>").html(btnNames[1]).appendTo(".switchBar");
    }
    $(".switchBar").find("button").click(function () {
        $(".switchBar").find("button").removeClass("sel");
        $(this).addClass("sel").attr("style", "");
    })
};

var formatColor = function (color) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var formatedColor = {
        HEX: null,
        rgb: null,
        rgba: null,
        hsl: null,
        hsla: null,
        H: null
    };
    var a = 1;
    if (color.split(",")[3] != null) {
        a = color.split(",")[3].split(")")[0];
    }
    function hslToRgb(h, s, l) {
        var r, g, b;
        h = h / 360;
        s = s / 100;
        l = l / 100;
        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        return [h, s + "%", l + "%"];
    }

    String.prototype.colorHex = function () {
        var that = this;
        if (/^(rgb|RGB)/.test(that)) {
            var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = that;
            }
            return strHex;
        } else if (reg.test(that)) {
            var aNum = that.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return that;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return that;
        }
    };

    if (color.match("rgb") == "rgb") {
        var r = color.match(/\d+/g)[0] * 1;
        var g = color.match(/\d+/g)[1] * 1;
        var b = color.match(/\d+/g)[2] * 1;
        var HSL = rgbToHsl(r, g, b);
        formatedColor.hsl = "hsl(" + HSL[0] + "," + HSL[1] + "," + HSL[2] + ")";
        formatedColor.hsla = "hsla(" + HSL[0] + "," + HSL[1] + "," + HSL[2] + "," + a + ")";
        formatedColor.rgb = "rgb(" + r + "," + g + "," + b + ")";
        formatedColor.rgba = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        formatedColor.HEX = formatedColor.rgb.colorHex();
        formatedColor.H = HSL[0];
    }
    else if (color.match("hsl") == "hsl") {
        var h = color.match(/\d+/g)[0] * 1;
        var s = color.match(/\d+/g)[1] * 1;
        var l = color.match(/\d+/g)[2] * 1;
        var RGB = hslToRgb(h, s, l);
        formatedColor.rgb = "rgb(" + RGB[0] + "," + RGB[1] + "," + RGB[2] + ")";
        formatedColor.rgba = "rgba(" + RGB[0] + "," + RGB[1] + "," + RGB[2] + "," + a + ")";
        formatedColor.hsl = "hsl(" + h + "," + s + "%," + l + "%)";
        formatedColor.hsla = "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
        formatedColor.HEX = formatedColor.rgb.colorHex();
        formatedColor.H = h;
    }
    else if (color.match("#") == "#") {
        formatedColor.HEX = color;
        var sColor = color.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            formatedColor.rgb = "rgb(" + sColorChange.join(",") + ")";
            formatedColor.rgba = "rgba(" + sColorChange.join(",") + ",1)";
            var r = formatedColor.rgb.match(/\d+/g)[0] * 1;
            var g = formatedColor.rgb.match(/\d+/g)[1] * 1;
            var b = formatedColor.rgb.match(/\d+/g)[2] * 1;
            var HSL = rgbToHsl(r, g, b);
            formatedColor.hsl = "hsl(" + HSL[0] + "," + HSL[1] + "," + HSL[2] + ")";
            formatedColor.hsla = "hsla(" + HSL[0] + "," + HSL[1] + "," + HSL[2] + "," + a + ")";
            formatedColor.H = HSL[0];

        }
    }
    return formatedColor;
};


var getHSLA = function (h, s, l, a) {
    if (a != null) {
        return "hsla(" + h + "," + s + "%," + l + "%," + a + ")";
    }
    else if (a == null) {
        return formatColor("hsl(" + h + "," + s + "%," + l + "%,)").HEX;

    }
};