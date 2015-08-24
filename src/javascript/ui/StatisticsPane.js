define(['jquery'],
  function($){

    var internals = {};

    internals.createPane = function(){
      internals.pane = internals.settings.el;
      internals.locationName = internals.pane.find('.location-name');

      // Wage Gap Heading
      internals.mainWageGapCol = internals.pane.find('.wage-headings .wage-gap-col');

      internals.wageGroups = internals.pane.find('.wage-group');

      // Working Parent
      internals.workingParent = internals.pane.find('.wage-group.working-parent');
      internals.workingParentWageGapCol = internals.pane.find('.working-parent .wage-gap-col');
      internals.workingParentMinimumWage = internals.pane.find('.working-parent .minimum-wage-col .stat-value');
      internals.workingParentLivingWage = internals.pane.find('.working-parent .living-wage-col .stat-value');
      internals.workingParentWageGap = internals.pane.find('.working-parent .wage-gap-col .stat-value');

      // Single Parent
      internals.singleParent = internals.pane.find('.wage-group.single-parent');
      internals.singleParentWageGapCol = internals.pane.find('.single-parent .wage-gap-col');
      internals.singleParentMinimumWage = internals.pane.find('.single-parent .minimum-wage-col .stat-value');
      internals.singleParentLivingWage = internals.pane.find('.single-parent .living-wage-col .stat-value');
      internals.singleParentWageGap = internals.pane.find('.single-parent .wage-gap-col .stat-value');

      // Single Adult
      internals.singleAdult = internals.pane.find('.wage-group.single-adult');
      internals.singleAdultWageGapCol = internals.pane.find('.single-adult .wage-gap-col');
      internals.singleAdultMinimumWage = internals.pane.find('.single-adult .minimum-wage-col .stat-value');
      internals.singleAdultLivingWage = internals.pane.find('.single-adult .living-wage-col .stat-value');
      internals.singleAdultWageGap = internals.pane.find('.single-adult .wage-gap-col .stat-value');

      internals.addSelectEvents();

      internals.onLoad();
    };

    internals.addSelectEvents = function(){

      internals.workingParent.click(function(){
        internals.selectClass($(this),'workingParent');
      });

      internals.singleParent.click(function(){
        internals.selectClass($(this),'singleParent');
      });

      internals.singleAdult.click(function(){
        internals.selectClass($(this),'singleAdult');
      });

    };

    internals.selectClass = function(el,selectedClass){

      internals.wageGroups.removeClass('active');
      el.addClass('active');

      internals.settings.data.selectClass(selectedClass);

    };

    internals.onLoad = function(){
      $(internals.self).trigger('load');
    };

    internals.updatePane = function(e){
      internals.locationName.text(e.statistics.locationFull);

      internals.mainWageGapCol.attr('data-positive-gap',e.statistics[e.selectedClass].wageGap < 0);

      // Working Parent
      internals.workingParentWageGapCol.attr('data-positive-gap',e.statistics.workingParent.wageGap < 0);
      internals.workingParentMinimumWage.html(internals.formatMoney(e.statistics.workingParent.minimumWage,true));
      internals.workingParentLivingWage.html(internals.formatMoney(e.statistics.workingParent.livingWage,true));
      internals.workingParentWageGap.html(internals.formatMoney(e.statistics.workingParent.wageGap,true));

      // Single Parent
      internals.singleParentWageGapCol.attr('data-positive-gap',e.statistics.singleParent.wageGap < 0);
      internals.singleParentMinimumWage.html(internals.formatMoney(e.statistics.singleParent.minimumWage,true));
      internals.singleParentLivingWage.html(internals.formatMoney(e.statistics.singleParent.livingWage,true));
      internals.singleParentWageGap.html(internals.formatMoney(e.statistics.singleParent.wageGap,true));

      // Single Adult
      internals.singleAdultWageGapCol.attr('data-positive-gap',e.statistics.singleAdult.wageGap < 0);
      internals.singleAdultMinimumWage.html(internals.formatMoney(e.statistics.singleAdult.minimumWage,true));
      internals.singleAdultLivingWage.html(internals.formatMoney(e.statistics.singleAdult.livingWage,true));
      internals.singleAdultWageGap.html(internals.formatMoney(e.statistics.singleAdult.wageGap,true));
    };

    internals.formatMoney = function(value,includeSymbol){
      var currency = includeSymbol ? '$' : '';
      return currency + Math.abs(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    };

    return function (options){
      var defaults = {
        el: $('.statistics-pane'),
      };

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      this.init = function(){
        internals.createPane();
      };

      $(internals.settings.data).on('select',internals.updatePane);
    };

});