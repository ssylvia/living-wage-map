define(['jquery',
  'leaflet',
  'sweetAlert',
  'esri-leaflet',
  'esri-leaflet-geocoder'],
  function($,
    L,
    swal){

    var internals = {};

    internals.createMap = function(){
      var map = internals.map = L.map(internals.settings.el,
        internals.settings.config.leafletOptions);

      map.on('load',function(){
        internals.onLoad();
      });

      internals.geocodeResults = L.layerGroup().addTo(map);

      if (internals.settings.config.initialBounds){
        map.fitBounds(internals.settings.config.initialBounds);
      }

      $('#map .home-btn-wrapper').click(function(){
        map.fitBounds(internals.settings.config.initialBounds);
      });

      $('.geocoder-control').keydown(function(e){
        if (e.keyCode === 13) {
          var task = new L.esri.Geocoding.Tasks.Geocode().within(internals.settings.config.leafletOptions.maxBounds).text($('.geocoder-control input').val());
          task.run(function(err,result){
            if (!err){
              $.each(result,function(){
                var ftr = this[0];
                if (ftr){
                  var loc = this[0].latlng;
                  var marker = L.marker(loc);
                  internals.geocodeResults.clearLayers();
                  internals.onGeocodeClear();
                  internals.onGeocode(this[0]);
                  internals.geocodeResults.addLayer(marker);
                  marker.on('popupopen',function(){
                    $('.clear-geocode').click(function(){
                      internals.geocodeResults.clearLayers();
                      internals.onGeocodeClear();
                      $('.geocoder-control input').val('');
                    });
                  });
                  marker.bindPopup(this[0].text + '<br /><div class="clear-geocode">Remove</div>',{
                    closeOnClick: false
                  }).openPopup();
                  map.setView(loc);
                }
                else{
                  swal({
                    title: 'No Search Results',
                    text: 'The search text you provided returned no results. Check the accuracy of your text or try making your search more specific.',
                    confirmButtonText: 'Try Again',
                    type: 'warning'
                  });
                }
              });
            }
          });
        }
      });

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
      else if(show){
        internals.map.addLayer(show);
      }
      if (hide && hide.setOpacity){
        internals.fadeLayer({
          layer: hide,
          finalOpacity: 0,
          duration: duration
        });
      }
      else if(hide){
        internals.map.removeLayer(hide);
      }
    };

    internals.fadeLayer = function(options){

      var defaults = {
        duration: 500,
        removeIfInvisible: true
      };

      var settings =  $.extend(true,defaults,options);

      if (settings.layer.fadeTimeout){
        clearTimeout(settings.layer.fadeTimeout);
      }

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
          settings.layer.fadeTimeout = setTimeout(function(){
            internals.fadeLayer(settings);
          },settings.delay);
        }

      }

    };

    internals.onLoad = function(){
      $(internals.self).trigger('load');
    };

    internals.onGeocodeClear = function(){
      $(internals.self).trigger('geocode-clear');
    };

    internals.onGeocode = function(ftr){
      $(internals.self).trigger({
        type: 'geocode',
        feature: ftr
      });
    };

    return function (options){
      var defaults = {
        el: 'map',
        includeGeocoder: true
      };

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      this.init = function(){
        internals.createMap();
      };

      this.toggleLayers = internals.toggleLayers;
    };

});