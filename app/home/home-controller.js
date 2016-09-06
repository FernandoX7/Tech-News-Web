/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('MainController', ['$scope', '$timeout', 'passArticleDataService', 'getLoggedInUser',
    function ($scope, $timeout, passArticleDataService, getLoggedInUser) {

        var vm = this;
        // Public Functions
        vm.init = init;
        vm.getCurrentUser = getCurrentUser;
        vm.signOut = signOut;

        // Public Properties
        vm.articles = [];
        vm.user = {}; // Update the properties with the users - if they are logged in

        init();

        function init() {
            getCurrentUser();
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

        function getCurrentUser() {
            getLoggedInUser.getUser().then(function (result) {
                // Connect back to the scope
                $timeout(function () {
                    // console.log('Logged in user is ', result);
                    vm.user = result;
                }, 0);
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

