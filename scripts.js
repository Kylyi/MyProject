// Jump out of scope on clicking outside (pri kliknuti mimo dropper je okno s dropdown-content zavreno)

$(document).ready(function(){
  // Sets class 'active' to href attribute of dropper element (dropdown-content)
  $('.dropper').click(function() {
    $(this.hash).toggleClass('active').focus();
    console.log("Clicked on dropper.");
  });


  // On focus-out, removes the 'active' class from dropdown-content AND on focus-in, stops the removal of 'active'
  // Na focus-out se odstrani trida 'active' z dropdown-content, ale na focus-in se odstraneni prerusi (tzn. pri focusu-in nechci, aby se hned dropdown-content zavrel, ale chci, aby slo kliknout na link uvnitr dropdown-contentu)
  $('.dropdown-content').on({
    focusin: function() {
      clearTimeout($(this).data("timer"));
      console.log("Focused in dropdown-content");
    },
    focusout: function() {
      $(this).data("timer", setTimeout(function() {
        $(this).removeClass('active');
        console.log("Focused out of dropdown-content");
      }.bind(this),0));
    }
  });


  // On focus-out of dropper, stop timer in dropdown-content (to not double-toggle it), focus-out is probably for tab users???
  // na focus-in se vypne timer, aby nedoslo k togglovani dropdown-contentu 2x - ve funkci vyse a pri kliknuti na dropper
  $('.dropper').on({
    focusout: function() {
      $(this.hash).data("timer", function(){
        $(this.hash).removeClass('active');
        console.log("Out of dropper");
      }.bind(this), 0);
    },
    focusin: function() {
      clearTimeout($(this.hash).data("timer"));
      console.log("focused in dropper");
    }
  });


  // On resize change the dimensions of articles
  window.addEventListener('resize', function() {
    countArticleDimensions();
  })
});










// Calculates the dimensions of article height and image width
function countArticleDimensions() {
  // Calculates the height of articles and width of images in articles (pocita velikost jednotlivych clanku a obrazku, zachovava aspect ratio OBRAZOVKY - ne obrazku!)
  // Initialize variables w - width, and h - height
  var w = $(window).width();
  var h = $(window).height();

  // Recursive function to find the biggest divider (hleda nejvetsiho spolecneho jmenovatele dvou cisel)
  function gcd(a,b) {
    if (b == 0) {return a;}
    return gcd(b, a%b);
  }

  // Initializing variables and setting min and max values
  var aMinHeight = 70;
  var aMaxHeight = 300;
  var aHeight = h/8;
  var aHeightReal;

  // Sets the height depending on min and max values
  if (aHeight > aMinHeight) {
    if (aHeight < aMaxHeight) {
      aHeightReal = aHeight;
    } else {
      aHeightReal = aMaxHeight;
    }
  } else {
    aHeightReal = aMinHeight;
  }

  // Calculates aspect ratio and image width depending on article height
  var x = gcd(w,h);
  console.log("Width: "+ w);
  console.log("Height: " + h);
  var aR = [w/x, h/x];
  var maxAr = Math.max.apply(Math, aR);
  var minAr = Math.min.apply(Math, aR);
  var aImageWidth = aHeightReal/minAr*maxAr;

  // Sets the height of article
  $('.article').css('height', aHeightReal);

  // Sets the width of image in article
  $('.aImage').css('width', aImageWidth);
  var p = 25;
  $('.aImage').css('max-width', p+'%');

  if ((w > h) && (w>800)) {
    p = 10;
    $('.aImage').css('max-width', p+'%');
  } else if ((w > h) && (w<800)){
    p = 12.5;
    $('.aImage').css('max-width', p+'%');
  }
  var aImageWidthReal = Math.min((w/100*p), aImageWidth);
  console.log(p);
  // Sets the width of text in article
  var aTextWidth = w - aImageWidthReal - w/100*15;
  $('.aText').css('width', aTextWidth);

  console.log("Article height: " + aHeightReal);
  console.log("Image Width: " + aImageWidth);
  console.log("Text Width: " + aTextWidth);


}
