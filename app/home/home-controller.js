/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('MainController', ['$scope', '$timeout', 'passArticleDataService',
    function ($scope, $timeout, passArticleDataService) {

        var vm = this;
        // Public Functions
        vm.test = test;
        vm.getCurrentUser = getCurrentUser;
        vm.signOut = signOut;

        // Public Properties
        vm.articles = [];
        vm.user = vm.getCurrentUser();

        if (vm.user) {
            // User is logged in.
            console.log('User currently logged in', vm.user.email);
        }

        // Listen for data
        var articlesRef = firebase.database().ref('articles/');
        articlesRef.on('child_added', function (data) {
            var article = {
                key: data.key,
                uid: data.val().uid,
                username: data.val().username,
                author: data.val().author,
                image: data.val().image,
                title: data.val().title,
                description: data.val().description,
                timestamp: data.val().timestamp
            };
            $timeout(function () {
                vm.articles.push(article);
                passArticleDataService.addArticleList(vm.articles);
            }, 0);
            // console.log('[child-added]', article);
        });

        articlesRef.on('child_changed', function (data) {
            var article = {
                key: data.key,
                uid: data.val().uid,
                username: data.val().username,
                author: data.val().author,
                image: data.val().image,
                title: data.val().title,
                description: data.val().description,
                timestamp: data.val().timestamp
            };
            console.log('[child-changed]', article);
        });

        articlesRef.on('child_removed', function (data) {
            var article = {
                key: data.key,
                uid: data.val().uid,
                username: data.val().username,
                author: data.val().author,
                image: data.val().image,
                title: data.val().title,
                description: data.val().description,
                timestamp: data.val().timestamp
            };
            console.log('[child-removed]', article);
            // pseudocode - deleteArticle(data.key)
        });

        function test() {
            console.log('Test function ran');
        }

        function getCurrentUser() {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    var userRef = firebase.database().ref('users/' + user.uid);
                    userRef.on('value', function (snapshot) {
                        user = snapshot.val();
                        console.log('A user is logged in', user);
                        // Connect back to scope
                        $timeout(function () {
                            vm.user = user;
                        }, 0);
                    });
                } else {
                    console.log('No user is logged in');
                }
            });
        }

        function signOut() {
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                Materialize.toast('Sign out successful', 2000);
            }, function (error) {
                Materialize.toast('Error trying to sign out', 2000);
                console.log('Error trying to sign out user: ', error);
            });
        }

    }]); // End of MainController

