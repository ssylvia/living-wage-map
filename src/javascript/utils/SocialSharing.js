define(['jquery'],
  function($){
  /**
  * Social Sharing
  * @class Social Sharing
  *
  * Collection of methods to share app with social media sites
  *
  * Dependencies: Jquery 1.11
  */

  var _page = {
    title: encodeURIComponent($('meta[property="og:title"]').attr('content')),
    summary: encodeURIComponent($('meta[property="og:description"]').attr('content')),
    url: encodeURIComponent('http://storymaps.esri.com/stories/2015/living-wage-map/'),
    thumbnail: encodeURIComponent($('meta[property="og:image"]').attr('content')),
    twitterText: encodeURIComponent($('meta[name="twitter:title"]').attr('content')),
    twitterHandle: encodeURIComponent($('meta[name="twitter:site"]').attr('content').replace('@',''))
  };

  var _shareOptions = {
    title: _page.title,
    summary: _page.summary,
    url: _page.url,
    thumbnail: _page.thumbnail,
    twitterText: _page.twitterText,
    twitterHandle: _page.twitterHandle,
    hashtags: 'storymap'
  };

  function addClickEvents(){

    $('.share-icon').click(function(){
      if ($(this).hasClass('icon-facebook')) {
        var facebookOptions = '&p[url]=' + _shareOptions.url;
          // + '&p[title]=' + _shareOptions.title
          // + '&p[summary]=' + _shareOptions.summary
          // + '&p[url]=' + _shareOptions.url
          // + '&p[image]=' + _shareOptions.thumbnail;

        window.open(
          'http://www.facebook.com/sharer.php?s=100' + facebookOptions,
          '',
          'toolbar=0,status=0,width=626,height=436'
        );
      }
      else if($(this).hasClass('icon-twitter')) {
        var twitterOptions = 'text=' + _shareOptions.twitterText
          + '&url=' + _shareOptions.url
          + '&via=' + _shareOptions.twitterHandle
          + '&hashtags=' + _shareOptions.hashtags;

        window.open(
          'https://twitter.com/intent/tweet?' + twitterOptions,
          'Tweet',
          'toolbar=0,status=0,width=626,height=436'
        );
      }
    });

  }

  return {
    addClickEvents: addClickEvents
  };

});