define(['jquery',
  'modernizr',
  'shufflejs',
  'velocity'],
  function($,
    Modernizr,
    Shuffle,
    Velocity){

    var internals = {
      animating: false
    };

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

      var active = internals.wageGroups.filter('.active');
      var disabled = internals.wageGroups.not('.active');
      disabled.find('.active-hidden').velocity('slideDown',{
        duration: 0
      });
      disabled.find('.disabled-hidden').velocity('slideUp',{
        duration: 0
      });
      active.find('.active-hidden').velocity('slideUp',{
        duration: 0
      });
      active.find('.disabled-hidden').velocity('slideDown',{
        duration: 0
      });

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

      var sc = internals.settings.data.getSelectedClass();

      if (!internals.animating && sc !== selectedClass){

        internals.animating = true;
        var active = internals.wageGroups.filter('.active');
        var duration = 400;
        var complete = false;

        active.addClass('previous');

        active.find('.active-hidden').velocity('slideDown',{
          duration: duration
        });
        active.find('.disabled-hidden').velocity('slideUp',{
          duration: duration
        });
        el.find('.active-hidden').velocity('slideUp',{
          duration: duration
        });
        el.find('.disabled-hidden').velocity('slideDown',{
          duration: duration,
          begin: function(){
            active.removeClass('active');
            el.addClass('active');
          },
          progress: function(){
            // internals.settings.grid.shuffle('layout');
          },
          complete: function(){
            if (!complete){
              complete = true;
              var active = internals.wageGroups.filter('.active');
              var disabled = internals.wageGroups.not('.active');
              var disabledSort = disabled.sort(function(a,b){
                if ($(a).attr('data-title') > $(b).attr('data-title')) {
                  return 1;
                }
                if ($(a).attr('data-title') < $(b).attr('data-title')) {
                  return -1;
                }
                return 0;
              });

              var newSort = $.merge(active,disabledSort);
              newSort.each(function(index){
                $(this).attr('data-title',index);
              });

              internals.settings.grid.shuffle('sort',{
                by: function($el){
                  return $el.attr('data-title');
                }
              });
              setTimeout(function(){
                internals.animating = false;
              },internals.settings.grid.data('shuffle').speed);
            }
          }
        });

        internals.settings.data.selectClass(selectedClass);

      }

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

      if (!internals.firstSelect){
        internals.firstSelect = true;

        internals.settings.grid.shuffle('layout');
        internals.onLoad();
      }

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

      var grid = internals.settings.grid = internals.settings.el.find('.sort-grid');
      grid.shuffle({
        itemSelector: '.wage-group',
        speed: 350,
        gutterWidth: 336,
        columnWidth: 336
      });
      window.t = grid;

      this.init = function(){
        internals.createPane();
      };

      $(internals.settings.data).on('select',internals.updatePane);
    };

});