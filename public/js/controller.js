app.controller('jobseeker1Controller', function ($scope, fileReader) { 
             console.log(fileReader)
             $scope.imageSrc = "content/images/utilities/user_placeholder.png";
            $scope.getFile = function () {
                $scope.progress = 0;
                fileReader.readAsDataUrl($scope.file, $scope)
                              .then(function(result) {
                                  $scope.imageSrc = result;
                              });
            };
        });
        
        app.controller('signinController', function ($scope, fileReader) { 
             console.log(fileReader)
            $scope.imageemplrSrc = "content/images/utilities/dummy_holder_01.png";
            $scope.getFile = function () {
                $scope.progress = 0;
                fileReader.readAsDataUrl($scope.file, $scope)
                              .then(function(result) {
                                  $scope.imageemplrSrc = result;
                              });
            };
        }); 
        
        app.controller('indipendController', function ($scope, fileReader) { 
             console.log(fileReader)
            $scope.imageemplrSrc = "content/images/utilities/user_placeholder.png";
            $scope.getFile = function () {
                $scope.progress = 0;
                fileReader.readAsDataUrl($scope.file, $scope)
                              .then(function(result) {
                                  $scope.imageemplrSrc = result;
                              });
            };
        });
        
app.controller('homeController', function($scope){ 
    $scope.sliderimg = [ 
        {image : 'content/images/utilities/slider.jpg'},
        {image : 'content/images/utilities/slider.jpg'},
        {image : 'content/images/utilities/slider.jpg'},
    ];
});