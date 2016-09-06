/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('ProfileController', function ($timeout) {

    var vm = this;

    // Public functions
    vm.editProfile = editProfile;
    vm.saveChanges = saveChanges;
    vm.getCurrentUser = getCurrentUser;

    // Public properties
    vm.isEditingProfile = false;
    vm.user = vm.getCurrentUser();

    function editProfile() {
        vm.isEditingProfile = true;
    }

    function saveChanges() {
        vm.isEditingProfile = false;
        Materialize.toast('Successfully saved your changes', 2000);
    }

    function getCurrentUser() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                // Now get the specific user from the db using userRef to get the right reference to them
                var userRef = firebase.database().ref('users/' + user.uid);
                userRef.on('value', function (snapshot) {
                    user = snapshot.val();
                    // console.log('A user is logged in', user);
                    // Connect back to scope
                    $timeout(function () {
                        vm.user = user;
                    }, 0);
                });
            }
        });
    }

}); // End of ProfileController