var nowPage = 0;//当前页
var changePage = null;//选择第几页
myBrowser()
$(document).ready(function () {
    boot();
})
//检测ie版本
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE浏览器
    if (isIE) {
        var IE5 = IE6 = IE7 = IE8 =IE9=false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE5 = fIEVersion == 5.0;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        IE9 = fIEVersion == 9.0;
        if (IE5) {
            return IE5;
        }
        if (IE6) {
            return IE6;
        }
        if (IE7) {
            return IE7;
        }
        if (IE8) {
            return IE8;
        }
        if (IE9) {
            return IE9;
        }
    }//isIE end
}
//以下是调用上面的函数
var value = myBrowser();
if (value <= 9.0) {
    alert("您的浏览器版本过旧," + '\n' +"有些效果可能无法正常显示," + '\n' +"建议在新版本浏览器观看")
}
//初始化
function boot() {
    //侧边栏隐藏显示
    $('.slide').mouseenter(function () {
        //var $Obj = $(this)
        $('#sidebar').css('display', 'block')
        setTimeout(function () {
            $('.light').css('opacity', 1)
        }, 1000)
        skillsShow()
        $('#sidebar').mouseleave(function () {
            $('.skills div').css({'width': 0})
            $('#sidebar').css('display', 'none')
            $('.light').css('opacity', 0)
        })
    })
    $('.wrap').removeClass('animation')
    if (nowPage != 0) {
        setTimeout(function () {
            $('#head').css('display', 'block')
        }, 300)
    }
    else {
        $('#head').css('display', 'none')

    }
    if (nowPage != 1) {
        $('#main .temp li').css('transition', 'none')
        $('.temp li:odd').css({'transform': 'translate(0,0)'})
        $('.temp li:even').css({'transform': 'translate(-104%,0)'})
    }
    else {
        $('#main .temp li').css('transition', 'transform 2s, width 2s linear')
    }
    switch (nowPage) {
        case 0:
            page1();
            break;
        case 1:
            page2();
            break;
        case 2:
            page3();
            break;
        case 3:
            page4();
            break;
        default:
            return false
    }
    function page1() {
        var i = 3;
        clock()
        function clock() {
            if (nowPage != 0) return false
            else {
                $('#section1 div').text(i)
                $('#section1 div').css({transform: 'scale(1.3,1.3)', opacity: 0.3})
                var timer = setTimeout(function () {
                    $('#section1 div').css({transform: 'scale(1,1)', opacity: 1})
                }, 500)
                i -= 1;
                if (i === -1) {
                    clearTimeout(timer)
                    changePage = 1;
                    selectPage($('section'))
                    return false;
                }
                setTimeout(clock, 1000)
            }
        }

    }
    function page2() {
        setTimeout(contactShow, 1000)
    }
    function page3() {
        var originalText = $('#section3 p:eq(0)').text()
        var i = 0;
        text()
        function text() {
            if (nowPage != 2) {
                $('#section3 p:eq(0)').text(originalText)
                return false
            }
            var nowText = $('#section3 p').text()
            $('#section3 p').text(nowText + '.')
            i += 1;
            if (i >= 7) {
                $('#section3 p:eq(0)').text(originalText)
                i = 0;
            }
            setTimeout(text, 500)
        }

        canvas()
    }
    function page4() {
        $('.wrap').addClass('animation')
        $('.wrap').css('animation')
    }
}
//侧边栏技能动画
function skillsShow() {
    var i = null;
    var arrDivStyle = [180, 170, 140, 150]
    for (i = 0; i < 4; i++) {
        $('.skills div').eq(i).animate({'width': arrDivStyle[i]}, 1000)
    }
}
//时间轴
function contactShow() {
    $('.sport p').hide()
    $('.sport p:even').css({'border': '4px solid #8ee5e4', 'border-radius': '50% 50%'})
    $('.sport p:odd').css({'height': 0})
    var i = 0;
    start()
    function start() {
        if (nowPage != 1) {
            return false
        } else {
            $('.sport p:even').eq(i).show()
            $('.sport p:odd').eq(i).show()
            $('.sport p:odd').eq(i).css({'border': '0.5px solid #8ee5e4'})
            $('.sport p:odd').eq(i).animate({'height': 98}, 2000)
            textShow(i)
            i += 1;
            if (nowPage != 1) {
                return false
            }
            setTimeout(start, 2000)
        }
    }

    function textShow(eve) {
        if (eve % 2 === 0)
            $('.temp li').eq(eve).css({'transform': 'translate(-200%,0)'})
        else {
            $('.temp li').eq(eve).css({'transform': 'translate(100%,0)'})
        }
    }
}
//圆形比例动画
function canvas() {
    selectCanvas(0, 80, '#30bae7')
    selectCanvas(1, 75, '#d74680')
    selectCanvas(2, 70, '#15c7a8')
    selectCanvas(3, 74, '#eb7d4b')
    function selectCanvas(i, proportion, color) {
        var obj = $('canvas')[i].getContext('2d'),
            rad = Math.PI * 2 / 100,
            speed = 1,
            judge = null;
        $('canvas')[i].width = 1000;
        $('canvas')[i].height = 200;
        obj.lineWidth = 14;
        obj.clearRect(0, 0, 1000, 200);
        obj.strokeStyle = color;
        obj.fillStyle = color;
        obj.fill();
        obj.globalCompositeOperation = "destination-atop";
        setTimeout(draw(i, proportion), 500)
        function draw(i, proportion) {
            return (function () {
                obj.beginPath();
                obj.arc(i * 250 + 125, 75, 68, -0.5 * Math.PI, -0.5 * Math.PI + rad * speed);
                obj.stroke();
                obj.closePath();
                speed += 1;
                if (speed > proportion) {
                    return false
                }
                numberShow(i, speed)
                setTimeout(draw(i, proportion), 10)
            })
        }
    }
}
//数字递增动画
function numberShow(i, value) {
    $('.circle div').eq(i).text(value + '%')
}
//翻页
function selectPage() {
    show();
    scrollMouse();
    // 接收判断滚轮方向
    var scrollDirection = null;
//        翻页动画主体函数
    function show() {
        if (nowPage == changePage) {
            return false
        }
        else if ($('section').eq(nowPage).height() !== $('body').height()) {
            return false
        }
//            圆球图标加效果
        $('#head a').removeClass('active')
        $('#head a').eq(changePage).addClass('active')
        $('section').css('height', 0)
        $('section').eq(nowPage).css('height', '100%')
        $('section').eq(nowPage).animate({height: 0})
        $('section').eq(changePage).animate({height: '100%'})
        nowPage = changePage
        boot(nowPage)
    }

//        小圆球翻页
    $('#head a').click(function () {
        changePage = $(this).index()
        show()
    })
// 滚动翻页
    function scrollPage() {
        if (scrollDirection) {
            if (nowPage <= 1) {
                changePage = 0
            }
            else {
                changePage = nowPage - 1;
            }
        }
        else {
            if (nowPage >= $('section').length - 1) {
                changePage = nowPage
            }
            else {
                changePage = nowPage + 1;
            }
        }
        show()
    }

    //添加鼠标滚动事件
    function scrollMouse() {
        //添加对整个body鼠标滚轮事件
        var oSection = document.getElementsByTagName('body')
        //火狐
        if (oSection[0].addEventListener) {
            oSection[0].addEventListener('DOMMouseScroll', fn, false);
        }
        //谷歌
        oSection[0].onmousewheel = fn;
        //滚轮方向判断
        function fn(ev) {
            var ev = ev || event;
            //不同数值分别代表向上滑动还是向下滑动（谷歌上120      下-120）
            if (ev.wheelDelta) {
                scrollDirection = ev.wheelDelta > 0 ? true : false;
            }
            //火狐上-3     下3
            else {
                scrollDirection = ev.detail < 0 ? true : false;
            }
            scrollPage()
            //阻止默认行为
            if (ev.preventDefault) {
                ev.preventDefault();
            }
            return false;
        }
    }
}
