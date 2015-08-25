var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

    var refresh = function() {
    	$http.get('/contactlist'). 
			success( function(data) {
				$scope.contactlist = data;
				$scope.contact = '';
			});
	}

	refresh();

	$scope.addContact = function() {
		if( $scope.contact._id != undefined ) {
			$http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response) {
				refresh();
			});
		}
		else {
			$http.post('/contactlist',$scope.contact).success(function(response) {
				refresh();
			});
		}
	};

	$scope.remove = function(id) {
		$http.delete('/contactlist/'+id).success(function(response) {
			refresh();
		});
	}

	$scope.edit = function(id) {
		$http.get('/contactlist/'+id).success(function(response) {
			$scope.contact = response;
		});
	}

	$scope.clearContact = function() {
		$scope.contact = '';
	}; 

}]);