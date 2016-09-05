/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('ProfileController', function ($timeout) {

    var vm = this;

    // Public functions
    vm.editProfile = editProfile;
    vm.saveChanges = saveChanges;

    // Public properties
    vm.isEditingProfile = false;
    vm.firebaseUser = firebase.auth().currentUser;
    vm.user = {};
    vm.userUid = '';

    function editProfile() {
        vm.isEditingProfile = true;
    }

    function saveChanges() {
        vm.isEditingProfile = false;
        Materialize.toast('Successfully saved your changes', 2000);
    }

    // Get the currently logged in user
    if (vm.firebaseUser) {
        // User is signed in.
        // Set the uid of the firebase user so we can retrieve the user from the db by their uid
        vm.userUid = vm.firebaseUser.uid;
    }

    var userRef = firebase.database().ref('users/' + vm.userUid);
    userRef.on('value', function (snapshot) {
        vm.user = snapshot.val();
        // Use $timeout to reconnect the scope
        $timeout(function () {
            console.log('Current user is', vm.user);
        }, 0);
    });

}); // End of ProfileController