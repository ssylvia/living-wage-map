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
      // Require Plugins
      'text': 'lib/text/text',
      'css': 'lib/require-css/css',
      'css-builder': 'lib/require-css/css-builder',
      'normalize': 'lib/require-css/normalize'
    },
    shim: {
      'velocity':{
        deps: ['jquery']
      },
      'leaflet': {
        deps: ['css!lib/leaflet/leaflet.css'],
        exports: 'L'
      },
      'esri-leaflet': {
        exports: 'L'
      }
    }
  });

  return this.store.get(key, criteria);
};