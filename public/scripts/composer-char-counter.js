$(document).ready(function() {
  console.log('jQuery Loaded');
  
  // counts characters in textarea
  $('#tweet-text').on('keyup', function(event) {
    const length = 140;
    let message = event.target.value;
    let input = message.length;
    let remainingChar = length - input;

    if (input > length) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "black")
    }

    $('.counter').html(remainingChar);
  })
  
});
