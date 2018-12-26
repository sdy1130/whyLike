const app = angular.module('webApp', []);

app.controller('whyLikeController', function($scope, $http) {
    
    // get all reasons
	$scope.getAllReasons = function() {
		$http.get('/reasons').then((response) => {
			$scope.allReasons = response.data;
		});
    }
    
    // delete a Reason
    $scope.removeReason = function(reasonID) {
		const route = `/delete/${reasonID}`

		$http.delete(route).then((response) => {
            $scope.allReasons = response.data;
		})
    }
    
    // post a Reason
    $scope.addReason = function(reasonID) {

        const reason = {
            'comment': $scope.reasonComment,
            'date': new Date()
        };
        $scope.reasonComment = '';
        const route = `/add`;
        $http.post(route, reason).then((response) => {
            $scope.allReasons.push(reason);
        });
    }

    $scope.convertDate = function(date) {
        date = new Date(date);
        const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    $scope.getAllReasons();
});