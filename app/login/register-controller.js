/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('RegisterController', function (timestampService) {

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
        var timestamp = timestampService.getTimestamp();

        // Create the user and save them to firebase
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
                // Successfully registered user - Now put them in the firebase db
                var firebaseUser = firebase.auth().currentUser;

                var createdUser = {
                    uid: firebaseUser.uid,
                    rights: 0,
                    created: timestamp,
                    email: firebaseUser.email,
                    firstName: firstName,
                    lastName: lastName,
                    bio: ''
                };

                // Add them to the firebase db (users/uid/{user properties here})
                firebase.database().ref('users/' + createdUser.uid).set(createdUser);

                console.log('Successfully registered user', createdUser);
                Materialize.toast('Registration successful', 2000);
                window.location = '#/home';
                window.location.reload();

            }, // Handler Errors
            function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                switch (errorCode) {
                    // Email already in use
                    case 'auth/email-already-in-use':
                        Materialize.toast('Error, ' + errorMessage, 3500);
                        // TODO: Show a customized toast that has the option to go to login if they already have an account
                        break;
                    // Invalid email
                    case 'auth/invalid-email':
                        Materialize.toast('Error, ' + errorMessage, 3500);
                        break;
                    default:
                        // Default
                        console.log('Error, trying to register a user. \nCode:', errorCode, '\nMessage:', errorMessage);
                        Materialize.toast('Error, ' + errorMessage, 3500);
                        break;
                }
            });

    }

});