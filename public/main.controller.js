'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('main', {
		url: '/',
		templateUrl: '/main.html',
		controller: 'MainController',
			// RESOLVE!
		resolve: {
			users: function(User){
				return User.findAll();
			},
			posts: function(Post,users){
				return Post.findAll({});
			}
		}
	});
});

app.controller('MainController', function($scope, posts) {

	$scope.allPosts = posts;
	console.log('posts: ', posts);

});


