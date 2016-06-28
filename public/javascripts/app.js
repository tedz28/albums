"use strict";

angular.module('myApp', ['ngRoute','ngAnimate','ui.bootstrap'])
    //routing config
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl : 'templates/list.html',
                    controller : 'ListCtrl'
                })
                .when('/albums', {
                    templateUrl :'templates/albums.html',
                    controller : 'AlbumsCtrl'
                })
                .otherwise({
                    redirectTo :  '/'
                });
        }])
    .factory('albumFactory',['$http', function ($http) {
        return {
            getAlbums : function () {
                return $http.get('/api/albums');
            }
        }
    }])
    .controller('ListCtrl', function ($scope, albumFactory, $uibModal) {

        var getAlbums = function() {
            albumFactory.getAlbums()
                .then(function(res){
                   $scope.albums = res.data.results;
                    //console.log($scope.albums);
                });
        };
        getAlbums();
        
        $scope.animationsEnabled = true;

        $scope.open = function (album) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    album: function () {
                        return album;
                    }
                }
            });
        };

    })
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, album) {
        $scope.album = album;
        $scope.ok = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('AlbumsCtrl', function($scope, albumFactory, $uibModal) {
        //default view option
        $scope.layout = 'grid';
        //carousel parameters
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;
        var addSlide = function(album) {
            slides.push({
                image: album.imageURLLarge,
                text: album.title,
                id: currIndex++
            });
        };
        var getAlbums = function() {
            albumFactory.getAlbums()
                .then(function(res){
                    $scope.albums = res.data.results;
                    //console.log($scope.albums);
                    $scope.albums.forEach(function(item){
                        addSlide(item);
                    });
                });
        };
        getAlbums();

        $scope.animationsEnabled = true;

        $scope.open = function (album) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: 'lg',
                resolve: {
                    album: function () {
                        return album;
                    }
                }
            });
        };

    });
