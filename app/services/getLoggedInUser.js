/**
 * Created by fernandoramirez on 9/5/16.
 *
 * This service is used to get the currently logged in user
 * it then returns a promise from the firebase call
 *
 */
techNews.service('getLoggedInUser', function ($timeout) {

    var getUser = function () {
        return new Promise(function (resolve, reject) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    // Now get the specific user from the db using userRef to get the right reference to them
                    var userRef = firebase.database().ref('users/' + user.uid);
                    userRef.on('value', function (snapshot) {
                        user = snapshot.val();
                        // Connect back to scope
                        $timeout(function () {
                            resolve(user);
                        }, 0);
                    });
                } else {
                    console.log('User is not logged in');
                    reject(Error('Error in promise - guessing user is not logged in'));
                }
            });
        });
    };

    return {
        getUser: getUser
    };

});