define(['jquery'],
  function($){

    var internals = {};

    internals.createTooltip = function(){

        internals.tooltip = internals.settings.el.find('.tooltip');

        internals.onLoad();

    };

    internals.updateTooltip = function(e){
      if (e.countyDisplay){
        internals.tooltip.html(e.statistics.location + '<br />' + e.statistics.state);
      }
      else{
        internals.tooltip.html(e.statistics.location);
      }
    };

    internals.showTooltip = function(){
      internals.settings.el.css('opacity','1');
    };

    internals.hideTooltip = function(){
      internals.settings.el.css('opacity','0');
    };

    internals.moveTooltip = function(e){
      var width = internals.tooltip.outerWidth();
      var height = internals.tooltip.outerHeight();
      var topMargin = -(height + 20);
      var leftMargin = -(width/2);

      if (e.hoverPosition.x < 110){
        leftMargin = -10;
      }
      else if (e.hoverPosition.x > $('.map').outerWidth() - 110){
        leftMargin = -(width - 10);
      }

      if (e.hoverPosition.y < (height + 20)){
        internals.settings.el.addClass('display-under');
        topMargin = 0;
      }
      else{
        internals.settings.el.removeClass('display-under');
      }

      internals.settings.el.css({
        'top': e.hoverPosition.y,
        'left': e.hoverPosition.x
      });

      internals.tooltip.css({
        'margin-top': topMargin,
        'margin-left': leftMargin
      });
    };

    internals.onLoad = function(){
      $(internals.self).trigger('load');
    };

    return function (options){
      var defaults = {
        el: $('.tooltip-wrapper'),
        includeGeocoder: true
      };

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      this.init = function(){
        internals.createTooltip();
      };

      $(internals.settings.data).on('tooltip-show',internals.showTooltip);
      $(internals.settings.data).on('tooltip-hide',internals.hideTooltip);
      $(internals.settings.data).on('select',internals.updateTooltip);
      $(internals.settings.data).on('hover-position-change',internals.moveTooltip);

    };

});