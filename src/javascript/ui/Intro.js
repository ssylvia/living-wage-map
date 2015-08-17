define(['jquery','velocity'],
  function($,Velocity){

    var internals = {
      el: $('.intro')
    };

    internals.onLoad = function(){
      $(internals.self).trigger('load');
    };

    internals.hide = function(){
      internals.el.velocity({
        top: '-100vh'
      },{
        duration: internals.settings.animationDuration,
        easing: internals.settings.easing
      });
    };

    return function (options){
      var defaults = {
        easing: 'easeOutExpo',
        animationDuration: 1000
      };

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      this.init = function(){
        internals.onLoad();
      };

      this.hide = internals.hide;
    };

});