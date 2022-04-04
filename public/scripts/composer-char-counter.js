$(document).ready(function() {
  console.log('jQuery Loaded');
  
  // counts characters in textarea
  $('#tweet-text').on('keyup', function(event) {
    const length = 140;
    const message = event.target.value;
    const input = message.length;
    const remainingChar = length - input;

    if (input > length) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "black");
    }

    $('.counter').html(remainingChar);
  });
  
});
