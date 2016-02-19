requirejs.config({
  baseUrl: '.',
  paths: {
    jquery: '../../node_modules/jquery/dist/jquery',
    underscore: '../../node_modules/underscore/underscore',
    backbone: '../../node_modules/backbone/backbone',
    app: '/scripts/dist/app'
  }
});

require(['app'], (App) => {
  App.initialize();
});
