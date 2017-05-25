//eve为每页的祖先元素（eve的样式height:100%, width:100%），changePage,是初始要显示的页面，head是随着翻页要改变的元素，style是随着翻页要改变的元素的新样式的类名  callback为回调函数，将当前是第几页以参数传回
//使用方法如 $('section').fullPage(1，$('head a'),'tall')   1是显示第二页（下标由0算起）  section是每页的祖宗元素， （section的样式height:100%, width:100%）  $('head a')头部菜单，tall是$('head a')的样式类名
;(function (){
    function SelectPage(ele,changePage,head,style,callback){
        var _this = this;
        this.callback = callback;
        this.ele = ele;
        this.a = head;
        this.style = style;
        this.nowPage = 0;
        this.changePage = changePage;
        this.scrollDirection = null;// 接收判断滚轮方向
        //小圆球翻页
        this.a.click(function () {
            _this.changePage = $(this).index()
            _this.show()
        })
    }
    //鼠标滚动
    SelectPage.prototype.ScrollMouse=function() {
        var _this=this
        //添加对整个body鼠标滚轮事件
        this.oSection = document.getElementsByTagName('body')
        //火狐
        if (this.oSection[0].addEventListener) {
            this.oSection[0].addEventListener('DOMMouseScroll', fn, false);
        }
        //谷歌
        this.oSection[0].onmousewheel = fn;
        //添加对整个body鼠标滚轮事件end
        //滚轮方向判断
        function fn(ev) {
            this.ev = ev || event;
            //不同数值分别代表向上滑动还是向下滑动（谷歌上120      下-120）
            if (this.ev.wheelDelta) {
                _this.scrollDirection = this.ev.wheelDelta > 0 ? true : false;
            }
            //火狐上-3     下3
            else {
                _this.scrollDirection =this.ev.detail < 0 ? true : false;
            }
            _this.scrollPage()
            //阻止默认行为
            if (this.ev.preventDefault) {
                this.ev.preventDefault();
            }
            return false;
        }
    }
    //滚动翻页
    SelectPage.prototype.scrollPage = function() {
        if (this.scrollDirection) {
            if ( this.nowPage <= 1) {
                this.changePage = 0
            }
            else {
                this.changePage = this.nowPage - 1;
            }
        }
        else {
            if (this.nowPage >= this.ele.length - 1) {
                this.changePage = this.nowPage
            }
            else {
                this.changePage = this.nowPage + 1;
            }
        }
        this.show()
    }
    //翻页动画主体函数
    SelectPage.prototype.show = function() {
        if (this.nowPage === this.changePage) {
            return false
        }
        else if (this.ele.eq(this.nowPage).height() !==$('body').height()){
            return false
        }
        //圆球图标加效果
        this.a.removeClass(this.style)
        this.a.eq(this.changePage).addClass(this.style)
        this.ele.css('height',0)
        this.ele.eq(this.nowPage).css('height','100%')
        this.ele.eq(this.nowPage).animate({height: 0})
        this.ele.eq(this.changePage).animate({height: '100%'})
        this.nowPage = this.changePage;
        return this.callback(this.nowPage)
    }
    $.fn.fullPage = function(changePage,head,style,callback){
        var selectPage = new SelectPage(this,changePage,head,style,callback)
        selectPage.show();
        return selectPage.ScrollMouse();
    }
})()