define(['jquery',
  'app/utils/Helper',
  'app/core/Data',
  'app/ui/Intro',
  'app/ui/Map'],
  function($,
    Helper,
    Data,
    Intro,
    Map){

    var internals = {
      appLoaded: false,
      data: new Data()
    };

    internals.loadedComponents = {
      intro: false,
      map: false
    };

    internals.init = function(){
      var helper = internals.helper = new Helper();
      helper.enableRegionLayout();

      // initialize components
      internals.loadIntro();
      internals.loadMap();
    };

    internals.loadIntro = function(){
      var intro = internals.intro = new Intro({
        data: internals.data,
        config: internals.data.getConfig('intro')
      });
      $(intro).on('load',function(){
        internals.loadedComponents.intro = true;
        internals.appReady();
      });
      intro.init();
    };

    internals.loadMap = function(){
      var map = internals.map = new Map({
        data: internals.data,
        config: internals.data.getConfig('map')
      });
      $(map).on('load',function(){
        internals.loadedComponents.map = true;
        internals.appReady();
      });
      map.init();
    };

    internals.appReady = function(){
      var ready = internals.checkReadyState();

      if (!internals.appLoaded && ready){
        internals.appLoaded = true;

        // TODO: move to button action
        setTimeout(function(){
          internals.intro.hide();
        },2000);
      }
    };

    internals.checkReadyState = function(){
      var ready = true;
      var components = internals.loadedComponents;

      $.each(components,function(){
        if (!this){
          ready = false;
        }
      });

      return ready;
    };

    (function(){
      internals.init();
    })();

});