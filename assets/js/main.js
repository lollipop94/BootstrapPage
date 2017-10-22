$(function () {
    var part = $('.content'),
        lis = $('#navbar-collapse-example ul li.nav-item'),
        a = $('#navbar-collapse-example ul li.nav-item a');
    var n = 0,
        offsetTop = [],
        total = lis.length;
    //遍历导航栏菜单中对应的内容块，将偏移顶部的高度保存在一个数组中
    for (var i = 0; i < part.length; i++) {
        offsetTop.push(part.eq(i).offset().top);
    }
    //点击导航栏元素滚动到相应内容块
    lis.delegate('a','click',function() {
        n = $(this).index('#navbar-collapse-example ul .nav-item a');//点击的菜单选项的索引
        var t = offsetTop[n];//与索引对应的相应的偏移高度
        $('html,body').animate({scrollTop: t}, 1000);
        $(this).addClass('on').parent().siblings().children().removeClass('on');
    });
    //点击首页（header）中的more按钮，页面滚动到第一个内容块
    $('.more').click(function () {
        $('html,body').animate({scrollTop: offsetTop[0]}, 1000);
        $('.first').addClass('on').parent().siblings().children().removeClass('on');
    });

    //滚动条改变导航栏元素效果
    $(window).bind('load scroll',function(){
        var scrollbar = $(this).scrollTop(),
            header = $('header').height();
        if (scrollbar >= header) {
            for (var j = 0; j < offsetTop.length; j++) {
                if( scrollbar >= offsetTop[j] && scrollbar < offsetTop[j+1]) {
                    a.removeClass('on').parent().eq(j).children().addClass('on');
                }
                if (scrollbar >= (offsetTop[total-1])) {
                    a.removeClass('on').parent().eq(total-1).children().addClass('on');
                }
            }
        }
        else {
            a.removeClass('on');
        }
    });
});