/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('ArticleDetailController', function ($scope, $timeout, passArticleDataService, getLoggedInUser) {

    var vm = this;

    // Public functions
    vm.init = init;
    vm.getCurrentUser = getCurrentUser;

    // Public properties
    vm.article = passArticleDataService.getArticles();
    // A retrieved article entry.
    vm.articleData = {
        uid: vm.article.uid,
        author: vm.article.author,
        authorReference: vm.article.authorReference,
        title: vm.article.title,
        description: vm.article.description,
        image: vm.article.image,
        timestamp: vm.article.timestamp,
        comments: {} // TODO: Add comments
    };
    vm.user = {}; // Update the properties with the users - if they are logged in

    init();

    function init() {
        // console.log('Retrieved the following article', vm.article);
        getCurrentUser();
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