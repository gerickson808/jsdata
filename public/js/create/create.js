'use strict'; 

app.config(function($stateProvider) {
	$stateProvider.state('create', {
		url: '/create/:userId',
		templateUrl: 'js/create/create.html',
		controller: 'CreateCtrl',
		resolve: {
			author: function($stateParams, User){
				return User.get($stateParams.userId);
			}
		}  
	})
})

// add necessary dependencies here 
app.controller('CreateCtrl', function($scope, author, Post, $state) {

	$scope.newPost = {author: author.username};
	$scope.previewTrue = false;

	$scope.preview = function() {
		$scope.previewTrue = !$scope.previewTrue;
	};

	/*

	TODOS: 
	1 - create the object that the form can use via ng-model
  2 - create a function that 
	 		a) persists the ng-modeled post object 
			b) changes the state to 'main'  

	*/
	 $scope.postPost = function(){
	 	var $post = $scope.newPost;
    Post.create({
    	title: $post.title,
    	body: $post.body,
    	author: author
    })
    .then(function(post){
      console.log('post', post);
      $state.go('main');
    });
  };


});