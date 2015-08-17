define(['jquery',
  'leaflet',
  'esri-leaflet'],
  function($,
    L){

    var internals = {};

    internals.createMap = function(){
      var map = internals.map = L.map(internals.settings.el,
        internals.settings.config.leafletOptions);

      if (internals.settings.config.initialBounds){
        map.fitBounds(internals.settings.config.initialBounds);
      }

      internals.onLoad();
    };

    internals.onLoad = function(){
      $(internals.self).trigger('load');
    };

    return function (options){
      var defaults = {
        el: 'map'
      };

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      this.init = function(){
        internals.createMap();
      };
    };

});