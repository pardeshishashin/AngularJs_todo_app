nodeApp
  .controller("todoController", [
    "$scope",
    "$http",
    "$stateParams",
    "$uibModal",
    "$state",
    "toaster",
    function ($scope, $http, $stateParams, $uibModal, $state, toaster) {
      var pc = this;
      $scope.toasterFun = function(title, body){
        toaster.success({title: title, body: body});
    };
      $scope.open = function (size, todo) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "templates/modal.html",
          controller: "ModalInstanceCtrl",
          controllerAs: "pc",
          size: size,
          resolve: {
            data: function () {
              return todo;
            },
          },
        });

        modalInstance.result.then(function (res) {
          $scope.updateUser(res.id, res);
        });
      };

      $scope.Confirm = function (size, msg ,id, complete) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "templates/confirm.html",
          controller: "ModalInstanceConfirmCtr",
          controllerAs: "pc",
          size: size,
          resolve: {
            data: function () {
              return msg;
            },
          },
        });

        modalInstance.result.then(function (res) {
          if(res) {
            if(complete) 
              $scope.updateUser(complete.id, { isDone: complete.isDone });
            else
              $scope.deleteUser(id)
          }
        });
      };

      $scope.deleteUser = function (id) {
        $http
          .delete("http://localhost:3400/api/todo/" + id)
          .then(function (response) {
            $scope.toasterFun('success', 'Successfully remove the todo.');
            $scope.getTodoList();
          });
      };
      $scope.addTodo = function (size) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "templates/add_todo.html",
          controller: "ModalAddInstanceCtrl",
          controllerAs: "pc",
          size: size
        });

        modalInstance.result.then(function (res) {
          if(res) {
            $scope.newTodo = res.newTodo;
            $scope.add();
          }
        });
      };
      $scope.getTodoList = function () {
        $http.get("http://localhost:3400/api/todo").then(function (response) {
          $scope.todoList = response.data;
        });
      };

      $scope.deleteTodo = function (todo) {
        $scope.Confirm('md',' Are you sure you want to remove the todo.',todo._id);
      };

      $scope.doneTask = function (todo, done) {
        var completeTask = {
          id: todo._id,
          isDone: done
        }
        if(done)
          $scope.Confirm('md',`Are you sure you want to complete todo.`,todo._id, completeTask);
        else
          $scope.Confirm('md',`Are you sure you want to incomplete todo.`,todo._id, completeTask);
      };

      $scope.add = function () {
        var todo = {
          taskName: $scope.newTodo,
        };
        $http
          .post("http://localhost:3400/api/todo/", todo)
          .then(function (response) {
            $scope.toasterFun('success', 'Added todo');
            $state.reload()
          });
      };
      $scope.editUser = function () {
        var userId = $stateParams.id;
        $http
          .get("http://localhost:3400/api/todo/" + userId)
          .then(function (res) {
            $scope.editUser = res.data;
          });
      };
      $scope.updateUser = function (id, todo) {
        $http
          .put("http://localhost:3400/api/todo/" + id, todo)
          .then(function (response) {
            $scope.toasterFun('success', 'Successfully update the todo.');
            $scope.getTodoList();
          });
      };
    },
  ])
  .controller("ModalInstanceCtrl", function ($scope, $uibModalInstance, data) {
    $scope.data = data;

    $scope.value = $scope.data.taskName;
    $scope.ok = function () {
      $uibModalInstance.close({
        id: $scope.data._id,
        taskName: $scope.taskName,
      });
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };
  })
  .controller("ModalInstanceConfirmCtr", function ($scope, $uibModalInstance, data) {
    $scope.data = data;
    $scope.msg =  $scope.data;
    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };
  })
  .controller("ModalAddInstanceCtrl", function ($scope, $uibModalInstance) {
    $scope.ok = function () {
      $uibModalInstance.close({newTodo: $scope.newTodoName});
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss("cancel");
    };
  })

  