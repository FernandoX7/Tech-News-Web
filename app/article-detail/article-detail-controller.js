/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('ArticleDetailController', function ($scope, $timeout, passArticleDataService) {

    var vm = this;

    // Public functions

    // Public properties
    vm.articles = passArticleDataService.getArticles();

    console.log('Fetched the following articles', vm.articles);

});