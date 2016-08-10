var app = angular.module( 'ExtraHourz', ["ngRoute"] );

      app.config( function($routeProvider) {
          $routeProvider
                  .when( "/", {
                      'controller' : 'homeController',
                      templateUrl  : 'partials/home.html'
                  })
                  .when( "/signup", {
                      'controller' : 'signinController',
                      templateUrl  : 'partials/employersign.html'
                  })
                  .when( "/indipend", {
                      'controller' : 'indipendController',
                      templateUrl  : 'partials/indipendentsign.html'
                  })
                  .when( "/jobseek1", {
                      'controller' : 'jobseeker1Controller',
                      templateUrl  : 'partials/jobseeker_signup1.html'
                  })
                  .when( "/jobseek2", {
                      'controller' : 'homeController',  
                      templateUrl  : 'partials/jobseeker_signup2.html'
                  })
                  .when( "/jobseek3", {
                      'controller' : 'homeController',  
                      templateUrl  : 'partials/jobseeker_signup3.html'
                  })
                  .when("/home", {
                    templateUrl: 'partials/home.html'
                  })
                  .otherwise({redirectTo: '/'});
      });
      
            