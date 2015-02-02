var app = angular.module('app', ['ui.router', 'mm.iban', 'resettableForm', 'angular.filter', 'angularFileUpload']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('authlogin', {
            url: '/auth/login',
            templateUrl: '/web/partials/auth/login.html',
            controller: 'AuthLoginCtrl',
            private: false
        })
        .state('authlogout', {
            url: '/auth/logout',
            templateUrl: '/web/partials/auth/logout.html',
            controller: 'AuthLogoutCtrl',
            private: false
        }).state('authregister', {
            url: '/auth/register',
            templateUrl: '/web/partials/auth/register.html',
            controller: 'AuthRegisterCtrl',
            private: false
        }).state('home', {
            url: '/',
            templateUrl: '/web/partials/home.html',
            controller: 'HomeCtrl',
            private: true,
        }).state('accounts', {
            url: '/accounts',
            templateUrl: '/web/partials/users/accounts.html',
            controller: 'AccountsCtrl',
            private: true,
        }).state('transactions', {
            url: '/transactions',
            templateUrl: '/web/partials/users/transactions.html',
            controller: 'TransactionsCtrl',
            private: true,
        });

}]);