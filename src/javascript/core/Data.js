define(['jquery',
  'app/core/Config'],
  function($,
    Config){

    var internals = {
      config: new Config(),
      countyDisplay: true
    };

    internals.dataLayer = internals.config.get('livingWageDataLayer');
    internals.dataFields = internals.config.get('dataFields');
    internals.countyFields = internals.dataFields.counties;

    internals.dataLayer.on('load',function(){
      internals.dataLayer.eachFeature(function(ftr){
        ftr.on('mouseover',function(){
          internals.select(ftr.feature);
        });
      });
    });

    internals.select = function(ftr){
      internals.previousFtr = internals.currentFtr;
      internals.currentFtr = ftr;
      internals.currentStats = internals.generateStats(ftr);

      console.log(internals.currentStats);

      $(internals.self).trigger({
        type: 'select',
        feature: internals.currentFtr,
        statistics: internals.currentStats
      });
    };

    internals.generateStats = function(ftr){
      var stats;
      if (internals.countyDisplay){
        stats = {
          location: ftr.properties[internals.countyFields.locationName],
          state: ftr.properties[internals.countyFields.stateName],
          locationFull: ftr.properties[internals.countyFields.locationName] + ', ' + ftr.properties[internals.countyFields.stateName],
          singleAdult: {
            minimumWage: ftr.properties[internals.countyFields.singleAdultMinimumWage],
            livingWage: ftr.properties[internals.countyFields.singleAdultMinimumWage],
            wageGap: ftr.properties[internals.countyFields.singleAdultWageGap]
          },
          singleParent: {
            minimumWage: ftr.properties[internals.countyFields.singleParentMinimumWage],
            livingWage: ftr.properties[internals.countyFields.singleParentMinimumWage],
            wageGap: ftr.properties[internals.countyFields.singleParentWageGap]
          },
          workingParent: {
            minimumWage: ftr.properties[internals.countyFields.workingParentMinimumWage],
            livingWage: ftr.properties[internals.countyFields.workingParentMinimumWage],
            wageGap: ftr.properties[internals.countyFields.workingParentWageGap]
          }
        };
      }

      return stats;
    };

    return function (options){
      var defaults = {};

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      this.getConfig = function(arg){
        return internals.config.get(arg);
      };

    };

});