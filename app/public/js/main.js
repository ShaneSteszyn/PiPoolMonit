//
var app = angular.module('PoolMonit', ['ngMaterial', 'ngAnimate', 'ngSanitize', 'ngRoute', 'ngMdIcons']);

app.config(function ($mdThemingProvider) {
  $mdThemingProvider.definePalette('customPrimary', { // orange
    '50':   'FFF3E0',
    '100':  'FFE0B2',
    '200':  'FFCC80',
    '300':  'FFB74D',
    '400':  'FFA726',
    '500':  'FF9800',
    '600':  'FB8C00',
    '700':  'F57C00',
    '800':  'EF6C00',
    '900':  'E65100',
    'A100': 'FFD180',
    'A200': 'FFAB40',
    'A400': 'FF9100',
    'A700': 'FF6D00',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });

  $mdThemingProvider.definePalette('customSecondary', { // purple
    '50':   'F3E5F5',
    '100':  'E1BEE7',
    '200':  'CE93D8',
    '300':  'BA68C8',
    '400':  'AB47BC',
    '500':  '9C27B0',
    '600':  '8E24AA',
    '700':  '7B1FA2',
    '800':  '6A1B9A',
    '900':  '4A148C',
    'A100': '9575CD',
    'A200': '9575CD',
    'A400': '9575CD',
    'A700': '9575CD',
    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                        // on this palette should be dark or light
    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
    'contrastLightColors': undefined    // could also specify this if default was 'dark'
  });


  $mdThemingProvider.theme('default')
    .primaryPalette('customPrimary')
    .accentPalette('customSecondary');

});

app.config(['$routeProvider', '$httpProvider',  function($router, $httpProvider) {
  $router
   .when('/', {
      templateUrl: 'templates/temps.html'
    })
  .otherwise({
    controller: 'MainCtrl',
    redirectTo: '/',
    templateURL: 'templates/temps.html'
  });

}]);

