app.factory('Auth', ['$http', '$rootScope', '$session', '$q', function ($http, $rootScope, $session, $q) {
    return {
        isAuthenticated: function () {
            return !!$session.get('user');
        },
        getUser: function () {
            return $session.get('user');
        },
        setUser: function () {
            return $session.set('user');
        },
        logout: function () {
            $session.clear();
            $rootScope.user = null;
            delete $rootScope.user;
        },
        login: function (email, password) {
            var q = $q.defer();
            console.log('Login with %s %s', email, password);

            $http.post('/api/auth/login', {
                email: email,
                password: password
            }).success(function (res) {
                if (res) {
                    $session.set('user', res);
                    q.resolve(res)
                } else {
                    q.reject(false);
                }
            }).error(function (err) {
                q.reject(err);
            });

            return q.promise;
        },
        register: function (email, password, fname, lname) {
            var q = $q.defer();
            console.log('Register with %s %s %s %s', email, password, fname, lname);

            $http.post('/api/auth/register', {
                email: email,
                password: password,
                firstname: fname,
                lastname: lname
            }).success(function (res) {
                console.log(res);
                if (res) {
                    $session.set('user', res);
                    q.resolve(res)
                } else {
                    q.reject(false);
                }
            }).error(function (err) {
                q.reject(err);
            });

            return q.promise;
        }

    }
}]).factory('$session', [function () {

    var storage = sessionStorage;

    return {
        get: function (item) {
            if (_.isFunction(storage.getItem)) {
                return JSON.parse(storage.getItem(item) || null);
            }
        },

        set: function (item, value) {
            if (_.isFunction(storage.setItem)) {
                storage.setItem(item, JSON.stringify(value));
            }
        },

        clear: function () {
            if (_.isFunction(storage.clear)) {
                storage.clear();
            }
        }
    };

}]);