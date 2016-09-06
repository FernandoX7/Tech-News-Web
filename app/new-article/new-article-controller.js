/**
 * Created by fernandoramirez on 9/4/16.
 */
angular.module('techNews').controller('NewArticleController', function (getLoggedInUser, $timeout) {

    var vm = this;

    // Public functions
    vm.init = init;
    vm.getCurrentUser = getCurrentUser;
    vm.createArticle = createArticle;
    vm.getTimestamp = getTimestamp;

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
        timestamp = getTimestamp();
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

// Get Date
    function getTimestamp() {
        // Expected result = September 1, 2016 9:13:34 PM
        var objToday = new Date(),
            weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
            dayOfWeek = weekday[objToday.getDay()],
            domEnder = function () {
                var a = objToday;
                if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
                a = parseInt((a + "").charAt(1));
                return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : ""
            }(),
            dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
            curMonth = months[objToday.getMonth()],
            curYear = objToday.getFullYear(),
            curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
            curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
            curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
            curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";

        var timestamp = curMonth + ' ' + dayOfMonth + ', ' + curYear + ' ' + curHour + ":" + curMinute + ":" + curSeconds + ' ' + curMeridiem;
        var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

        return timestamp
    }

});