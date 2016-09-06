/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('ProfileController', function ($timeout, getLoggedInUser) {

    var vm = this;

    // Public functions
    vm.init = init;
    vm.editProfile = editProfile;
    vm.saveChanges = saveChanges;
    vm.getCurrentUser = getCurrentUser;

    // Public properties
    vm.isEditingProfile = false;
    vm.user = {}; // Update the properties with the users - if they are logged in

    // Initialize whatever needs to be initialized :p
    init();

    function init() {
        getCurrentUser();
    }

    function editProfile() {
        vm.isEditingProfile = true;
    }

    function saveChanges() {
        vm.isEditingProfile = false;
        Materialize.toast('Successfully saved your changes', 2000);
    }

    function getCurrentUser() {
        getLoggedInUser.getUser().then(function (result) {
            // Connect back to the scope
            $timeout(function () {
                // console.log('Attempting to get the logged in user resulted in the following promise (user) ', result);
                vm.user = result;
            }, 0);
        });
    }

}); // End of ProfileController