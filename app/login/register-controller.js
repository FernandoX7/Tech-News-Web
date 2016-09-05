/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('RegisterController', function ($location) {

    var vm = this;

    // Public functions
    vm.register = register;

    // Public properties
    vm.firstName = '';
    vm.lastName = '';
    vm.email = '';
    vm.password = '';

    function register(firstName, lastName, email, password) {
        console.log('registering acc');

        firstName = vm.firstName;
        lastName = vm.lastName;
        email = vm.email;
        password = vm.password;

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('There was an error trying to register a user', errorCode, errorMessage);
        });

        $location.path('/');
    }

});