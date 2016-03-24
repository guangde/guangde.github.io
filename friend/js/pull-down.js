/**
 * Created with guangde.
 * User: guangde
 * Date: 17.11.12
 * version:1.0
 *
 */

'use strict';


var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset, generatedCount = 0;

function loaded() {

    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        useTransition: true,
        hScrollbar:false,
        vScrollbar:false,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
            }
        },
        //手机触屏下拉刷新列表
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 10) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 10) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                this.maxScrollY = pullUpOffset;
            }
            if (this.y>40){
                $('#pullDown').stop().animate({top:80},'slow');
            }

        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '';
                pullDownAction();   // Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction(); // Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () {
        document.getElementById('wrapper').style.left = '0';
    }, 400);
};

function pullDownAction() { // 下拉刷新
    setTimeout(function () {
    $('#pullDown').stop().animate({top:-40},'slow');
        //window.location.reload();
    }, 2000);
}