var myTodo = angular.module('myTodo', ["xeditable"]);

myTodo.run(function (editableOptions, editableThemes) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    editableThemes.bs3.inputClass = 'input-sm';
});

myTodo.controller('OnaftersaveCtrl', function ($scope) {

    $scope.checkboxchange = function (index) {

        if ($scope.checkboxmodel === true) {
            console.log("checked");
            changeTodoState(index, true);
        }

        if ($scope.checkboxmodel === false) {
            console.log("uncheked");
            changeTodoState(index, false);
        }
    }
    $scope.initcheckbox = function (index) {
        if (localStorage.getItem(index) != null) {
            var tmp = localStorage.getItem(index);
            var tmpJson = JSON.parse(tmp);
            if (tmpJson.isDone == "true") {
                $scope.checkboxmodel = true;
            } else {
                $scope.checkboxmodel = false;
            }
        }
    }

    $scope.update = function (todotext, index) {
        console.log("index is: " + index);
        console.log(todotext);
        var newtodo = {
            Text: todotext,
            isDone: "false"
        };
        localStorage.setItem(index.toString(), JSON.stringify(newtodo));
    };

    function changeTodoState(index, isDone) {
        if (isDone) {
            var tmp = localStorage.getItem(index);
            var tmpJson = JSON.parse(tmp);
            var result = {
                Text: tmpJson.Text,
                isDone: "true"
            };
            localStorage.setItem(index, JSON.stringify(result));
        } else {
            var tmp = localStorage.getItem(index);
            var tmpJson = JSON.parse(tmp);
            var result = {
                Text: tmpJson.Text,
                isDone: "false"
            };
            localStorage.setItem(index, JSON.stringify(result));
        }
    }
});


myTodo.controller('headerController', ['$scope', '$filter', function ($scope, $filter) {
    $scope.todoarray = [{}];
    $scope.count = 0;
    getAlltodo();


    $scope.deleteclick = function (index) {
        console.log("index is:" + index);
        var newtodo = {
            Text: "",
            isDone: "false"
        };
        localStorage.setItem(index, JSON.stringify(newtodo));
    }

    $scope.enterTodo = function (event) {
        if (event.keyCode === 13) {
            var newTodo = $scope.newtodo;
            $scope.item = addNewTodo(newTodo);
            $scope.newtodo = null;
        }
    };

    function addNewTodo(newTask) {
        $scope.todoarray.push({
            Text: newTask,
            isDone: "false"
        });
        var newtodo = {
            Text: newTask,
            isDone: "false"
        };
        $scope.count++;

        localStorage.setItem("count", $scope.count);
        localStorage.setItem($scope.count, JSON.stringify(newtodo));
        return newTask;

    }

    function getAlltodo() {
        $scope.count = localStorage.getItem("count");
        var flag = false;
        var retrievedObject;
        var result;
        var numbers = localStorage.getItem("count");
        if (numbers < 100) {
            for (i = 1; i <= numbers; i++) {
                retrievedObject = localStorage.getItem(i);
                console.log(retrievedObject);
                result = JSON.parse(retrievedObject);
                $scope.todoarray.push(result);
                flag = true;
            }
        }
        if (flag === false) {
            $scope.count = 0;
            localStorage.setItem("count", 0);
        }
    }

    $scope.reset = function () {
        localStorage.clear();
        $scope.count = 0;
        $scope.todoarray = null;
        location.reload();
    }
}]);