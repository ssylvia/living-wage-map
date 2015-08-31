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
      internals.workingParentMinimumWageBar = internals.pane.find('.working-parent .minimum-wage-col .graph-bar');
      internals.workingParentLivingWageBar = internals.pane.find('.working-parent .living-wage-col .graph-bar');
      internals.workingParentWageGapBar = internals.pane.find('.working-parent .wage-gap-col .graph-bar');
      internals.workingParentWageGapBarSpacer = internals.pane.find('.working-parent .wage-gap-col .graph-bar-spacer');

      // Single Parent
      internals.singleParent = internals.pane.find('.wage-group.single-parent');
      internals.singleParentWageGapCol = internals.pane.find('.single-parent .wage-gap-col');
      internals.singleParentMinimumWage = internals.pane.find('.single-parent .minimum-wage-col .stat-value');
      internals.singleParentLivingWage = internals.pane.find('.single-parent .living-wage-col .stat-value');
      internals.singleParentWageGap = internals.pane.find('.single-parent .wage-gap-col .stat-value');
      internals.singleParentMinimumWageBar = internals.pane.find('.single-parent .minimum-wage-col .graph-bar');
      internals.singleParentLivingWageBar = internals.pane.find('.single-parent .living-wage-col .graph-bar');
      internals.singleParentWageGapBar = internals.pane.find('.single-parent .wage-gap-col .graph-bar');
      internals.singleParentWageGapBarSpacer = internals.pane.find('.single-parent .wage-gap-col .graph-bar-spacer');

      // Single Adult
      internals.singleAdult = internals.pane.find('.wage-group.single-adult');
      internals.singleAdultWageGapCol = internals.pane.find('.single-adult .wage-gap-col');
      internals.singleAdultMinimumWage = internals.pane.find('.single-adult .minimum-wage-col .stat-value');
      internals.singleAdultLivingWage = internals.pane.find('.single-adult .living-wage-col .stat-value');
      internals.singleAdultWageGap = internals.pane.find('.single-adult .wage-gap-col .stat-value');
      internals.singleAdultMinimumWageBar = internals.pane.find('.single-adult .minimum-wage-col .graph-bar');
      internals.singleAdultLivingWageBar = internals.pane.find('.single-adult .living-wage-col .graph-bar');
      internals.singleAdultWageGapBar = internals.pane.find('.single-adult .wage-gap-col .graph-bar');
      internals.singleAdultWageGapBarSpacer = internals.pane.find('.single-adult .wage-gap-col .graph-bar-spacer');

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
      // Chart
      var wpMax = e.extremes.useExtremes ? e.extremes.max : Math.max(e.statistics.workingParent.minimumWage,e.statistics.workingParent.livingWage);
      var wpMinWage = Math.floor((e.statistics.workingParent.minimumWage/wpMax)*100);
      var wpLivWage = Math.floor((e.statistics.workingParent.livingWage/wpMax)*100);
      var wpGap = Math.abs(wpLivWage - wpMinWage);
      var wpSpacer = wpLivWage >= wpMinWage ? wpMinWage : wpLivWage;
      internals.workingParentMinimumWageBar.css('height', wpMinWage + '%');
      internals.workingParentLivingWageBar.css('height', wpLivWage + '%');
      internals.workingParentWageGapBar.css({
        'height': wpGap + '%',
        'bottom': wpSpacer + '%'
      });

      // Single Parent
      internals.singleParentWageGapCol.attr('data-positive-gap',e.statistics.singleParent.wageGap < 0);
      internals.singleParentMinimumWage.html(internals.formatMoney(e.statistics.singleParent.minimumWage,true));
      internals.singleParentLivingWage.html(internals.formatMoney(e.statistics.singleParent.livingWage,true));
      internals.singleParentWageGap.html(internals.formatMoney(e.statistics.singleParent.wageGap,true));
      // Chart
      var spMax = e.extremes.useExtremes ? e.extremes.max : Math.max(e.statistics.singleParent.minimumWage,e.statistics.singleParent.livingWage);
      var spMinWage = Math.floor((e.statistics.singleParent.minimumWage/spMax)*100);
      var spLivWage = Math.floor((e.statistics.singleParent.livingWage/spMax)*100);
      var spGap = Math.abs(spLivWage - spMinWage);
      var spSpacer = spLivWage >= spMinWage ? spMinWage : spLivWage;
      internals.singleParentMinimumWageBar.css('height', spMinWage + '%');
      internals.singleParentLivingWageBar.css('height', spLivWage + '%');
      internals.singleParentWageGapBar.css({
        'height': spGap + '%',
        'bottom': spSpacer + '%'
      });

      // Single Adult
      internals.singleAdultWageGapCol.attr('data-positive-gap',e.statistics.singleAdult.wageGap < 0);
      internals.singleAdultMinimumWage.html(internals.formatMoney(e.statistics.singleAdult.minimumWage,true));
      internals.singleAdultLivingWage.html(internals.formatMoney(e.statistics.singleAdult.livingWage,true));
      internals.singleAdultWageGap.html(internals.formatMoney(e.statistics.singleAdult.wageGap,true));
      // Chart
      var saMax = e.extremes.useExtremes ? e.extremes.max : Math.max(e.statistics.singleAdult.minimumWage,e.statistics.singleAdult.livingWage);
      var saMinWage = Math.floor((e.statistics.singleAdult.minimumWage/saMax)*100);
      var saLivWage = Math.floor((e.statistics.singleAdult.livingWage/saMax)*100);
      var saGap = Math.abs(saLivWage - saMinWage);
      var saSpacer = saLivWage >= saMinWage ? saMinWage : saLivWage;
      internals.singleAdultMinimumWageBar.css('height', saMinWage + '%');
      internals.singleAdultLivingWageBar.css('height', saLivWage + '%');
      internals.singleAdultWageGapBar.css({
        'height': saGap + '%',
        'bottom': saSpacer + '%'
      });
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