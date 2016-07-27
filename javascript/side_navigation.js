/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";

    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    //Also close the submenus
    var subpage = $('.subpage');
		subpage.css({
			'marginLeft': 0,
			'width':0
		});
	var subpage = $('.subpage_background');
		subpage.css({
			'marginLeft': 0,
			'width':0
		});

}


/* Function to close all the submenus, use when anther is opened*/
function closeOtherSubMenus(className){
	var menus = $('.subpage');
	console.log(menus);
	$.each(menus, function(index,value){
		var tempJQ = $(value);
		var nodeClass = tempJQ.attr('class');
		if(!(nodeClass.includes(className))) {
			tempJQ.css({
				'marginLeft': 0,
				'width':0
			});
		}
	});
}

 $(document).ready(function(){
 	//closeOtherSubMenus("aaa");
 }); 



/*Function to open the submenus */

$(document).on('click' , '.primary_menu' , function(){
		console.log('In subpage click');
		var classes = $(this).attr('class'); 	
		var sideNavWidth  = $("#mySidenav").width();
		var type = (classes.substr(0, classes.indexOf(" ")));
		console.log( type);
		switch(type){
			case'platform':
			 	closeOtherSubMenus("platform");
				$('.platform.subpage').css({
			 		'marginLeft': sideNavWidth ,
					'width':'45%'
			 	});
			 	$('.subpage_background').css({
			 		'marginLeft': sideNavWidth,
					'width':'45%'
			 	});
			break;
			case 'genre':
			 	closeOtherSubMenus("genre");
				$('.genre.subpage').css({
			 		'marginLeft': sideNavWidth,
					'width':'45%'
			 	});
			 		$('.subpage_background').css({
			 		'marginLeft': sideNavWidth,
					'width':'45%'
			 	});
			break;
			case 'time_to_beat':
			 	closeOtherSubMenus("time_to_beat");
				$('.time_to_beat.subpage').css({
			 		'marginLeft': sideNavWidth,
					'width':'45%'
			 	});
			 		$('.subpage_background').css({
			 		'marginLeft': sideNavWidth,
					'width':'45%'
			 	});
			break;
			case 'rating':
			 	closeOtherSubMenus("rating");
				$('.rating.subpage').css({
			 		'marginLeft': sideNavWidth,
					'width':'45%'
			 	});
			 		$('.subpage_background').css({
			 		'marginLeft': sideNavWidth,
					'width':'45%'
			 	});
			break;
			case 'year':
			 	closeOtherSubMenus("year");
				$('.year.subpage').css({
			 		'marginLeft': sideNavWidth,
					'width':'45%'
			 	});
			 		$('.subpage_background').css({
			 		'marginLeft': sideNavWidth,
					'width':'45%'
			 	});
			break;
		}
});



function closeSubMenu(){
	console.log('Exiting submenu');
	var subpage = $('.subpage');
	subpage.css({
		'marginLeft': 0,
		'width':0
	});
}

