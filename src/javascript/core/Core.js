define(['jquery',
  'app/utils/Helper',
  'app/core/Data',
  'app/ui/Intro',
  'app/ui/Map',
  'app/ui/Tooltip',
  'app/ui/StatisticsPane',
  'jquery-mousewheel'],
  function($,
    Helper,
    Data,
    Intro,
    Map,
    Tooltip,
    StatisticsPane){

    var internals = {
      appLoaded: false,
      data: new Data()
    };

    internals.loadedComponents = {
      intro: false,
      map: false,
      statisticsPane: false,
      tooltip: false,
      data: false
    };

    internals.init = function(){
      var helper = internals.helper = new Helper();
      helper.enableRegionLayout();

      // initialize components
      internals.loadIntro();
      internals.loadMap();
      internals.loadTooltip();
      internals.loadStatisticsPane();

      // Data Events
      $(internals.data).on('data-ready',internals.dataReady);
      $(internals.data).on('select-class',internals.selectClass);
      $(internals.data).on('before-data-layer-change',internals.toggleDataLayers);

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

    internals.loadTooltip = function(){
      var tooltip = internals.tooltip = new Tooltip({
        data: internals.data
      });
      $(tooltip).on('load',function(){
        internals.loadedComponents.tooltip = true;
        internals.appReady();
      });
      tooltip.init();
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

    internals.dataReady = function(){
      internals.loadedComponents.data = true;
      internals.appReady();
    };

    internals.appReady = function(){
      var ready = internals.checkReadyState();

      if (!internals.appLoaded && ready){
        internals.appLoaded = true;

        internals.helper.resetRegionLayout();

        $('.loading-wrapper').velocity('fadeOut',{
          duration: 750,
          complete: function(){
            $('.explore-wrapper').velocity({
              opacity: 0.65
            },{
              duration: 750
            });
          }
        });

        $('.explore-wrapper').click(function(){
          internals.intro.hide();
        });

        $(document).keydown(function(e){
          if (e.keyCode === 13 || e.keyCode === 27 || e.keyCode === 40) {
            internals.intro.hide();
          }
        });

        $('.intro').mousewheel(function(e){
          if (e.deltaY < 0){
            internals.intro.hide();
          }
        });

        $(document).keydown(function(e){
          if (e.keyCode === 38) {
            internals.intro.show();
          }
        });

        $('.county-toggle-wrapper .btn-toggle').click(function(){
          if ($(this).hasClass('county-toggle')){
            internals.data.toggleCounties(true);
          }
          else{
            internals.data.toggleCounties(false);
          }
        });
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
      internals.map.toggleLayers(e.layers.current,e.layers.previous,750);
    };

    internals.toggleDataLayers = function(e){
      internals.map.toggleLayers(e.labelsLayers.current,e.labelsLayers.previous,750);
      internals.map.toggleLayers(e.dataLayers.current,e.dataLayers.previous,0);
    };

    (function(){
      internals.init();
    })();

});