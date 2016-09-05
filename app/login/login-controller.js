/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('LoginController', function ($location) {

    vm = this;

    // Public functions
    vm.login = login;
    vm.signOut = signOut;

    // Public properties
    vm.hello = 'Hello there';
    vm.email = '';
    vm.password = '';

    // Listen for user change
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log('user is singed in', user);
        } else {
            // No user is signed in.
            console.log('no one is signed in', user);
        }
    });

    function login(email, password) {
        email = vm.email;
        password = vm.password;

        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
            // Login was successful
            Materialize.toast('Successfully logged in', 2000);
            console.log('Successfully logged in user: ', user);
            $location.path('/#home');
        }, function (error) { // Handler Errors
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('Error, trying to login a user. \nCode:', errorCode, '\nMessage:', errorMessage);

            switch (errorCode) {
                case 'auth/wrong-password':
                    Materialize.toast('Invalid username or password', 2000);
                    break;
            }

        });

    }

    function signOut() {
        console.log('signing out');
    }

});