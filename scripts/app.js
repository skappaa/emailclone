'use strict';
var app = angular.module('myApp', ['ui.router', 'ui.bootstrap']);
 //angular.module('myApp', ['ui.router'])

 app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the login/ sign up and Index page
            .state('app', {
                url:'/',
                views:{
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller  : 'LoginController'                  
                    }
                }
            })
        
            // route for the home page
            .state('home', {
                url:'/home',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })
        
            // route for the profile page
            .state('profile', {
                url:'/profile',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content@': {
                        templateUrl : 'views/profile.html',
                        controller  : 'ProfileController'                  
                    },
                     'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })

            // route for the messages page
            .state('messages', {
                url: '/messages',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content@': {
                        templateUrl : 'views/messages.html',
                       controller  : 'MessageController'
                    },
                     'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }
            })
        // route for the logout page
             .state('logout', {
                    url: '/',
                    views:{
                    'content@': {
                        templateUrl : 'views/login.html',
                        controller  : 'LogoutController'                  
                    }
                  }
                }) 
                
            .state('messages.newmail', {
                    url: '/newmail',
                    views:{
                        'tabView': {
                        templateUrl : 'views/newmail.html',
                        controller  : 'NewMailController'                  
                        }
                  }
                }) 
        .state('messages.inbox', {
                    url: '/inbox',
                    views:{
                        'tabView': {
                        templateUrl : 'views/inbox.html',
                        controller  : 'InboxController'          
                    }
                  }
                })
        .state('messages.sent', {
                    url: '/sent',
                    views:{
                        'tabView': {
                        templateUrl : 'views/sentmsg.html',
                        controller  : 'SentMsgController'                  
                    }
                  }
                }) 
    
        $urlRouterProvider.otherwise('/');
    }) 

 