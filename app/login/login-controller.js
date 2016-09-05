/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('LoginController', function ($scope) {

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

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log('There was an error trying to log in', errorCode, errorMessage);

            // TODO: Handle error codes https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithEmailAndPassword
            if (errorCode == 'auth/wrong-password') {
                Materialize.toast('Invalid username or password', 2000);
            }

        });

        // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //     console.log('There was an error trying to register a user', errorCode, errorMessage);
        // });

        // firebase.auth().signOut().then(function() {
        //     // Sign-out successful.
        // }, function(error) {
        //     // An error happened.
        // });

        // Materialize.toast('Logging in...', 2000);
        console.log(vm.email, vm.password);
    }

    function signOut() {
        console.log('signing out');
    }

});