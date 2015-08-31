define(['jquery','app/utils/SocialSharing'],
  function($,SocialSharing){

    var internals = {};

    internals.calculateRegionLayout = function(){
      $('.region-center').each(function(){
        var left = $(this).siblings('.region-left:visible').outerWidth(),
          right = $(this).siblings('.region-right:visible').outerWidth(),
          top = $(this).siblings('.region-top:visible').outerHeight(),
          bottom = $(this).siblings('.region-bottom:visible').outerHeight(),
          siblingWidth = left + right,
          siblingHeight = top + bottom;
        $(this).css({
          'top': top || 0,
          'left': left || 0,
          'height' : $(this).parent().outerHeight() - siblingHeight,
          'width' : $(this).parent().outerWidth() - siblingWidth
        });
      });
    };

    return function (options){
      var defaults = {};

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      SocialSharing.addClickEvents();

      this.enableRegionLayout = function(){
        internals.calculateRegionLayout();
        $(window).resize(internals.calculateRegionLayout);
      };

      this.resetRegionLayout = function(){
        internals.calculateRegionLayout();
      };
    };

});