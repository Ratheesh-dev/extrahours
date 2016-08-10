// <----------> Image Preview <----------> //
app.directive("ngFileSelect",function(){
  return {
    link: function($scope,el){
      el.bind("change", function(e){
      
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      });
    }
  }
});

// <----------> Password Matching <----------> //
app.directive("passwordVerify", function() { 
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});

// <----------> Dissable Copy Paste <----------> //
app.directive('stopccp', function(){ 
    return {
        scope: {},
        link:function(scope,element){
            element.on('cut copy paste', function (event) {
              event.preventDefault();
            });
        }
    };
});