/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
  console.log('jQuery Loaded');

  //Escaping text function to prevent XSS attack

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //hide error box when page is loaded
  $('.error').hide();

  //creates the tweet content for container body

  const createTweetElement = function(tweet) {
    let $tweet = $('<article>').addClass('tweets-container');
    let charObj = `
      <header>
        <div class="tweetmain">
          <img class="avatar" src=${escape(tweet.user.avatars)} width=75px height=75px>
          <p>${escape(tweet.user.name)}</p>
        </div>
        <p class="handle">${escape(tweet.user.handle)}</p>
      </header>
      <p class="tweet">${escape(tweet.content.text)}</p>
      <footer>
        <p>${escape(timeago.format(tweet.created_at))}</p>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>`;
  
    let tweets = $tweet.append(charObj);
    return tweets;
  };


  // responsible for taking in an array of tweet objects and appending to tweets-container

  const renderTweets = function(tweets) {
    for (let content of tweets) {
      console.log(tweets);
      let newTweet = createTweetElement(content);
      let $tweetscontainer = $('.maintweetcontainer');
      $tweetscontainer.append(newTweet);
    }
  };


  //"GETS" tweet from /tweets URL and loads it onto the page

  const loadTweet = function() {
    $.ajax({
      url:"/tweets",
      type:"GET"
    }).then((data) => {
      renderTweets(data);
    });
  };

  loadTweet();


  //Prohibits submit button from default behaviour

  $('#tweets').on('submit', function(e) {
    e.preventDefault();
    const preTweet = $('#tweets').serialize();
    const finalTweet = $('#tweet-text').val();
    $('#alert').slideUp();

    //Slide down if tweet length is more than 140 or empty
    if (finalTweet.length > 140 || finalTweet === '') {
      return $('#alert').slideDown();
    }
  
    //Slide up when fields are satisfied

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: preTweet
    }).then(() => {
      loadTweet();
      $('#tweet-text').val('');
      $('.counter').val(140);
    });

  });

});

//xhr works on network but does not print into body