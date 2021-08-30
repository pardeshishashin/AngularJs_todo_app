nodeApp.factory('apiService', ['$http', function ($http) {
    return {
        getRecentUsers: function () {
            return $http({
                method: 'GET',
                cache: false,
                url: 'http://localhost:3300/api/users'
            });
        }
    }
}]);
