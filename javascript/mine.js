

var carousel = $('#carousel'),
    threshold = 150,
    slideWidth = 500,
    dragStart, 
    dragEnd;

$('#next').click(function(){ shiftSlide(-1) })
$('#prev').click(function(){ shiftSlide(1) })

carousel.on('mousedown', function(){
  if (carousel.hasClass('transition')) return;
  dragStart = event.pageX;
  $(this).on('mousemove', function(){
    dragEnd = event.pageX;
    $(this).css('transform','translateX('+ dragPos() +'px)')
  })
  $(document).on('mouseup', function(){
    if (dragPos() > threshold) { return shiftSlide(1) }
    if (dragPos() < -threshold) { return shiftSlide(-1) }
    shiftSlide(0);
  })
});

function dragPos() {
  return dragEnd - dragStart;
}

function shiftSlide(direction) {
  if (carousel.hasClass('transition')) return;
  dragEnd = dragStart;
  $(document).off('mouseup')
  carousel.off('mousemove')
          .addClass('transition')
          .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
  setTimeout(function(){
    if (direction === 1) {
      $('.slide:first').before($('.slide:last'));
    } else if (direction === -1) {
      $('.slide:last').after($('.slide:first'));
    }
    carousel.removeClass('transition')
    carousel.css('transform','translateX(0px)'); 
  },700)
}


// document.addEventListener('DOMContentLoaded', function () {
//   // Get references to the button and content
//   var toggleButton = document.getElementById('toggleButton');
//   var toggleContent = document.getElementById('toggleContent');

//   // Set initial state (hidden)
//   toggleContent.style.display = 'none';

//   // Add click event listener to the button
//   toggleButton.addEventListener('click', function () {
//       // Toggle the visibility of the content
//       if (toggleContent.style.display === 'none') {
//           toggleContent.style.display = 'block';
//       } else {
//           toggleContent.style.display = 'none';
//       }
//   });
// });


document.addEventListener('DOMContentLoaded', function () {
  var toggleButton = document.getElementById('toggleButton');
  var sketchDivs = document.querySelectorAll('.single-sketch');

  toggleButton.addEventListener('click', function () {
      sketchDivs.forEach(function (div) {
          if (div.style.display === 'none') {
              div.style.display = 'block';
              setTimeout(function () {
                  div.style.opacity = '1';
              }, 10);
          } else {
              div.style.opacity = '0';
              setTimeout(function () {
                  div.style.display = 'none';
              }, 500);
          }
      });
  });
});
