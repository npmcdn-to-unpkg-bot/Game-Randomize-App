//A simple jquery function to keep track of the states of the buttons.
//Active class means clicked
//NEEDS .on();
//http://www.giantbomb.com/api/platforms/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=jsonp&callback=?&sort=release_date&field_list=name,release_date
//Results limited to 100 at a time use offset=100 to get more.


var allPlatforms  = {};
var platformOffSetCounters = 0; 


function showResults(result){
	var plaformButtonList = $('.button_column.platform ul');
	var defaultAmountButtons = 6;
	var buttonsOnScreen = 0;
	console.log('in the show results section');
	//result.results is because there is some metadata that you need to cycle through
	$.each(result.results, function(index,value) {
			var platformName = value.name;
			var releaseDate = value.release_date;
			allPlatforms[platformName] = releaseDate;
			var button =  $('<button></button>');
			button.addClass('game_button');
			button.attr('id', platformName);
			button.text(platformName);
			plaformButtonList.append(button);
			buttonsOnScreen++;
			//Default is 6 buttons 
			if(buttonsOnScreen>defaultAmountButtons){
				button.hide();
			}
			//Finally since the api limits the amount of results to 100 at a time.
			//Create an offeset counter, to put up where you left off and 
			platformOffSetCounters++;
			console.log('offset is currently at ' + platformOffSetCounters);	
		});
	console.log('done WITH showResults() function');
	console.log(allPlatforms);
	
}





//Api Pull function needs to be its only function, not annoyomous. 
function pullPlatformData(){
	console.log('offset is currently at ' + platformOffSetCounters);
		$.ajax({
 		url: 'http://www.giantbomb.com/api/platforms/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=jsonp&callback=?&sort=release_date:desc&field_list=name,release_date',
        type: "GET",
        //What gets put inside the url.. the resources and api_ key dont work so I just hardcoded them in there...
        data:{
        		 //resources:'platforms',
        		// api_key:'f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0',
        		 format:'jsonp',
        		 crossDomain:true,
        		 offset: platformOffSetCounters,
        		// field_list:'name,release_date',
        		 json_callback:'showResults',	
        		// sort:'release_date',
        	},
        dataType:'jsonp'	
 		}).done(function(data){
 			console.log('done with the pull of the api data');
 			showResults(data.results);
 			console.log(data);
 		});
}




//If offset counter is not a multiple of 100, then you reached the end of the list.
 $(document).ready(function(){
 		console.log("executing json Giant bomb api for the first time.");
 		pullPlatformData();	
 		
 });








 $(function generateButtons(){
			$(".gen_button_platform").click(function(){
				//Create new buttons in the platform section
				//Right now it generates one button, but realistical
				//it should do maybe 6 at a time.
				//All the buttons are premade loop through the collumn
				//and make 3 buttons unhidden at a time.
				console.log(platformOffSetCounters);
				if( platformOffSetCounters%100 == 0 || platformOffSetCounters==0 ){
					console.log('pulling platform data');
					pullPlatformData();
				}

			var plaformButtonArray = $('.button_column.platform .game_button');
			var amountOfButtonsGenerate = 3;
			//Change counter to change how many buttons come up.
			var counter = 0;
			$.each(plaformButtonArray, function(index,value){
				var tempButton = $(value);
				//console.log(tempButton);
				if(counter<amountOfButtonsGenerate){
						 if(tempButton.is( ":hidden" )){
						 	console.log(tempButton);
						 	tempButton.show();
						 	counter++;	
						 }
					
				}	
			});

				// var  button = $("<button> </button>");
			// button.addClass('game_button');
			// button.attr('id','fourth' );
			// button.text('fourth');

			// console.log('created button with  class ' + button.attr('class'));
			// plaformButtonList.append(button);
			});
		});

//Changing the button states
$(document).on('click' , '.game_button' , function(){
		console.log( $(this).text());
				if( $(this).hasClass('active') ){
					console.log('removed active class');
					$(this).removeClass("active");
				}else{
					console.log('added active class ')
					$(this).addClass('active')
				}
	});


//TIME TO PULL THE DATA FROM THE APIS!
//1. GIANT BOMB
//f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0 API KEY
//http://www.giantbomb.com/api/platforms/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=json]&field_list=name,release_date
//Above is a sample query returning just the names of all the plaforms, NOW LETS MAKE SOME BUTTONS release_date
/* Pull data of all platforms + release date, put in array most recent first. New button id = platform name*/










