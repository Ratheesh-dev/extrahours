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
        
        app.controller('signinController', function ($scope, fileReader, $http) { 
             console.log(fileReader);
            $scope.imageemplrSrc = "content/images/utilities/dummy_holder_01.png";
            $scope.getFile = function () {
                $scope.progress = 0;
                fileReader.readAsDataUrl($scope.file, $scope)
                              .then(function(result) {
                                  $scope.imageemplrSrc = result;
                              });
            };
            
            $scope.submitSigninForm = function(){ 
                var formData = new FormData($('#frmsignup')); 
                $http({
                  method: 'GET',
                  url: '/api/employer/signup',
                  data: formData
                }).then(function successCallback(response) { 
                    console.log(response);
                    alert(JSON.stringify(response)); 
                }, function errorCallback(error) { 
                    console.log(error);
                    alert(JSON.stringify(error));

                });
            };
            
        }); 
        
//        $.ajax({
//                url: url1,
//                type: 'POST',
//                data: data,
//                processData: false,
//                contentType: false,
//                cache: false,
//                dataType: "html",
//                async: false,
//                mimeType: 'multipart/form-data',
//                success:function(res){
//                    
//                }
//            });
        
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