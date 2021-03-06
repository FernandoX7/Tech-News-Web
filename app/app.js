/**
 * Created by fernandoramirez on 9/1/16.
 */
techNews = angular.module('techNews', ['ngRoute']);

// Routing
techNews.config(function ($routeProvider) {
    $routeProvider
    // Home Page
        .when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'MainController as mainController'
        })
        // Article Detail
        .when('/article-detail', {
            templateUrl: 'app/article-detail/article-detail.html',
            controller: 'ArticleDetailController as articleDetailCtrl'
        })
        // New Article
        .when('/new-article', {
            templateUrl: 'app/new-article/new-article.html',
            controller: 'NewArticleController as newArticleCtrl'
        })
        // Login
        .when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'LoginController as loginCtrl'
        })
        // Register
        .when('/register', {
            templateUrl: 'app/login/register.html',
            controller: 'RegisterController as registerCtrl'
        })
        // User Profile
        .when('/profile', {
            templateUrl: 'app/user-profile/profile.html',
            controller: 'ProfileController as profileCtrl'
        })
        .otherwise({redirectTo: '/'});
}); // End of routing
