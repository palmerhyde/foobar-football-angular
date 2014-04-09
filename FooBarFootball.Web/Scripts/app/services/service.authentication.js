fooBarApp.service('AuthenticationService', function($cookies) {
    	this.isLoggedIn = function() {
    		var authCookie = $cookies.firebaseSessionKey;
    		
    		if(!authCookie || authCookie.length < 1) {
    			return false;
    		}
    		
    		return true;
    	};
});