/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('LoginController', function ($scope) {

    vm = this;

    // Public functions
    vm.login = login;

    // Public properties
    vm.hello = 'Hello there';

    function login() {
        console.log('Logging in...');
    }

});