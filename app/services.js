/**
 * Created by fernandoramirez on 9/4/16.
 */
techNews.service('passArticleDataService', function () {
    var articlesList = [];

    var addArticleList = function (firebaseArticles) {
        articlesList = firebaseArticles;
    };

    var getArticles = function () {
        return articlesList;
    };

    return {
        addArticleList: addArticleList,
        getArticles: getArticles
    };
});