/**
 * For more info goto:
 * https://gist.github.com/collinglass/d6c69262a223faab5ee7
 */

function index(){
	vm2.leftpanel  = 'logincopy';
	vm2.rightpanel = 'loginform';
	vm2.headerbar  = 'loginheaderbar';
}

function login(){
	vm2.leftpanel = 'chatview';
	vm2.rightpanel = 'botoptions';
	vm2.headerbar  = 'chatheaderbar';
}

$(window).on("popstate", function(){
	var url = window.location.pathname.replace('/andybot', '');
	url = url.replace('/', '');
	if (url === ''){
		vm2.leftpanel  = 'logincopy';
		vm2.rightpanel = 'loginform';
		vm2.headerbar  = 'loginheaderbar';
	} else if (url === 'login'){
		vm2.leftpanel='chatview';
		vm2.rightpanel = 'botoptions';
		vm2.headerbar  = 'chatheaderbar';
	}
});

/**
 * https://stackoverflow.com/questions/23690495/angular-redirect-to-home-on-refresh
 */
window.onbeforeunload = function() 
{ 
  window.setTimeout(function () { window.location = 'http://localhost/andybot/'; }, 0); 
  window.onbeforeunload = null; 
}

//put routing in this file, uses page.js
page('/', index);
page('login', login);