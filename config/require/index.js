var Confidence = require('confidence');

var internals = {};

exports.get = internals.Require = function (key, criteria) {

  this.store = new Confidence.Store({
    baseUrl: {
      $filter: 'mode',
      dist: 'src/',
      default: ''
    },
    paths: {
      'app': 'javascript',
      'jquery': 'lib/jquery/dist/jquery.min',
      'velocity': 'lib/velocity/velocity',
      'leaflet': 'lib/leaflet/leaflet',
      'esri-leaflet': 'lib/esri-leaflet/dist/esri-leaflet',
      'esri-leaflet-geocoder': 'lib/esri-leaflet-geocoder/dist/esri-leaflet-geocoder',
      'modernizr': 'lib/shufflejs/dist/modernizr.custom.min',
      'shufflejs': 'lib/shufflejs/dist/jquery.shuffle.min',
      // Require Plugins
      'text': 'lib/text/text',
      'css': 'lib/require-css/css',
      'css-builder': 'lib/require-css/css-builder',
      'normalize': 'lib/require-css/normalize'
    },
    shim: {
      'velocity':{
        deps: ['jquery'],
        exports: '$.fn.velocity'
      },
      'leaflet': {
        deps: ['css!lib/leaflet/leaflet.css'],
        exports: 'L'
      },
      'esri-leaflet': {
        deps: ['leaflet'],
        exports: 'L'
      },
      'esri-leaflet-geocoder': {
        deps: ['leaflet','esri-leaflet','css!lib/esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'],
        exports: 'L'
      },
      'modernizr': {
        exports: 'Modernizr'
      },
      'shufflejs': {
        deps: ['jquery','modernizr'],
        exports: ['Shuffle','$.fn.shuffle']
      }
    }
  });

  return this.store.get(key, criteria);
};