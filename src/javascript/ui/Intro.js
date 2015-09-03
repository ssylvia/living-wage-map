define(['jquery','velocity','pace'],
  function($,Velocity,Pace){

    var internals = {
      el: $('.intro'),
      hidden: false
    };

    internals.onLoad = function(){
      $(internals.self).trigger('load');
    };

    internals.hide = function(){
      if (!internals.hidden){
        internals.hidden = true;
        internals.el.velocity({
          top: '-100vh'
        },{
          duration: internals.settings.animationDuration,
          easing: internals.settings.easing
        });
      }
    };

    internals.show = function(){
      if (internals.hidden){
        internals.hidden = false;
        internals.el.velocity({
          top: '0'
        },{
          duration: internals.settings.animationDuration,
          easing: internals.settings.easing
        });
      }
    };

    return function (options){
      var defaults = {
        easing: 'easeOutExpo',
        animationDuration: 1500
      };

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      Pace.start();

      this.init = function(){
        internals.onLoad();
      };

      this.hide = internals.hide;
    };

});