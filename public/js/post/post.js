'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('post', {
            url: '/post/:postId',
            templateUrl: 'js/post/post.html',
            controller: 'PostCtrl',
            /*
            		add a resolve block that retrieves all the users
            		so that the author field of the posts will be automatically 
            		populated
            */
            resolve: {
                author: function(User) {
                    return User.findAll();
                },
                posts: function(Post) {
                    return Post.findAll();
                }
            },
        })
        .state('edit', {
            url: '/editpost/:postId',
            templateUrl: 'js/create/create.html',
            controller: 'EditPostCtrl',
            resolve: {
                newPost: function(Post, $stateParams) {
                    return Post.get($stateParams.postId);
                }
            }
        })
});

// add necessary dependencies 
app.controller('PostCtrl', function(Post, $state, $scope, posts, $stateParams) {


    /* 1. FIND POST
    	use state params to retrieve the post id and attach post object to scope 
    	on controller load 
    */
    $scope.post = Post.get($stateParams.postId);
    console.log($scope.post);

    /*
    	2. EDIT POST 
    	create a function that edits the post, adds an alert that the post has been 
    	successfully edited, and displays the edited post.  

    */
    $scope.edit = function() {
        $state.go('edit', { postId: $scope.post._id })
    }

})

app.controller('EditPostCtrl', function(Post, $state, $scope, newPost, $stateParams) {
    $scope.newPost = newPost;
    $scope.newPost.author = newPost._author.username;

    $scope.postPost = function() {
        var $post = $scope.newPost;
        Post.update({
                title: $post.title,
                body: $post.body,
                author: author
            })
            .then(function(post) {
                console.log('post', post);
                $state.go('main');
            });
    };
});