'use  strict';

app.factory('User', function(DS) {
	
  /*
    create a User jsdata resource 
  */
  return DS.defineResource({
  	name: 'users'
  });
}).run(function(User){});

