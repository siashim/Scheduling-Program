var mainapp = angular.module('mainapp', ['ui.router', 'daypilot']);

mainapp.config(function($stateProvider, $urlRouterProvider) {

	// This simple state definition has these properties:
	// 1. name - a string of the state name. Example 'hello'
	// 2. url - when the state is active, the browser’s url will be /hello
	// 3. templateUrl - where to find the state’s html view, used to load activated state into a viewport
   // 4. controller - where to find the state's js controller (if any, it's optional)

	$urlRouterProvider.otherwise('/login');
   $urlRouterProvider.when('/admin','/admin/employees');

	var home = {
      name: 'home',
		// name:'home?empid', // later access by id
		url:'/home',
		templateUrl:'views/homeView/home.html',
      controller:'homeCtrl',
      data: {
         requireAuthorization: false,
      }
	};

	var login = {
		name:'login',
		url:'/login',
		templateUrl:'views/loginView/login.html',
      controller:'loginCtrl',
      data: {
         requireAuthorization: false,
      }
	};

	var meeting = {
		name:'meeting',
      // name:'meeting?empid', // later access by id 
		url:'/meeting',
		templateUrl:'views/meetingView/meeting.html',
      controller:'meetingCtrl',
      data: {
         requireAuthorization: false,
      }
	};

	var admin = {
		name:'admin',
      // name:'admin?empid', // later access by id
		url:'/admin',
      templateUrl:'views/adminView/admin.html',
      data: {
         requireAuthorization: true,
      }
	};

   var adminEmployees = {
		name:'admin.employees',
		url:'/employees',
		templateUrl:'views/adminView/admin-empl.html',
      controller:'adminEmployeeCtrl',
      data: {
         requireAuthorization: true,
      }
	};
   
   var adminRooms = {
		name:'admin.rooms',
		url:'/rooms',
		templateUrl:'views/adminView/admin-room.html',
		controller:'adminRoomCtrl',
      data: {
         requireAuthorization: true,
      }
   };

   var logout = {
		name:'logout',
		url:'/logout',
		templateUrl:'views/logoutView/logout.html',
      controller:'logoutCtrl',
      data: {
         requireAuthorization: false,
      }
   };

	// Register both states with $stateProvider in a config block.
   // Because $stateProvider is an Angular Provider, 
   // you must inject it into a .config() block using Angular1 Dependency Injection.
   $stateProvider.state(login);
   $stateProvider.state(home);
   $stateProvider.state(meeting);
	$stateProvider.state(admin);
   $stateProvider.state(adminEmployees);
   $stateProvider.state(adminRooms);
   $stateProvider.state(logout);
});

mainapp.run(function($rootScope, $transitions, $anchorScroll   ){
   // Exceptions for state transitions: 
   // 1. if landing in default state, take no more action  
   // 2. if current user is not logged in (implied if non-exist), go to login
   // 3. prevent unauthorized user access to auth states 
   $transitions.onStart({}, function(trans){
      // console.log(trans.from().name +'->'+trans.to().name);
      if(trans.to().name == "login"){
         return;
      }
      if($rootScope.currentUser == undefined || $rootScope.currentUser == null){
         return trans.router.stateService.target('login');
      }
      if($rootScope.currentUser.isAuthorized == false && trans.to().data.requireAuthorization == true){
         return false;
      }
   });

   // always scroll by extra pixels so content not hidden behind navbar
   $anchorScroll.yOffset = 70;

   
});