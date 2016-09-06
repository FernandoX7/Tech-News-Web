/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('NewArticleController', function (getLoggedInUser, $timeout, timestampService) {

    var vm = this;

    // Public functions
    vm.init = init;
    vm.getCurrentUser = getCurrentUser;
    vm.createArticle = createArticle;

    // Public properties
    vm.user = {}; // Update the properties with the users - if they are logged in

    init();

    function init() {
        getCurrentUser();
    }

    // Create new article
    function createArticle(uid, author, authorReference, title, description, image, timestamp, comments) {
        title = document.getElementById('articleTitleInput').value;
        description = document.getElementById('articleDescriptionInput').value;
        timestamp = timestampService.getTimestamp();
        image = 'http://www.droid-life.com/wp-content/uploads/2016/03/android-n-wallpaper-1.jpg';

        var firebaseUser = firebase.auth().currentUser;
        // Get a key for a new article
        var articleKey = firebase.database().ref().child('articles').push().key;

        // An article entry.
        var articleData = {
            uid: articleKey,
            author: vm.user.firstName + ' ' + vm.user.lastName,
            authorReference: firebaseUser.uid,
            title: title,
            description: description,
            image: image,
            timestamp: timestamp,
            comments: {} // TODO: Add comments
        };

        // Write the new article's data simultaneously in the article list and the user's individual article list.
        var updates = {};
        updates['/articles/' + articleKey] = articleData; // articles/key
        updates['/users/' + firebaseUser.uid + '/' + 'articles/' + articleKey] = articleData; // users/userUid/articles/key

        // Check to see if input fields are empty
        if (title == "" || description == "") {
            Materialize.toast('Error, fields cannot be empty', 2000);
        } else {
            Materialize.toast('Article successfully created', 2000);
            // Reset fields
            document.getElementById('articleTitleInput').value = "";
            document.getElementById('articleDescriptionInput').value = "";
            return firebase.database().ref().update(updates);
        }
    }

    function getCurrentUser() {
        getLoggedInUser.getUser().then(function (result) {
            // Connect back to the scope
            $timeout(function () {
                // console.log('Logged in user is ', result);
                vm.user = result;
            }, 0);
        });
    }

});