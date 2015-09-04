var Confidence = require('confidence');

var internals = {};

exports.get = internals.App = function (key, criteria) {

  this.store = new Confidence.Store({
    meta: {
      title: {
        $filter: 'mode',
        development: 'DEV: The Living Wage Map',
        $default: 'The Living Wage Map'
      },
      keywords: 'Living Wage Map, MIT, Story Map',
      description: 'MIT’s Living Wage Calculator estimates the cost of living ("living wage") in each of the nation\'s counties and major metropolitan areas, and compares it to the minimum wage for a variety of household types. Mapped here are three types: parent with spouse and two children, single parent with one child, and single adult.',
      url: 'http://storymaps.esri.com/stories/2015/living-wage-map',
      thumbnail: 'http://storymaps.esri.com/stories/2015/living-wage-map/resources/images/meta/thumbnail.png',
      twitterHandle: 'EsriStoryMaps',
      googleAnalytics: 'UA-26529417-1'
    }
  });

  return this.store.get(key, criteria);
};