(function (angular) {

    // Copied from AngluarJS
    function indexOf(array, obj) {
        if (array.indexOf) return array.indexOf(obj);

        for (var i = 0; i < array.length; i++) {
            if (obj === array[i]) return i;
        }
        return -1;
    }

    // Copied from AngularJS
    function arrayRemove(array, value) {
        var index = indexOf(array, value);
        if (index >= 0)
            array.splice(index, 1);
        return value;
    }

    // Copied from AngularJS
    var PRISTINE_CLASS = 'ng-pristine';
    var DIRTY_CLASS = 'ng-dirty';

    var formDirectiveFactory = function (isNgForm) {
        return function () {
            var formDirective = {
                restrict: 'E',
                require: ['form'],
                compile: function () {
                    return {
                        pre: function (scope, element, attrs, ctrls) {
                            var form = ctrls[0];
                            var $addControl = form.$addControl;
                            var $removeControl = form.$removeControl;
                            var controls = [];
                            form.$addControl = function (control) {
                                controls.push(control);
                                $addControl.apply(this, arguments);
                            }
                            form.$removeControl = function (control) {
                                arrayRemove(controls, control);
                                $removeControl.apply(this, arguments);
                            }
                            form.$setPristine = function () {
                                element.removeClass(DIRTY_CLASS).addClass(PRISTINE_CLASS);
                                form.$dirty = false;
                                form.$pristine = true;
                                angular.forEach(controls, function (control) {
                                    control.$setPristine();
                                });
                            }
                        },
                    };
                },
            };
            return isNgForm ? angular.extend(angular.copy(formDirective), { restrict: 'EAC' }) : formDirective;
        };
    }
    var ngFormDirective = formDirectiveFactory(true);
    var formDirective = formDirectiveFactory();
    angular.module('resettableForm', []).
        directive('ngForm', ngFormDirective).
        directive('form', formDirective).
        directive('ngModel', function () {
            return {
                require: ['ngModel'],
                link: function (scope, element, attrs, ctrls) {
                    var control = ctrls[0];
                    control.$setPristine = function () {
                        this.$dirty = false;
                        this.$pristine = true;
                        element.removeClass(DIRTY_CLASS).addClass(PRISTINE_CLASS);
                    }
                },
            };
        });
})(angular);