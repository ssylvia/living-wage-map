define(['jquery',
  'app/utils/Helper',
  'app/core/Data',
  'app/ui/Intro',
  'app/ui/Map',
  'app/ui/StatisticsPane'],
  function($,
    Helper,
    Data,
    Intro,
    Map,
    StatisticsPane){

    var internals = {
      appLoaded: false,
      data: new Data()
    };

    internals.loadedComponents = {
      intro: false,
      map: false,
      statisticsPane: false,
      data: false
    };

    internals.init = function(){
      var helper = internals.helper = new Helper();
      helper.enableRegionLayout();

      // initialize components
      internals.loadIntro();
      internals.loadMap();
      internals.loadStatisticsPane();

      $(internals.data).on('select-class',internals.selectClass);

      $(internals.data).on('data-ready',function(){
        internals.loadedComponents.data = true;
        internals.appReady();
      });
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

    internals.loadStatisticsPane = function(){
      var statisticsPane = internals.statisticsPane = new StatisticsPane({
        data: internals.data
      });
      $(statisticsPane).on('load',function(){
        internals.loadedComponents.statisticsPane = true;
        internals.appReady();
      });
      statisticsPane.init();
    };

    internals.load = function(){
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

        internals.helper.resetRegionLayout();

        // TODO: move to button action
        // setTimeout(function(){
          internals.intro.hide();
        // },2000);
      }
    };

    internals.checkReadyState = function(){
      var ready = true;
      var components = internals.loadedComponents;

      $.each(components,function(){
        if (!this.valueOf()){
          ready = false;
        }
      });

      return ready;
    };

    internals.selectClass = function(e){
      internals.map.toggleLayers(e.layers.current,e.layers.previous,500);
    };

    (function(){
      internals.init();
    })();

});