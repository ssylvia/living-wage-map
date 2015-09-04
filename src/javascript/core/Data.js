define(['jquery',
  'app/core/Config'],
  function($,
    Config){

    var internals = {
      config: new Config(),
      firstLoad: true,
      countyDisplay: false,
      selectedClass: 'workingParent',
      layers: {
        previous: false,
        current: false
      },
      extremes: {
        min: false,
        max: false,
        useExtremes: false
      },
      dataLayers: {},
      labelsLayers: {}
    };

    internals.dataFields = internals.config.get('dataFields');

    internals.changeDataLayer = function(layer,countyToggle){
      var firstLoad = true;
      internals.dataLayers.previous = internals.dataLayers.current ? internals.dataLayers.current : false;
      internals.dataLayers.current = layer;
      internals.labelsLayers.previous = internals.labelsLayers.current ? internals.labelsLayers.current : false;
      internals.labelsLayers.current = internals.countyDisplay ? internals.config.get('basemapLayers').labels : internals.config.get('basemapLayers').grayLabels;
      internals.extremes.min = false;
      internals.extremes.max = false;

      internals.onBeforeDataLayerChange();

      internals.selectClass(internals.selectedClass,countyToggle);

      internals.dataLayers.current.on('load',function(){

        if (firstLoad){

          firstLoad = false;
          if (internals.firstLoad){
            internals.firstLoad = false;
            $(internals.config.get('basemapLayers').labels.getContainer()).addClass('living-wage-labels-layer');
          }

          internals.dataLayers.current.eachFeature(function(ftr){

            ftr.on('mouseover',function(){
              ftr.setStyle({
                opacity: 1,
                color: '#333',
                weight: 2
              });
              internals.onTooltipShow();
              internals.select(ftr.feature);
              clearTimeout(internals.mouseout);
            });

            ftr.on('mouseout',function(){
              ftr.setStyle({
                opacity: 0
              });
              internals.onTooltipHide();
              clearTimeout(internals.mouseout);
              internals.mouseout = setTimeout(function(){
                if (internals.geocodeLocation){
                  internals.selectByLocation(internals.geocodeLocation);
                }
              },200);
            });

            ftr.on('mousemove',function(e){
              internals.onHoverPostionChange(e.containerPoint);
            });

            internals.calculateExtremes(ftr.feature);

            if (internals.countyDisplay && ftr.feature.properties[internals.dataFields.counties.stateName] === 'District of Columbia'){
              internals.select(ftr.feature);
            }
            else if (!internals.countyDisplay && ftr.feature.properties[internals.dataFields.metro.stateName] === 'District of Columbia'){
              internals.select(ftr.feature);
            }
            internals.onDataReady();
          });
        }
      });
    };

    internals.calculateExtremes = function(ftr){
      // if (!internals.extremes.min){
      //   internals.extremes.min = ftr.properties[internals.dataFields.counties.singleAdultMinimumWage];
      // }
      if (!internals.extremes.max){
        internals.extremes.max = ftr.properties[internals.dataFields.counties.singleAdultMinimumWage];
      }

      // internals.extremes.min = Math.min(internals.extremes.min,
      //   ftr.properties[internals.dataFields.counties.singleAdultMinimumWage],
      //   ftr.properties[internals.dataFields.counties.singleAdultLivingWage],
      //   ftr.properties[internals.dataFields.counties.singleParentMinimumWage],
      //   ftr.properties[internals.dataFields.counties.singleParentLivingWage],
      //   ftr.properties[internals.dataFields.counties.workingParentMinimumWage],
      //   ftr.properties[internals.dataFields.counties.workingParentLivingWage]);

      internals.extremes.max = Math.max(internals.extremes.max,
        ftr.properties[internals.dataFields.counties.singleAdultMinimumWage],
        ftr.properties[internals.dataFields.counties.singleAdultLivingWage],
        ftr.properties[internals.dataFields.counties.singleParentMinimumWage],
        ftr.properties[internals.dataFields.counties.singleParentLivingWage],
        ftr.properties[internals.dataFields.counties.workingParentMinimumWage],
        ftr.properties[internals.dataFields.counties.workingParentLivingWage]);
    };

    internals.generateStats = function(ftr){
      var countyStr = internals.countyDisplay ? 'counties' : 'metro';
      var stats = {
        location: ftr.properties[internals.dataFields[countyStr].locationName],
        state: ftr.properties[internals.dataFields[countyStr].stateName],
        locationFull: !countyStr ? ftr.properties[internals.dataFields[countyStr].locationName] : ftr.properties[internals.dataFields[countyStr].locationName] + (ftr.properties[internals.dataFields[countyStr].stateName] === 'District of Columbia' ? '' : (', ' + ftr.properties[internals.dataFields[countyStr].stateName])),
        singleAdult: {
          minimumWage: ftr.properties[internals.dataFields[countyStr].singleAdultMinimumWage],
          livingWage: ftr.properties[internals.dataFields[countyStr].singleAdultLivingWage],
          wageGap: ftr.properties[internals.dataFields[countyStr].singleAdultWageGap]
        },
        singleParent: {
          minimumWage: ftr.properties[internals.dataFields[countyStr].singleParentMinimumWage],
          livingWage: ftr.properties[internals.dataFields[countyStr].singleParentLivingWage],
          wageGap: ftr.properties[internals.dataFields[countyStr].singleParentWageGap]
        },
        workingParent: {
          minimumWage: ftr.properties[internals.dataFields[countyStr].workingParentMinimumWage],
          livingWage: ftr.properties[internals.dataFields[countyStr].workingParentLivingWage],
          wageGap: ftr.properties[internals.dataFields[countyStr].workingParentWageGap]
        }
      };

      return stats;
    };

    internals.select = function(ftr){
      internals.previousFtr = internals.currentFtr;
      internals.currentFtr = ftr;
      internals.currentStats = internals.generateStats(ftr);

      internals.onSelect();
    };

    internals.selectClass = function(selectedClass,countyToggle){
      if (internals.selectedClass != selectedClass || countyToggle){
        internals.selectedClass = selectedClass;
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
      }
    };

    internals.toggleCounties = function(showCounties){
      if (showCounties !== internals.countyDisplay && showCounties){
        internals.countyDisplay = showCounties;
        internals.changeDataLayer(internals.config.get('livingWageDataLayer').counties,true);
        $('.county-toggle-wrapper .btn-toggle').removeClass('active');
        $('.county-toggle-wrapper .btn-toggle.county-toggle').addClass('active');
      }
      else if (showCounties !== internals.countyDisplay && !showCounties){
        internals.countyDisplay = showCounties;
        internals.changeDataLayer(internals.config.get('livingWageDataLayer').metro,true);
        $('.county-toggle-wrapper .btn-toggle').removeClass('active');
        $('.county-toggle-wrapper .btn-toggle.metro-toggle').addClass('active');
      }
    };

    internals.selectByLocation = function(latLng){
      internals.geocodeLocation = latLng;
      internals.dataLayers.current.query().contains(latLng).run(function(err,res){
        if(!err && res.features[0]){
          internals.select(res.features[0]);
        }
      });
    };

    internals.onSelect = function(){
      $(internals.self).trigger({
        type: 'select',
        extremes: internals.extremes,
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

    internals.onDataReady = function(){
      $(internals.self).trigger('data-ready');
    };

    internals.onBeforeDataLayerChange = function(){
      $(internals.self).trigger({
        type: 'before-data-layer-change',
        dataLayers: internals.dataLayers,
        labelsLayers: internals.labelsLayers
      });
    };

    internals.onTooltipHide = function(){
      $(internals.self).trigger('tooltip-hide');
    };

    internals.onTooltipShow = function(){
      $(internals.self).trigger('tooltip-show');
    };

    internals.onHoverPostionChange = function(point){
      $(internals.self).trigger({
        type: 'hover-position-change',
        hoverPosition: point
      });
    };

    (function(){
      internals.toggleCounties(true);
    })();

    window.useExtremes = function(arg){
      internals.extremes.useExtremes = arg;
    };

    return function (options){
      var defaults = {};

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      this.getConfig = function(arg){
        return internals.config.get(arg);
      };

      this.getSelectedClass = function(){
        return internals.selectedClass;
      };

      this.clearGeocode = function(){
        internals.geocodeLocation = false;
      };

      this.selectClass = internals.selectClass;

      this.toggleCounties = internals.toggleCounties;

      this.selectByLocation = internals.selectByLocation;

    };

});