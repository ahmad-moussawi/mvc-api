app
    .directive('wavesEffect', function () {
        return {
            restrict: 'C',
            link: function (scope, elm, attrs) {
                Waves.displayEffect();
            }
        };
    })
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive('datePicker', function () {
        return {
            scope: {
                ngModel: '='
            },
            link: function (scope, elm, attrs) {
                var picker = elm.pickadate({
                    onSet: function (value) {
                        console.log(moment(value.select).format());
                        scope.ngModel = moment(value.select).toDate();
                        scope.$apply();
                    }
                });
            }
        };
    })
    .directive('spinner', function () {
        return {
            restrict: 'E',
            templateUrl: '/web/partials/spinner.html'
        };
    });