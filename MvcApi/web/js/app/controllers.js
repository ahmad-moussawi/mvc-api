app
    .controller('MainCtrl', ['$rootScope', '$http', 'Auth', '$state', function ($rootScope, $http, Auth, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (!Auth.isAuthenticated() && toState.private) {
                console.log('NOT AUTHENTICATED');
                toast('Please login', 1500);
                $state.go('authlogin');
                event.preventDefault();
                return;
            }

            if (Auth.isAuthenticated()) {
                $rootScope.user = Auth.getUser();
                console.log($rootScope.user);
            }
            //
            // transitionTo() promise will be rejected with 
            // a 'transition prevented' error
        })
    }])
    .controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
        Chart.defaults.global.responsive = true;

        $http.get('api/dashboard/transactions/' + $scope.user.id).success(function (r) {

            var data = {
                name: 'Transactions per month',
                labels: _.range(1, 13).map(function (r) { return getMonthName(r) }),
                datasets: [
                ]
            };


            r.forEach(function (account) {
                var tx = account.tx;
                var months = _.pluck(tx, 'month');
                var currentMonths = _.pluck(tx, 'month');



                for (var i = 1; i < 13; i++) {

                    if (_.indexOf(currentMonths, i) === -1) {
                        tx.push({
                            month: i,
                            transactions: 0
                        });
                    }
                }

                var values = _.pluck(_.sortBy(tx, 'month'), 'transactions');


                var c = getColor();

                data.datasets.push({
                    label: account.account,
                    data: values,
                    fillColor: getColorAlpha(c, 0.2),
                    strokeColor: getColorAlpha(c, 1),
                    pointColor: getColorAlpha(c, 1),
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: getColorAlpha(c, 1)
                })
            });

            console.log(data);

            var ctx = document.getElementById("LineChart").getContext("2d");
            var myLineChart = new Chart(ctx).Line(data, {
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
            });

            var legend = myLineChart.generateLegend();
            $('#LineChart').before(legend);

            var ctx2 = document.getElementById("RadarChart").getContext("2d");

            var data2 = _.clone(data);
            data2.datasets = [data2.datasets[0]];
            data2.datasets[0].data = _.reduce(_.pluck(data.datasets, 'data'), function (sum, arr) {
                for (var i = 0; i < arr.length; i++) {
                    if (!sum[i]) sum[i] = 0;
                    sum[i] += arr[i];
                }
                return sum;
            }, []);


            var myRadarChart = new Chart(ctx2).Radar(data2);
        });

        var data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };



        var data2 = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };




        var data3 = [{
            value: 300,
            color: "#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        }, {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        }, {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        }, {
            value: 40,
            color: "#949FB1",
            highlight: "#A8B3C5",
            label: "Grey"
        }, {
            value: 120,
            color: "#4D5360",
            highlight: "#616774",
            label: "Dark Grey"
        }];

        $http.get('api/dashboard/total/' + $scope.user.id).success(function (response) {

            var data = response.map(function (r) {
                var c = getColor();
                return {
                    value: Math.abs(r.total),
                    label: r.account + (r.total < 0 ? ' Debit' : ' Credit'),
                    color: getColorAlpha(c, 1),
                    highlight: getColorAlpha(c, .6)
                }
            });

            var ctx3 = document.getElementById("PolarChart").getContext("2d");
            var myPolarChart = new Chart(ctx3).PolarArea(data);
        })



    }])
    .controller('AuthRegisterCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$location', 'Auth', function ($scope, $rootScope, $http, $timeout, $location, Auth) {
        $scope.model = {

        };

        $scope.submit = function () {
            var model = $scope.model;
            if (model.password !== model.password2) {
                alert('Confirm password must match password field');
                return;
            }

            var data = {
                FirstName: model.first_name,
                LastName: model.last_name,
                Email: model.email,
                Password: model.password
            };

            $scope.loading = true;

            Auth.register(model.email, model.password, model.first_name, model.last_name).then(function (res) {
                $timeout(function () {
                    $scope.loading = false;
                    $rootScope.user = data;
                    $location.path('/accounts')
                }, 800);
                toast('User created successfully', 500);
            }, function (err) {
                $timeout(function () { $scope.loading = false; }, 800);
                if (err.message) {
                    toast(err.message, 2000);
                }

                console.log(err);
            })

        }
    }])
    .controller('AuthLoginCtrl', ['$scope', 'Auth', '$location', '$timeout', function ($scope, Auth, $location, $timeout) {
        $scope.login = function () {
            console.log($scope.model.email, $scope.model.password);
            $scope.loading = true;
            Auth.login($scope.model.email, $scope.model.password).then(function (res) {
                $timeout(function () {
                    $scope.loading = false;
                    $location.path('/');
                }, 500);
            }, function (err) {
                $timeout(function () {
                    $scope.loading = false;
                }, 500);
                toast('Wrong Email or Password', 1200)
            });
        }
    }])
        .controller('AuthLogoutCtrl', ['$scope', 'Auth', '$location', '$timeout', function ($scope, Auth, $location, $timeout) {
            Auth.logout();

            $timeout(function () {
                $location.path('/auth/login');
            }, 1500);
        }])
    .controller('AccountsCtrl', ['$scope', '$location', '$http', '$timeout', function ($scope, $location, $http, $timeout) {

        if (!$scope.user) {
            //$location.path('/register');
        }

        $scope.accounts = [];

        $scope.getAccounts = function () {
            $http.get('api/accounts?userid=' + $scope.user.id).success(function (res) {
                $scope.accounts = res;
            });
        }

        $scope.getAccounts();

        $scope.setAccount = function (account) {
            console.log(account.$$hashKey);
            $scope.model = account;
        }

        $scope.removeAccount = function (account) {

            openModal('Are you sure you want to delete this account' + account.name, '', function () {
                console.log(arguments);
                var accounts = $scope.accounts.filter(function (row) {
                    return row !== account;
                });

                $scope.accounts = accounts;

                toast('Account  <b>' + account.name + '</b> Deleted', 5000);
                $scope.$apply();
            })


        }

        $scope.submit = function () {



            $scope.loading = true;
            var account = _.pick($scope.model, ['iban', 'description', 'balance', 'name', 'id']);
            account.myUserId = $scope.user.id;
            console.log(account);
            $http.post('/api/app/accounts', account).success(function (response) {

                if (exists($scope.model)) {
                    console.log('exist');
                    $timeout(function () {
                        $scope.loading = false;
                    }, 800);

                    $scope.model = response;

                    $scope.reset();
                } else {
                    console.log('new');
                    $scope.model.isnew = true;
                    $scope.model.id = response.id;
                    $scope.accounts.push($scope.model);
                    toast('You have added a new Account', 500);
                    $timeout(function () {
                        $scope.loading = false;
                    }, 800);

                    $scope.reset();
                }
            }).error(function (err) {
                console.log(err);
                toast('An error has occured', 800);
            });


        }

        $scope.reset = function () {
            $scope.form.$setPristine();
            $scope.model = '';
        };

        function exists(account) {
            return _.indexOf(_.pluck($scope.accounts, '$$hashKey'), account.$$hashKey) > -1;
        }


    }])
     .controller('TransactionsCtrl', ['$scope', '$location', '$http', '$timeout', 'FileUploader', function ($scope, $location, $http, $timeout, FileUploader) {

         $scope.transactions = [];
         $scope.accounts = [];

         $scope.reset = function () {
             $scope.form.$setPristine();
             $scope.model = '';
         };

         $scope.uploader = new FileUploader({
             url: '/api/upload',
             autoUpload: true,
             removeAfterUpload: true,
             onCompleteItem: function (item, response, status, headers) {
                 $scope.model.attachement = response[0];

                 console.log(item, response);
             }
         });

         $scope.groupByFilters = [
             {
                 label: 'Month',
                 value: 'date | moment:"MMMM"'
             },
             {
                 label: 'Date',
                 value: 'date | moment:"ddd, Do of MMM"'
             },
             {
                 label: 'Account',
                 value: 'account.name'
             }
         ];

         $scope.groupByFilter = $scope.groupByFilters[0];


         $scope.addTransaction = function () {
             $scope.loading = true;
             $http.post('api/transactions', $scope.model).success(function (response) {
                 $timeout(function () {
                     $scope.loading = false;
                 }, 800);
                 $scope.model = response;
                 toast('You have added a new Transaction', 600);
                 $scope.transactions.push($scope.model);
                 $scope.reset();
             }).error(function (err) {
                 toast('An error has occured while adding the transaction', 800);
                 $timeout(function () {
                     $scope.loading = false;
                 }, 800);
                 console.log(err);
             });
         };


         $scope.getTransations = function () {
             $http.get('api/transactions?userid=' + $scope.user.id).success(function (tx) {
                 $scope.transactions = tx;
             }).error(function (err) {
                 toast('An error has occured while retreiving your transactions', 600);
             });
         };

         $scope.updateTransation = function () {

         }

         $scope.getAccounts = function () {
             $http.get('api/accounts?userid=' + $scope.user.id).success(function (accounts) {
                 $scope.accounts = accounts;
             });
         };

         $scope.getAccounts();
         $scope.getTransations();

         $scope.log = function (arg) {
             console.log(arg);
         }


     }]);