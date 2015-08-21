define(['jquery',
  'leaflet',
  'esri-leaflet'],
  function($,
    L){

    var internals = {};

    internals.createMap = function(){
      var map = internals.map = L.map(internals.settings.el,
        internals.settings.config.leafletOptions);

      map.on('load',function(){
        internals.onLoad();
      });

      if (internals.settings.config.initialBounds){
        map.fitBounds(internals.settings.config.initialBounds);
      }

    };

    internals.toggleLayers = function(show,hide,duration){
      if (show && show.setOpacity){
        show.setOpacity(0);
        internals.map.addLayer(show);
        internals.fadeLayer({
          layer: show,
          finalOpacity: 1,
          duration: duration
        });
      }
      if (hide && hide.setOpacity){
        // internals.map.removeLayer(hide);
        internals.fadeLayer({
          layer: hide,
          finalOpacity: 0,
          duration: duration
        });
      }
    };

    internals.fadeLayer = function(options){

      var defaults = {
        duration: 500,
        removeIfInvisible: true
      };

      var settings =  $.extend(true,defaults,options);

      if (settings.layer.options.opacity || settings.layer.options.opacity === 0){

        if (settings.removeIfInvisible && settings.finalOpacity <= 0 && settings.layer.options.opacity <= 0){
          internals.map.removeLayer(settings.layer);
        }
        else if (settings.opacityChange && settings.opacityChange >= 0 && settings.layer.options.opacity >= settings.finalOpacity){
          settings.layer.setOpacity(settings.finalOpacity);
        }
        else{
          settings.delay = settings.delay || settings.duration / ((settings.duration/1000) * 60);
          settings.opacityChange = settings.opacityChange || (settings.finalOpacity - settings.layer.options.opacity) / ((settings.duration/1000) * 60);

          settings.layer.setOpacity(settings.layer.options.opacity + settings.opacityChange);
          setTimeout(function(){
            internals.fadeLayer(settings);
          },settings.delay);
        }

      }

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

      this.toggleLayers = internals.toggleLayers;
    };

});