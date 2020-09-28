jQuery(document).ready(function ($) {
  
    startSlider($("#app"), 90);
  
    function startSlider(obj, timer) {
      var obj, timer;
      var id = "#" + obj.attr("id");
      var slideCount = obj.find("ul li").length;
      var slideWidth = obj.attr("data-width");
      var sliderUlWidth = (slideCount + 1) * slideWidth;
      var time = 2;
      var $bar, isPause, tick, percentTime;
      isPause = false; //false for auto slideshow
  
      $bar = obj.find(".progress .bar");
  
      function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        tick = setInterval(interval, timer);
      }
  
      function interval() {
        if (isPause === false) {
          percentTime += 1 / (time + 0.1);
          $bar.css({
            width: percentTime + "%"
          });
          if (percentTime >= 100) {
            moveRight();
            startProgressbar();
          }
        }
      }
  
      function resetProgressbar() {
        $bar.css({
          width: 0 + "%"
        });
        clearTimeout(tick);
      }
  
      function startslide() {
        $(id + " ul li:last-child").prependTo(id + " ul");
        obj
          .find("ul")
          .css({ width: sliderUlWidth + "vw", marginLeft: -slideWidth + "vw" });
  
        obj.find("ul li:last-child").appendTo(obj.attr("id") + " ul");
      }
      
      startslide();
      startProgressbar();
  
      function moveRight() {
        $(id + " ul").css({
          transition: "1s",
          transform: "translateX(" + -1 * slideWidth + "vw)"
        });
  
        setTimeout(function () {
          $(id + " ul li:first-child").appendTo(id + " ul");
          $(id + " ul").css({
            transition: "none",
            transform: "translateX(" + 0 + "vw)"
          });
  
          $("li.actslide")
            .next()
            .addClass("actslide")
            .prev()
            .removeClass("actslide");
        }, 1000);
      }
    }
    //Pie chart
    var ppc = document.querySelector('.progress-pie-chart'),
      percent = parseInt(ppc.dataset.percent), 
      deg = 360*percent/100;
    
    if (percent > 50) {
      ppc.classList.add('gt-50');
    }
    
    document.querySelector('.ppc-progress-fill').style.transform = 'rotate('+ deg +'deg)';
    document.querySelector('.ppc-percents span').innerHTML = percent+'%';
  });