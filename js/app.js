//$(document).foundation();

//$(document).imagesLoaded(function(){
//    $(window).enllax();
//});

$(function() {
  $('.demo').textillate({
    autostart: false,
    in: {
      delayScale: 1.5,
      delay: 50
    },
    out: {
      effect: 'fadeOutRight',
      delayScale: 0.8,
      delay: 30
    }
  });

  $('.menu a').on('click', function(event) {
    event.preventDefault();
    if ($('.menu').hasClass('open')) {
      $('.menu').removeClass('open');
    } else {
      $('.menu').addClass('open');
    }

    var $windowHeight = $(window).outerHeight();
    var $hmenu = $('.open .hidden-menu').outerHeight();

    $('.open .hidden-menu').css('margin-top', ($windowHeight - $hmenu) / 2);
  });
});

/*$(function(){

    $(window).on('load resize', function(){
        var $windowHeight = $(window).height();
        var $introHeight = $('.intro-project').height();
        var $pad = $windowHeight - $introHeight;
        var $padding = $pad / 2;
        
        if( $(window).width() >= 1024 ){    
            $('.intro-project').css('padding-top', $padding);
            $('.intro-project').css('padding-bottom', $padding);
        } else {
            $('.intro-project').css('padding-top', '8em');
            $('.intro-project').css('padding-bottom', '8em');
        }
    })
});*/

$(function(index) {
  window.setTimeout(function() {
    $('.loader').addClass('no-visible');
    $('.intro-project').addClass('active');
    $('.intro-project')
      .find('h2')
      .textillate('start');
    $('.abc').textillate('start');
  }, 4000);

  window.setTimeout(function() {
    $('.gradient.first').removeClass('active');
    $('.gradient.second').addClass('active');
  }, 4000);

  $('body').scroll(function() {
    $(this).fadeOut('slow');
  });

  $('.delay-link').click(function(e) {
    e.preventDefault(); // prevent default anchor behavior
    var goTo = this.getAttribute('href'); // store anchor href
    $('.loader').addClass('exit');

    // do something while timeOut ticks ...

    setTimeout(function() {
      window.location = goTo;
    }, 2000);
  });

  magic = $('.s-animate');
  demo = $('.abc');

  $(window).on('load scroll', function() {
    magic.each(function(i) {
      a = $(this).offset().top - 50;
      b = $(window).scrollTop() + $(window).height();
      if (a < b) $(this).removeClass('s-animate');
    });

    /*demo.each(function(i) {
            a = $(this).offset().top;
            c = $(this).offset().top + 6;
            b = $(window).scrollTop() + $(window).height();
            if (b > a && b < c) $(this).textillate('start');
// do something
            $(this).on('inAnimationEnd.tlt', function () {
                $(this).attr('data-in-effect', 'none');
            });
        });*/
  });
});

//new Share(".share-button");
