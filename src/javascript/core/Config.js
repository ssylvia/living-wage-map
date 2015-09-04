define(['jquery',
  'leaflet',
  'esri-leaflet'],
  function($,
    L){

    var internals = {
      config: {}
    };

    internals.config.dataFields = {
      counties: {
        locationName: 'countyname',
        stateName: 'state',
        singleAdultMinimumWage: 'F1A_minw_1',
        singleAdultLivingWage: 'F1A_inco_3',
        singleAdultWageGap: 'F1A_Gap',
        singleParentMinimumWage: 'F1A1C_mi_1',
        singleParentLivingWage: 'F1A1C_in_3',
        singleParentWageGap: 'F1A1C_Gap',
        workingParentMinimumWage: 'F1A1S2C__5',
        workingParentLivingWage: 'F1A1S2C__3',
        workingParentWageGap: 'F1A1S2C_Ga'
      },
      metro: {
        locationName: 'cbsa_name',
        stateName: 'state',
        singleAdultMinimumWage: 'F1A_minw_1',
        singleAdultLivingWage: 'F1A_inco_3',
        singleAdultWageGap: 'F1A_Gap',
        singleParentMinimumWage: 'F1A1C_mi_1',
        singleParentLivingWage: 'F1A1C_in_3',
        singleParentWageGap: 'F1A1C_Gap',
        workingParentMinimumWage: 'F1A1S2C__5',
        workingParentLivingWage: 'F1A1S2C__3',
        workingParentWageGap: 'F1A1S2C_Ga'
      }
    };

    // Main living wage invisible data layer
    internals.config.livingWageDataLayer = {
      counties: L.esri.featureLayer({
        url: 'http://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/LW_County_Select/FeatureServer/0',
        style: function(ftr){
          return {
            opacity: 0,
            fillOpacity: 0
          };
        },
        simplifyFactor: 0.5
      }),
      metro: L.esri.featureLayer({
        url: 'http://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/LW_Metro_Select/FeatureServer/0',
        where: 'top100=1',
        style: function(ftr){
          return {
            opacity: 0,
            fillOpacity: 0
          };
        },
        simplifyFactor: 0.5
      })
    };

    // Basemap layers
    internals.config.basemapLayers = {
      grayBasemap: L.esri.basemapLayer('Gray',{
        detectRetina: true,
        zIndex: 0
      }),
      grayLabels: L.esri.basemapLayer('GrayLabels',{
        detectRetina: true,
        zIndex: 2
      }),
      labels: L.esri.tiledMapLayer({
        url: 'http://arcgis.storymaps.esri.com/ArcGIS/rest/services/Diabetes/USA_State_County_Annotation/MapServer',
        // detectRetina: true,
        useCors: false,
        maxNativeZoom: 9,
        zIndex: 2
      })
    };

    internals.config.livingWageLayers = {
      counties: {
        singleAdult: {
          layerObj: L.esri.tiledMapLayer({
            url: 'http://tiles.arcgis.com/tiles/nzS0F0zdNLvs7nc8/arcgis/rest/services/LivingWageSingleAdultbyCounty_Tiled/MapServer',
            detectRetina: true,
            zIndex: 1
          })
        },
        singleParent: {
          layerObj: L.esri.tiledMapLayer({
            url: 'http://tiles.arcgis.com/tiles/nzS0F0zdNLvs7nc8/arcgis/rest/services/LivingWageSingleParentsOneChildbyCounty_Tiled/MapServer',
            detectRetina: true,
            zIndex: 1
          })
        },
        workingParent: {
          layerObj: L.esri.tiledMapLayer({
            url: 'http://tiles.arcgis.com/tiles/nzS0F0zdNLvs7nc8/arcgis/rest/services/LivingWageParentsOneSpouseTwoChildrenbyCounty_Tiled/MapServer',
            detectRetina: true,
            zIndex: 1
          })
        }
      },
      metro: {
        singleAdult: {
          layerObj: L.esri.tiledMapLayer({
            url: 'http://tiles.arcgis.com/tiles/nzS0F0zdNLvs7nc8/arcgis/rest/services/LivingWageofSingleAdultsbyMetro_Tiled/MapServer',
            detectRetina: true,
            zIndex: 1
          })
        },
        singleParent: {
          layerObj: L.esri.tiledMapLayer({
            url: 'http://tiles.arcgis.com/tiles/nzS0F0zdNLvs7nc8/arcgis/rest/services/LivingWageofSingleParentsOneChildbyMetro_Tiled/MapServer',
            detectRetina: true,
            zIndex: 1
          })
        },
        workingParent: {
          layerObj: L.esri.tiledMapLayer({
            url: 'http://tiles.arcgis.com/tiles/nzS0F0zdNLvs7nc8/arcgis/rest/services/LivingWageofSingleParentsSupportingSpouseTwoChildrenbyMetro_Tiled/MapServer',
            detectRetina: true,
            zIndex: 1
          })
        }
      }
    };

    // Map configuration
    internals.config.map = {
      leafletOptions: {
        layers: [
          internals.config.basemapLayers.grayBasemap,
          internals.config.livingWageLayers.counties.workingParent.layerObj,
          internals.config.basemapLayers.labels,
          internals.config.livingWageDataLayer.counties
        ],
        minZoom: 4,
        maxZoom: 10,
        maxBounds: [[72,-40],[5,-182]]
      },
      initialBounds: [[50.2,-66],[24.3,-127.7]]
    };

    internals.config.gapColors = function(value){
      switch (true){
        case (value <= -0.4):
          return '#1A9850';
        case (value <= -0.2):
          return '#91CF60';
        case (value <= 0):
          return '#D9EF8B';
        case (value <= 1.16):
          return '#FFFFCC';
        case (value <= 2.05):
          return '#FFEDB0';
        case (value <= 2.4):
          return '#FFE38A';
        case (value <= 2.94):
          return '#FED976';
        case (value <= 4):
          return '#FEC561';
        case (value <= 5.3):
          return '#FEB24C';
        case (value <= 12):
          return '#FD9E45';
        case (value <= 13):
          return '#FD8D3C';
        case (value <= 13.8):
          return '#FD6E35';
        case (value <= 14.5):
          return '#FC4E2A';
        case (value <= 15.3):
          return '#EA3127';
        case (value <= 16.2):
          return '#E31A1C';
        case (value <= 17):
          return '#D00C21';
        case (value <= 17.8):
          return '#BD0026';
        case (value <= 20):
          return '#A00026';
        default:
          return '#800026';
      }
    };

    return function (options){
      var defaults = {};

      internals.settings = $.extend(true,defaults,options);
      internals.self = this;

      this.get = function(arg){
        if (arg){
          return internals.config[arg];
        }
        else{
          return internals.config;
        }
      };

    };

});