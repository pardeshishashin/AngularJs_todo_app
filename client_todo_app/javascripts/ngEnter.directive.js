"use strict";
nodeApp.directive("ngEnter",function  () {
	return function  (scope,elem) {
		$(elem).keyup(function  (e) {
			if (e.keyCode === 13) {
				scope.$apply(function  () {
					scope.addTodo();
				});
			}
		});
	};
});