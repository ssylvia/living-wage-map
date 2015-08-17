define(['jquery',
  'app/core/Config'],
  function($,
    Config){

    var internals = {
      config: new Config()
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