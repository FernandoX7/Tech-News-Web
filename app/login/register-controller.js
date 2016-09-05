/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('RegisterController', function ($location) {

    var vm = this;

    // Public functions
    vm.register = register;
    vm.getTimestamp = getTimestamp;

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
        var timestamp = getTimestamp();

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
                $location.path('/#home');

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

    // Get Date
    function getTimestamp() {
        // Expected result = September 1, 2016 9:13:34 PM
        var objToday = new Date(),
            weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
            dayOfWeek = weekday[objToday.getDay()],
            domEnder = function () {
                var a = objToday;
                if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
                a = parseInt((a + "").charAt(1));
                return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : ""
            }(),
            dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
            curMonth = months[objToday.getMonth()],
            curYear = objToday.getFullYear(),
            curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
            curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
            curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
            curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";

        var timestamp = curMonth + ' ' + dayOfMonth + ', ' + curYear + ' ' + curHour + ":" + curMinute + ":" + curSeconds + ' ' + curMeridiem;
        var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

        return timestamp
    }

});