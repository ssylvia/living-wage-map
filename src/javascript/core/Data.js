define(['jquery',
  'app/core/Config'],
  function($,
    Config){

    var internals = {
      config: new Config(),
      firstLoad: true,
      countyDisplay: true,
      selectedClass: 'workingParent',
      extremes: {
        // min: false,
        max: false
      },
      layers: {
        previous: false,
        current: false
      }
    };

    internals.layers.current = internals.config.get('livingWageLayers').counties.workingParent.layerObj;

    internals.dataLayer = internals.config.get('livingWageDataLayer');
    internals.dataFields = internals.config.get('dataFields');
    internals.countyFields = internals.dataFields.counties;

    internals.dataLayer.on('load',function(){

      if (internals.firstLoad){
        $(internals.config.get('basemapLayers').labels.getContainer()).addClass('living-wage-labels-layer');
        internals.firstLoad = false;
        internals.dataLayer.eachFeature(function(ftr){
          ftr.on('mouseover',function(){
            internals.select(ftr.feature);
          });

          internals.calculateExtremes(ftr.feature);

          if (ftr.feature.properties[internals.countyFields.stateName] === 'District of Columbia'){
            internals.select(ftr.feature);
          }
        });
      }
    });

    internals.calculateExtremes = function(ftr){
      // if (!internals.extremes.min){
      //   internals.extremes.min = ftr.properties[internals.countyFields.singleAdultMinimumWage];
      // }
      if (!internals.extremes.max){
        internals.extremes.max = ftr.properties[internals.countyFields.singleAdultMinimumWage];
      }

      // internals.extremes.min = Math.min(internals.extremes.min,
      //   ftr.properties[internals.countyFields.singleAdultMinimumWage],
      //   ftr.properties[internals.countyFields.singleAdultLivingWage],
      //   ftr.properties[internals.countyFields.singleParentMinimumWage],
      //   ftr.properties[internals.countyFields.singleParentLivingWage],
      //   ftr.properties[internals.countyFields.workingParentMinimumWage],
      //   ftr.properties[internals.countyFields.workingParentLivingWage]);

      internals.extremes.max = Math.max(internals.extremes.max,
        ftr.properties[internals.countyFields.singleAdultMinimumWage],
        ftr.properties[internals.countyFields.singleAdultLivingWage],
        ftr.properties[internals.countyFields.singleParentMinimumWage],
        ftr.properties[internals.countyFields.singleParentLivingWage],
        ftr.properties[internals.countyFields.workingParentMinimumWage],
        ftr.properties[internals.countyFields.workingParentLivingWage]);
    };

    internals.generateStats = function(ftr){
      var stats;
      if (internals.countyDisplay){
        stats = {
          location: ftr.properties[internals.countyFields.locationName],
          state: ftr.properties[internals.countyFields.stateName],
          locationFull: ftr.properties[internals.countyFields.locationName] + (ftr.properties[internals.countyFields.stateName] === 'District of Columbia' ? '' : (', ' + ftr.properties[internals.countyFields.stateName])),
          singleAdult: {
            minimumWage: ftr.properties[internals.countyFields.singleAdultMinimumWage],
            livingWage: ftr.properties[internals.countyFields.singleAdultLivingWage],
            wageGap: ftr.properties[internals.countyFields.singleAdultWageGap]
          },
          singleParent: {
            minimumWage: ftr.properties[internals.countyFields.singleParentMinimumWage],
            livingWage: ftr.properties[internals.countyFields.singleParentLivingWage],
            wageGap: ftr.properties[internals.countyFields.singleParentWageGap]
          },
          workingParent: {
            minimumWage: ftr.properties[internals.countyFields.workingParentMinimumWage],
            livingWage: ftr.properties[internals.countyFields.workingParentLivingWage],
            wageGap: ftr.properties[internals.countyFields.workingParentWageGap]
          }
        };
      }

      return stats;
    };

    internals.select = function(ftr){
      internals.previousFtr = internals.currentFtr;
      internals.currentFtr = ftr;
      internals.currentStats = internals.generateStats(ftr);

      internals.onSelect();
    };

    internals.selectClass = function(selectedClass){
      var countyStr = internals.countyDisplay ? 'counties' : 'metro';
      var classStr;

      if (selectedClass === 'workingParent'){
        classStr = 'working-parent';
      }
      else if (selectedClass === 'singleParent'){
        classStr = 'single-parent';
      }
      else{
        classStr = 'single-adult';
      }

      internals.layers.previous = internals.layers.current;
      internals.layers.current = internals.config.get('livingWageLayers')[countyStr][selectedClass].layerObj;

      $('.map').attr('data-active-layer',classStr + '-' + countyStr);

      internals.onSelectClass();
    };

    internals.onSelect = function(){
      $(internals.self).trigger({
        type: 'select',
        selectedClass: internals.selectedClass,
        countyDisplay: internals.countyDisplay,
        feature: internals.currentFtr,
        statistics: internals.currentStats
      });
    };

    internals.onSelectClass = function(){
      $(internals.self).trigger({
        type: 'select-class',
        layers: internals.layers
      });
    };

    return function (options){
      var defaults = {};

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      this.getConfig = function(arg){
        return internals.config.get(arg);
      };

      this.selectClass = internals.selectClass;

    };

});