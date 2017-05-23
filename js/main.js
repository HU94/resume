/**
 * Created by HU on 2017/5/24.
 */
    $(document).ready(function(){
        boot(0)
    })
var page = null;
function boot(value){
    page = value;
    var boot = new Boot(value);
    boot.slideBarShow();
    boot.default();
    boot.pageShow();
}
function Boot(value) {
    this.default =  function(){
        $('#head').css('display', 'block')
        $('.wrap').removeClass('animation')

    }
    //侧边栏
    this.slideBarShow = function(){
        var slide= {
            skillShow: function(){
                var i = null;
                var arrDivStyle = [180, 170, 140, 150]
                for (i = 0; i < 4; i++) {
                    $('.skills div').eq(i).animate({'width': arrDivStyle[i]}, 1000)
                }
            },   //技能动画
            slideDefaultStyle:function(){
                $('#sidebar').css('display', 'none');
                $('.light').css('opacity', 0);
                $('.skills div').css({'width': 0});
            }   //原始样式
        }
        $('.slide').mouseenter(function () {
            $('#sidebar').css('display', 'block'),
                setTimeout(function () {
                    $('.light').css('opacity', 1);
                }, 1000)
            slide.skillShow();
            $('#sidebar').mouseleave(function () {
                slide.slideDefaultStyle();
            });
        });
    }
    //选页
    this.pageShow = function(){
        switch(value){
            case 0:this.page1();break;
            case 1:this.page2();break;
            case 2:this.page3();break;
            case 3:this.page4();break;
            default:return false
        }
    }
    this.page1 = function(){
        $('#head').css('display', 'none')
        var clock = {
            ele:$('#section1 div'),
            _text:3,
            //倒计时
            method:function(){
                clock.ele.text(clock._text)
                clock.ele.css({transform: 'scale(1.3,1.3)', opacity: 0.3})
                var timer = setTimeout(function(){
                    clock.ele.css({transform: 'scale(1,1)', opacity: 1})
                },500)
                clock._text -= 1;
                if( clock._text == -1 && page=== 0 ){
                    //调用插件
                    $('section').fullPage(1,$('#head a'),'active',boot)
                    return false
                }
                else if( page !=0){
                    return false
                }
                setTimeout(clock.method,1000)
            }
        }
        clock.method();
    }
    this.page2 = function(){
        $('#main .temp li').css('transition', 'transform 2s, width 2s linear')
        var i = 0;
        var contact = {
            default: function(){
                $('.sport p').hide();
                $('.sport p:even').css({'border': '4px solid #8ee5e4', 'border-radius': '50% 50%'});
                $('.sport p:odd').css({'height': 0});
                $('#main .temp li').css('transition', 'none')
                $('.temp li:odd').css({'transform': 'translate(0,0)'})
                $('.temp li:even').css({'transform': 'translate(-104%,0)'})
            },
            textShow:function(eve){
                if (eve % 2 === 0)
                    $('.temp li').eq(eve).css({'transform': 'translate(-200%,0)'})
                else {
                    $('.temp li').eq(eve).css({'transform': 'translate(100%,0)'})
                }
            },
            method: function () {
                if (page != 1) {
                    contact.default();
                    return false
                }
                  else {
                    $('.sport p:even').eq(i).show()
                    $('.sport p:odd').eq(i).show()
                    $('.sport p:odd').eq(i).css({'border': '0.5px solid #8ee5e4'})
                    $('.sport p:odd').eq(i).animate({'height': 98}, 2000)
                    contact.textShow(i)
                    i += 1;
                    //if (i >= 5) {
                    //    return false
                    //}
                    if (page != 1) {
                        contact.default();
                        return false
                    }
                    setTimeout(contact.method, 2000)
                }
            }
        }
        contact.default();
        $('#main .temp li').css('transition', 'transform 2s, width 2s linear')
        contact.method();
    }
    this.page3 = function(){
        var i = 0 ;
        var Animation ={
            defaultText:$('#section3 p:eq(0)').text(),
            TextShow:function(){
                if (page != 2) {
                    $('#section3 p:eq(0)').text( Animation.defaultText )
                    return false
                }
                var nowText = $('#section3 p').text()
                $('#section3 p').text(nowText + '.')
                i += 1;
                if (i >= 7) {
                    $('#section3 p:eq(0)').text(Animation.defaultText)
                    i = 0;
                }
                setTimeout(Animation.TextShow, 500)
            },
            //圆形比例动画
            canvas : function() {
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
                                Animation.numberShow(i, speed)
                                setTimeout(draw(i, proportion), 10)
                            })
                        }
                    }
                },
            //数字递增动画
            numberShow:function (i, value) {
            $('.circle div').eq(i).text(value + '%')
        }
            };
        Animation.TextShow();
        Animation.canvas();
        }
    this.page4 = function(){
        $('.wrap').addClass('animation')
        $('.wrap').css('animation')
    }
}


