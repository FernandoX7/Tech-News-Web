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
    vm.user = {};

    function editProfile() {
        vm.isEditingProfile = true;
    }

    function saveChanges() {
        vm.isEditingProfile = false;
        Materialize.toast('Successfully saved your changes', 2000);
    }

    var commentsRef = firebase.database().ref('users/');
    commentsRef.on('child_added', function (data) {
        vm.user = {
            rights: data.val().rights,
            username: data.val().username,
            firstName: data.val().firstName,
            lastName: data.val().lastName,
            createdDate: data.val().createdDate,
            uid: data.val().uid
        };
        $timeout(function () {
            console.log('User is: ', vm.user);
        }, 0);
    });

});