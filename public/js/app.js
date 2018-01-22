var mainapp = angular.module('mainapp', ['ui.router', 'daypilot']);

mainapp.config(function($stateProvider, $urlRouterProvider) {

	// This simple state definition has these properties:
	// 1. name - a string of the state name. Example 'hello'
	// 2. url - when the state is active, the browser’s url will be /hello
	// 3. templateUrl - where to find the state’s html view, used to load activated state into a viewport
   // 4. controller - where to find the state's js controller (if any, it's optional)

	$urlRouterProvider.otherwise('/login');

	var home = {
      name: 'home',
		// name:'home?empid', // later access by id
		url:'/home',
		templateUrl:'views/homeView/home.html',
		controller:'homeCtrl'
	};

	var login = {
		name:'login',
		url:'/login',
		templateUrl:'views/loginView/login.html',
		controller:'loginCtrl'
	};

	var meeting = {
		name:'meeting',
      // name:'meeting?empid', // later access by id 
		url:'/meeting',
		templateUrl:'views/meetingView/meeting.html',
		controller:'meetingCtrl'
	};

	var admin = {
		name:'admin',
      // name:'admin?empid', // later access by id
		url:'/admin',
		templateUrl:'views/adminView/admin.html',
	};

   var adminEmployees = {
		name:'admin.employees',
		url:'/employees',
		templateUrl:'views/adminView/admin-empl.html',
		controller:'adminEmployeeCtrl'
	};
   
   var adminRooms = {
		name:'admin.rooms',
		url:'/rooms',
		templateUrl:'views/adminView/admin-room.html',
		controller:'adminRoomCtrl'
	};

	// Register both states with $stateProvider in a config block.
   // Because $stateProvider is an Angular Provider, 
   // you must inject it into a .config() block using Angular1 Dependency Injection.
	$stateProvider.state(home);
   $stateProvider.state(login);
   $stateProvider.state(meeting);
	$stateProvider.state(admin);
   $stateProvider.state(adminEmployees);
   $stateProvider.state(adminRooms);
});