var nodeApp = angular.module('nodeApp', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'toaster'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        
        var homeState = {
            url: '/todo',
            templateUrl: 'templates/home.html',
            displayName: 'Todo_List',
            name: 'home',
            visible: true
        };
        var inCompleteState = {
              name: 'inComplete',
              displayName: 'InComplete',
              url: '/inComplete',
              templateUrl: 'templates/inComplete.html',
             visible: true 
        };
     
        var completeState = { 
             name: 'complete',
            displayName: 'Complete',
            url: '/complete',
             templateUrl: 'templates/complete.html', 
             visible: true 
        };
      
        $stateProvider.state(homeState.name, homeState);
        $stateProvider.state(inCompleteState.name, inCompleteState);
        $stateProvider.state(completeState.name, completeState);

        $urlRouterProvider.otherwise('/todo');
    }]);