(function () {
  
  var settings = {};
  var lotteryBoxEl;
  var defaultOptions = {
    timeout: null,
    once: false,
    title: "name",
    subtitle: null,
    api: null,
    confetti: true,
    showbtn: true,
    el: "body",
    fitsize: true,

    data: {},
    winners: {},
    $el: null
  }

  var diceIconHtml = "<i class='dh-icon dh-icon-dice'>🎲<svg><use xlink:href='#dh-dice'/></svg></i>"
  var okayIconHtml = "<i class='dh-icon dh-icon-okay'>👌<svg><use xlink:href='#dh-okay'/></svg></i>"
  var crownIconHtml = "<i class='dh-icon dh-icon-crown'>👑<svg><use xlink:href='#dh-crown'/></svg></i>"

  //生成dom
  var initDom = function(dom){
    var svgIcons = $("\
      <svg xmlns='http://www.w3.org/2000/svg' style='display: none;'>\
        <symbol id='dh-okay' viewBox='0 0 57 92'>\
          <path fill='currentColor' fill-rule='nonzero' d='M3.6 51c2.5-1 5.2.3 6.2 2.7 1.3 3.5 4.6 5.8 8.3 5.8 5 0 9.2-4 9.2-9s-4-9-9-9c-3.8 0-7 2.2-8.4 5.6C8.8 49.7 6 51 3.6 50c-2.4-1-3.6-3.7-2.6-6C3.8 36.4 10.5 32 18 32c3.5 0 6.7 1 9.5 2.5l-8.8-22c-1-2.5.3-5.2 2.7-6.2 2.4-1 5.2.3 6 2.7L37 32.4 33.4 6.2c-.3-2.5 1.5-5 4-5.3 2.7-.4 5 1.4 5.4 4L46 29.7l1-11c.2-2.7 2.5-4.7 5-4.4 2.7.2 4.7 2.5 4.4 5l-3.6 41-4 30.8h-29l4.8-23.3c-2 .8-4.2 1.2-6.5 1.2C10.6 69 4 64.2 1 57c-1-2.4.2-5.2 2.6-6z'/>\
        </symbol>\
        <symbol id='dh-crown' viewBox='0 0 88 81'>\
          <path fill='currentColor' fill-rule='nonzero' d='M83 23c-2.6 0-4.8 2.3-4.8 5 0 1.6.8 3 2 4L69.6 48.2l-4-27.8c2.5-.3 4.3-2.3 4.3-4.7 0-2.7-2.2-4.8-4.8-4.8-2.7 0-4.8 2-4.8 4.8 0 2 1.3 3.8 3 4.4l-8 22-9.8-32c2-.6 3.4-2.4 3.4-4.6C48.8 3 46.6.8 44 .8c-2.6 0-4.8 2.2-4.8 4.8 0 2.2 1.4 4 3.4 4.6l-9.8 32-8-22c1.8-.6 3-2.4 3-4.4 0-2.7-2-4.8-4.7-4.8-2.6 0-4.7 2-4.7 4.8 0 2.4 1.8 4.3 4 4.7l-3.8 27.8-11-16.5c1.4-.8 2.3-2.3 2.3-4C9.8 25.2 7.6 23 5 23 2.4 23 .2 25.2.2 27.8c0 2.7 2.2 4.8 4.8 4.8.4 0 .8 0 1.2-.2l9.7 41s18.6-1.6 28-1.6c9.4 0 28 1.6 28 1.6L82 32.6H83c2.6 0 4.8-2 4.8-4.7s-2.2-5-4.8-5zM26 62.7c-2 0-3.6-1.6-3.6-3.5 0-2 1.6-3.5 3.6-3.5s3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6zm18 2.2c-3.2 0-5.8-2.5-5.8-5.7 0-3 2.6-5.7 5.8-5.7 3.2 0 5.8 2.6 5.8 5.8 0 3.3-2.6 5.8-5.8 5.8zm18-2.2c-2 0-3.6-1.6-3.6-3.5 0-2 1.6-3.5 3.6-3.5s3.6 1.6 3.6 3.6-1.6 3.6-3.6 3.6z'/>\
        </symbol>\
        <symbol id='dh-dice' viewBox='0 0 90 76'>\
          <path fill='currentColor' fill-rule='nonzero' d='M83.6 34.5c-1-.4-2.2 0-2.6 1-.4 1 0 2.3 1 2.7 4.4 1.7 4 3.2 3.6 4-.5 1.8-5.8 4-12.7 5.3l8.7-15.2c1.7-3 .7-6.7-2.3-8.4L39.7 1c-3-1.8-6.7-.7-8.5 2.2L10.8 38.6c-4.4-1.4-6.6-3-6.6-4 0-2 2.6-4.3 9.8-6 1-.2 1.8-1.3 1.6-2.4-.3-1-1.4-1.8-2.4-1.5C1.8 27.3.2 32 .2 34.5c0 7 14 9.5 21.7 10.4 0-.2 0-.3-.2-.5-.8-3 1-6 4-6.7 2.8-.8 5.8 1 6.6 4 .8 2.8-1 5.8-4 6.6-2 .6-4.3-.3-5.6-2-.5.5-1 .8-1.8.7-5.4-.4-9.8-1.3-13.3-2.4-.6 2.6.5 5.4 3 6.8l38.8 22.4s2.4 1.6 4.2 1.6c1.8 0 3.4-1.6 3.4-1.6.8-.4 1.3-1 1.7-1.8l10-17.2-6.3.3c-1 0-2-.6-2-1.5-.2-.2-.2-.4-.2-.6 9-.3 27-2.8 29.3-9.5 1-2.7.6-6.5-6-9zm-48-13.7c-1-3 1-6 3.8-6.7 3-.7 6 1 6.7 4 1 3-1 6-3.8 6.7-3 .7-6-1-6.7-4zm15 40.3c-3 1-6-.8-6.7-3.7-1-3 1-6 3.8-6.7 3-.8 6 1 6.7 3.8.8 3-1 6-4 6.7zm13.7-23.6c-3 .8-6-1-6.7-4-.8-2.8 1-5.8 4-6.6 2.8-.7 5.8 1 6.6 4 .8 2.8-1 5.8-4 6.6z'/>\
        </symbol>\
      </svg>\
    ");

    var isAppleOs = navigator.platform && (navigator.platform.toLowerCase().indexOf('mac') >= 0 || /iPad|iPhone|iPod/.test(navigator.platform) );
    // isAppleOs = false
    lotteryBoxEl = $("\
      <div class='dh-lottery" + (isAppleOs ? ' is-mac': '') + "'></div>\
    ");
    //中奖用户高亮
    var selector = $("\
      <div id='dh-lottery-selector' style='display: none'>\
        <span class='image'>\
          <div class='selector-border'></div>\
        </span>\
      </div>\
    ");
    //用户列表容器
    var container = $("\
      <div class='main-container'>\
        <canvas id='canvas'></canvas>\
        <div class='userlist columns is-multiline is-mobile'></div>\
      </div>\
    ");
    //控制按钮
    var btn = $("\
      <div class='actions'>\
        <a class='button primary' id='dh-lottery-go'>" + diceIconHtml + "</a>\
      </div>\
    ");
    //中奖用户展示弹框
    var modal = $("\
      <div class='dh-modal" + (isAppleOs ? ' is-mac': '') + "' id='dh-lottery-winner'>\
        <div class='dh-modal-background'></div>\
        <div class='dh-modal-content'>\
          <h1>" + crownIconHtml + "</h1>\
          <div class='avatar-image'>\
            <img class='avatar' src='' alt='avatar' />\
          </div>\
          <h2 class='profile-name'></h2>\
          <h3 class='profile-subtitle'></h3>\
          <h4 class='profile-desc'></h4>\
        </div>\
        <button class='dh-modal-close'></button>\
      </div>\
    ");
    lotteryBoxEl.append(svgIcons);
    lotteryBoxEl.append(selector);
    lotteryBoxEl.append(container);
    if(settings.showbtn) lotteryBoxEl.append(btn);
    dom.append(lotteryBoxEl);
    dom.append(modal);

    //注册dom事件
    $('#dh-lottery-go').click(function() {
      if (lotteryInterval) {
        return stopLottery();
      } else {
        return startLottery();
      }
    });
    $('.dh-modal-close').click(function() {
      return $('#dh-lottery-winner').removeClass('is-active');
    });
    document.body.onkeydown = function(e) {
      if (e.keyCode == 27) {
        return $('.dh-modal-close').click();
      }
      if (e.keyCode == 32) {
        if ($('#dh-lottery-winner').hasClass('is-active')) return;
        return $('#dh-lottery-go').click();
      }
    };
  }

  //格式化模版
  var formatTemplate = function(data, tmpl) {  
    var format = {  
        name: function(x) {  
          return x ; 
        }  
    };  
    return tmpl.replace(/{(\w+)}/g, function(m1, m2) {  
        if (!m2)  
          return "";  
        return (format && format[m2]) ? format[m2](data[m2]) : data[m2];  
    });
  }

  //新建用户dom
  var newUser = function(item){
    var template = "\
      <div class='column'>\
        <div class='profile' data-profile='{json}'>\
            <div class='profile__parent'>\
                <div class='profile__wrapper'>\
                    <div class='profile__content'>\
                        <div class='avatar'><span class='image avatar-image is-128x128'><img src='{avatar}' alt='avatar'/></span></div>\
                    </div>\
                </div>\
            </div>\
        </div>\
      </div>\
    ";
    item['json'] = encodeURIComponent(JSON.stringify(item));
    var html = formatTemplate(item,template);
    return $(".userlist").append(html);
  }

  var loadApi = function(){
    $.ajax({
      type: 'GET',
      url: settings.api,
      dataType: 'json',
      success: function(data){
        settings.data = data;
        console.log("Lottery: API data loaded");
        readyLottery();
      },
      error: function(xhr, type){
        alert('Lottery: Load player list error!\n'+type+'\n'+type);
      }
    })
  }

  //一些微小的准备工作
  var readyLottery = function(){
    settings.$el = $(settings.el);
    initDom(settings.$el);
    $.each(settings.data, function(index,item){
      item['id'] = index;  //为每个用户添加一个唯一id
      newUser(item);
    })
    console.log('Lottery: ' + settings.data.length + ' player');
    setTimeout(function() {
      positionList = getAllPosition();
      return moveToTarget(0);
    }, 1000);
    if(settings.fitsize) fitsize();
    if(settings.confetti) window.readyConfetti();
  }

  var fitsize = function(){
    //通过窗口预测一个合适大小
    var containerSize = settings.$el.height() * settings.$el.width();
    var number = settings.data.length;
    var itemSideSize = Math.round(Math.sqrt(containerSize / number) / 1.2);
    setItemSize(itemSideSize);
    
    //如果溢出窗口面积则尝试减小
    while ( !(settings.$el.height() >= lotteryBoxEl.height()) || !(settings.$el.width() >= lotteryBoxEl.width()) ) {
      if (itemSideSize < 10) break;
      itemSideSize = itemSideSize - 2;
      setItemSize(itemSideSize);
    }

    getAllPosition()
  }

  //设置元素大小
  var setItemSize = function(itemSideSize){
    $(".dh-lottery .avatar .image").css('height',itemSideSize+'px');
    $(".dh-lottery .avatar .image").css('width',itemSideSize+'px');
    $("#dh-lottery-selector .image").css('height',itemSideSize+'px');
    $("#dh-lottery-selector .image").css('width',itemSideSize+'px');
  }
  
  var positionList = [];
  var currentTarget = null;
  var winnerProfile = null;
  var lotteryInterval = null;
  var lotteryTimeout = null;

  //缩放窗口时重新计算头像位置
  $(window).resize(function() {
    positionList = getAllPosition();
    moveToTarget(currentTarget);
    if(settings.fitsize) fitsize();
  });

  var getAllPosition = function() {
    return $.map($('.profile'), function(el, index) {
      return $(el).find('.avatar-image').first().position();
    });
  };

  var moveToTarget = function(target) {
    move('#dh-lottery-selector .image').x(positionList[target].left - 4).y(positionList[target].top - 4).ease('in-out').duration(200).end();
    return currentTarget = target;
  };

  var startLottery = function(){
    console.log('Lottery: started');
    $('#dh-lottery-winner').removeClass('is-active');
    $('#dh-lottery-selector').show();
    lotteryInterval = setInterval(function() {
      var targetIndex = Math.floor(Math.random() * positionList.length);
      console.log('Lottery: moveToTarget #', targetIndex)
      return moveToTarget(targetIndex);
    }, 350);
    if(settings.timeout) lotteryTimeout = setTimeout(stopLottery, settings.timeout * 1000);
    $('#dh-lottery-go').removeClass('primary').addClass('success').html(okayIconHtml);
    return true;
  }

  var stopLottery = function(){
    console.log('Lottery: stoping...');
    var userId;
    clearTimeout(lotteryTimeout);
    winnerProfile = JSON.parse(decodeURIComponent($($('.profile')[currentTarget]).data('profile')));
    userId = winnerProfile['id'];
    //opps!重复中奖
    if (settings.once && settings.winners[userId]) {
      console.log('Lottery: dup, next.');
      lotteryTimeout = setTimeout(stop, 1 * 1000);
      return;
    }
    clearInterval(lotteryInterval);
    settings.winners[userId] = winnerProfile;
    if(settings.confetti){
      window.startConfetti();
      setTimeout(function() {
        return window.stopConfetti();
      }, 1500);
    }
    setTimeout(function() {
      var cardSubTitle, cardTitle, cardDesc;
      if (winnerProfile) {
        $('#dh-lottery-winner .avatar').attr('src', winnerProfile['avatar']);
        if (winnerProfile['data'] && Object.keys(winnerProfile['data']).length > 0) {
          cardTitle = winnerProfile['data'][settings.title];
          cardSubTitle = winnerProfile['data'][settings.subtitle];
          cardDesc = winnerProfile['data'][settings.desc];
        }
        $('#dh-lottery-winner .profile-name').text(cardTitle || winnerProfile['name'] );
        $('#dh-lottery-winner .profile-subtitle').text(cardSubTitle || winnerProfile['company']);
        $('#dh-lottery-winner .profile-desc').text(cardDesc || '');
      }
      return $('#dh-lottery-winner').addClass('is-active');
    }, 700);
    lotteryInterval = null;
    $('#dh-lottery-go').removeClass('success').addClass('primary').html(diceIconHtml);
    return winnerProfile;
  }
  

  //Controller
  var controller = {
    //加载
    init : function (options) { 
      settings = $.extend({},defaultOptions, options);
      settings.api != null ? loadApi(settings.api) : readyLottery();//如果api存在则读取api，否则使用data中数据
    },
    //抽奖
    start : function (){
      return startLottery();
    },
    //停，返回中奖用户
    stop : function (){
      return stopLottery();
    },
    //获取用户列表
    getUsers : function(){
      return settings.data;
    },
    //获取中奖用户
    getWinners : function(){
      return settings.winners;
    }
  };

  $.lottery = function( method ) {
    if ( controller[method] ) {
      return controller[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return controller.init.apply( this, arguments );
    } else {
      console.error( 'Method ' +  method + ' does not exist.' );
    }    
  }; 
  
})();
