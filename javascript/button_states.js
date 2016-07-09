//A simple jquery function to keep track of the states of the buttons.
//Active class means clicked
/*
I AM CREATING MY OWN DATABASE. AJAX THE DATA INTO THE LOCAL HOST TALBES. 

*/




var allGamesEntry  = [] ; 
var allPlatforms  = [];
var platformOffSetCounters = 0; 
var genreOffSetCounters = 0;
var scoreOffSetCounters = 0;
var timeOffSetCounters = 0;
//Booleans to see which column to append the buttons to
var platformSwitch=false ;
var genreSwitch=false ;
var scoreSwitch = false; 
var timeSwitch=false; 
var showButtons = 4;
var defaultAmountButtons =6; //bUTTONS to initially spawned
var platformIds = []; 
var mixerNumberOffSet = 0 ;
var platformFilterString='&';
var userSelectedPlatformGamesId = [];
var totalGames; 
// $.get(
// 		'http://www.giantbomb.com/api/games/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=jsop&field_list=name',
// 		{crossDomain:true, format:'jsonp', json_callback},
// 		'jsonp',
// 		function(response){
// 			totalGames = response.number_of_total_results 
// 		}
// 	);


var request = {
	//remove limit later
	url:'http://www.giantbomb.com/api/games/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&limit=1',
    type: "GET",
    dataType:'jsonp',
    data:{
    format:'jsonp',
    crossDomain:true,
    offset: 0,
    json_callback: 'cacheData',
    field_list:'name, platforms, image,deck, original_release_date'
	}
};

	var response = allGamesAjaxCall(request); 
//http://www.giantbomb.com/api/games/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=json&field_list=name,deck,platforms,original_release_date,image


myGameStorage = localStorage;

var platformUrl = 'http://www.giantbomb.com/api/platforms/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&sort=release_date:desc&field_list=id,name';
var genreUrl = 'http://www.giantbomb.com/api/genres/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=jsonp&callback=?&field_list=name';
var scoreUrl ;  
var timeUrl  ;

function showResults(result){
	var buttonsOnScreen = 0;
	console.log('in the show results section');
	//result.results is because there is some metadata that you need to cycle through
	$.each(result.results, function(index,value) {
			var mainName = value.name;
			var mainId = value.id;
			console.log('MAIN ID PUSHED IS '  +  mainId);
			var button =  $('<button></button>');
			button.addClass('game_button');
			button.attr('id', mainId);
			button.text(mainName);
			//Append here
			var column ;
			if(platformSwitch){
				platformOffSetCounters++;
				column = $('.button_column.platform');
				column.append(button);
				console.log('column of type platform '  + ' is at offset value '  +  platformOffSetCounters);
			}else if (timeSwitch){
				timeOffSetCounters++;
				column = $('.button_column.time');
				column.append(button);
				console.log('column of type time '  + ' is at offset value '  +  timeOffSetCounters);
			}else if (genreSwitch){
				genreOffSetCounters++;
				column = $('.button_column.genre');
				column.append(button);
				console.log('column of type genre '  + ' is at offset value '  +  genreOffSetCounters);
			}else if(scoreSwitch){
				scoreOffSetCounters++;
				column = $('.button_column.score');
				column.append(button);
				console.log('column of type score '  + ' is at offset value '  +  scoreOffSetCounters);
			}

			buttonsOnScreen++;
			if(buttonsOnScreen>defaultAmountButtons){
				console.log('HIDING BUTTON ');
				button.hide();
			}

		});
	console.log('done WITH showResults() function');
	//Turn off all the switches 
	switchOffAll();
}


function switchOffAll(){
		console.log('inside switch of all');
		console.log('platformSwitch  is ' + platformSwitch );
		console.log('genreSwitch  is ' + genreSwitch );
		console.log('timeSwitch  is ' + timeSwitch );
		console.log('scoreSwtich  is ' + scoreSwitch );
		timeSwitch=false; 
		genreSwitch=false;
		scoreSwitch =false;
		platformSwitch  = false;
}

/*
 url : The url base from where you get the data
 offSetNum: Giantbomb limits results to 100, so there needs to be an offset for multiple calls.
 type: tell the function to tell which column to put the buttons in.
 firstPull: A boolean to tell the function if this is the first time that the buttons will appear on the page. 
*/

function pullData(url, offSetNum,type, firstPull){
	console.log('offset is currently at ' + offSetNum);
		 switch(type){
		 	case 'platform':
		 		platformSwitch = true; 
		 		break;
		 	case 'genre':
		 		genreSwitch = true; 
		 		break;
		 	case 'time':
		 	timeSwitch = true; 
		 		break;	

		 	case 'score':
		 		scoreSwitch = true; 
		 		break;
		 }
		$.ajax({
 		url: url,
        type: "GET",
        dataType:'jsonp',
        data:{
        		 format:'jsonp',
        		 crossDomain:true,
        		 offset: offSetNum,
        		 json_callback: 'showResults',
        	},
        complete: function(){	
        	console.log('Done with the AJAX Call');
        	if(firstPull){
        		console.log('First pull, so calling the Genre pulldata() function');
        		//pullData(genreUrl, genreOffSetCounters, 'genre');	
        	}
        },	
        success: function(data){
        	//Not Successful, but Data was pulled. 
        	console.log('called success: in AJAX call') ;
        }

 		});
}




 $(document).ready(function(){
 		//console.log("executing json Giant bomb api for the first time."); 		
 		//var firstPull = true ;
 		//pullData(platformUrl, platformOffSetCounters,'platform', firstPull );
 		


 });

 

//There should be 4 different generate buttons. 
//1.Decide if what category the button is in
//2. the annyomous function inside click, make it a real function.
//3. pass in the url etc as need to the pull data function. 
 $(function detectClick(){
			$(".gen_button.platform").click(function(){
				console.log('generate button clicked');
				generateButtons(platformUrl, platformOffSetCounters, 'platform');
				platformSwitch=true;
			});
			$(".gen_button.genre").click(function(){
				console.log('generate button clicked');
				generateButtons(genreUrl, genreOffSetCounters, 'genre');	
				genreSwitch = true;
			});
			$(".gen_button.time").click(function(){
				console.log('generate button clicked');
				generateButtons(timeUrl, timeOffSetCounters, 'time');
				timeSwitch = true;

			});
			$(".gen_button.score").click(function(){
				console.log('generate button clicked');
				generateButtons(scoreUrl, scoreOffSetCounters, 'score');
				scoreSwitch = true;
		
			});		
});


//Supposed to gather from ALL BUTTONS
function gatherUserPreferences(){
		//Get what platform buttons where clicked.
		console.log('in gatherUserPreferences() function');
		var platformButtons = $('.button_column.platform .game_button');
		console.log('platformButtonsArray is of length ' + platformButtons.length);
		var i= 0 ;
		//Take out hidden buttons, and buttons that do not have the active class.
		$.each(platformButtons,function(index, value){
			//Make a jquery instance of the current index
			var tempJQ = $(value);
			console.log('looping through, current button is :  '  + tempJQ );
			
			if( !(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				platformIds.push(tempJQ.attr('id'));
				console.log( ' currentButton is not hidden  and  active ');
			}
		});
			//Have the id of all the pushed platform buttons now just need another ajax call.
			//Call the function to create the url that appends the ids.
			makeFilterUrlString();
			pullFilteredData(mixerNumberOffSet);
}


function makeFilterUrlString(){
		var   i = 0 ;
		for(i; i<platformIds.length; i++){
			console.log('filter=platforms:'+platformIds[i] + '&');
			platformFilterString +=  'filter=platforms:'+platformIds[i]+ '&'; 
		}

}


// AJAX CALL TO PUll the filtered data
function pullFilteredData(){
	//NEED TO KEEP ADDING filter = for each game SMH
		var url = 'http://www.giantbomb.com/api/games/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&field_list=name,id';
		url += platformFilterString;
		$.ajax({
 		url: url,
        type: "GET",
        dataType:'jsonp',
        data:{
        		 format:'jsonp',
        		 //filter: platformFilterString,
        		 crossDomain:true,
        		 offset: mixerNumberOffSet,
        		 json_callback: 'randomResultPull',
        	},
        complete: function(){	
        	console.log('Done with the AJAX Call');
     //   	Call recursively until all the results are done.
        	if( mixerNumberOffSet%100 == 0 || mixerNumberOffSet==0 ){
						console.log('pulling more data because the offset is a mutiple of 100');
						pullFilteredData();
				}else{
					//The call is over, randomize the data
					randomizeData();
				}
        },	
        success: function(data){
        	console.log('called success: in AJAX call') ;
        }
 		});
}



///SUCESS FOR THE FILTERED JSONP CALLBACK

function randomResultPull(result){	
	$.each(result.results, function(index,value) {
		mixerNumberOffSet++;
		console.log(value);
		userSelectedPlatformGamesId.push(value.id);
	});
}

//Randomized the ids, and choose one.
function randomizeData(){
	var random = Math.floor((Math.random()*userSelectedPlatformGamesId.length)); 
	console.log('Random Index choosen at index ' + random); 
	console.log('Contained in this ' + userSelectedPlatformGamesId[random]);
	displayRandomGame(userSelectedPlatformGamesId[random]);
}
  

//Finally another function to put all the gather data from the random Selction together
//and the image name, and maybe the details of the final selected game. 

function displayRandomGame(gameId){
	var url = 'http://www.giantbomb.com/api/games/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&field_list=name,deck,image';
	url +=  'filter=id:'+gameId;
	$.ajax({
 		url: url,
        type: "GET",
        dataType:'jsonp',
        data:{
        		 format:'jsonp',
        		 crossDomain:true,
        		 json_callback: 'sendToScreen',
        	},
        complete: function(){	
        	console.log('Done with the AJAX Call');
        }
 		});
}

function sendToScreen(results){

	console.log('name of selected game is .... ' +  results.result,name); 

}




///////////////////////////////////////////////////////////////////////////
 function generateButtons(url , offSetNum , type){
 					console.log('in function GENERATEBUTTONS()');
					if( offSetNum%100 == 0 || offSetNum==0 ){
						console.log('pulling more data');
						pullData(url, offSetNum, type,false);
						//set the default buttons to 0. Only add buttons from this function
						defaultAmountButtons = 0;
					}	
					var column ;
					//Change this to type 
					if(type == 'platform'){
						column = $('.button_column.platform .game_button');
						console.log('buttons attempted to be added to platform');
					}else if (type == 'time'){
						column = $('.button_column.time .game_button');
						console.log('buttons attempted to be added to time');

					}else if (type == 'genre'){
						column = $('.button_column.genre .game_button');
						console.log('buttons attempted to be added to genre');

					}else if(type == 'score'){
						column = $('.button_column.score .game_button ');
						console.log('buttons attempted to be added to score');

					}
					var counter = 0;
					$.each(column, function(index,value){
						console.log('entering the each function to make the buttons unhidden');
						var tempButton = $(value);
						console.log(tempButton);
						if(counter<showButtons){
							console.log('inside the show buttons unhiddens!!!!');
							 if(tempButton.is( ":hidden" )){
							 	console.log('counter is at ' + counter);
							 	tempButton.show();
							 	counter++;		
							 }
				}	
			});
			switchOffAll();
 }


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




/*
One Ajax Call to pull all possible games and cache them in the browser using Javascript
*/

$(function randomizeButtonClick(){
 	$(".execute_button").click(function(){
 		console.log('Executing random search'); 		
 		gatherUserPreferences(); 
 	});
 });

////////////////////////////////////// Cache
var mainGamesPullOffset =  0;

//Insert char at specific position 
function insertAt(originalString, index, char){
	console.log('String is  :  ' + originalString);
	console.log('character to insert is:   ' + char );
	return originalString.substr(0,index) + char +originalString.substr(index,originalString.length);
}



//For the jsonp callback functions
//Waittt a game could have been released for multiple platforms....
// Put all the platforms in as one string????? Separted by comma. 


function cacheData(result){
	console.log('cacheData function called');
	$.each(result.results, function(index,value){
		var name = value.name;
		console.log('name is ' +name); 
		var deck =  value.deck;
		console.log('deck is ' + deck); 
		var image =  value.image.medium_url;
		console.log('image url '  + image);
		var platforms = value.platforms;
		//There COULD BE MULTIPLE FOR ONE GAME
		var allPlatforms="" ;
		$.each(platforms, function(index,value){
			console.log("Name of platform/s is " + value.name);
			allPlatforms += value.name + ", ";
		});
		console.log("Name of platform/s is " + allPlatforms);
		var originalRelease = value.original_release_date;
		console.log('Original release date is ' + originalRelease);
		mainGamesPullOffset++;
		//Put the data in a gameEntry Object.
		//Date includes time, which is not needed for mySQL, trim it.
		var newDate = originalRelease.substring(0, 10);
		//SQL needs to had apstromphes double escaped, so that could possibly
		//be in the  name or deck.
		//WHAT IF it has more than one apostrophe...
		

			for(var i=0;i<name.length;i++){
				if(name[i]==='\''){
					name = insertAt(name, i , '\'');
					console.log('Found apostrophe at index ' + i );
					i++;
				}
			}
			console.log('New name is ' + name);

			for(var i=0;i<deck.length;i++){
				if(deck[i]==='\''){
					console.log('Found apostrophe at index DECK' + i );
					deck  = insertAt(deck, i , '\'');
					i++;
				}
			}
		
		console.log('New deck is '  + deck); 
		var gameEntry = {
			name:name,
			deck: deck,
			image:image,
			platform:allPlatforms,	
			originalRelease:newDate
		};
		allGamesEntry.push(gameEntry);
		console.log(gameEntry);
	});
	
		//When everything is done make call another function for the AJAX to post the data into my database
		// data = {
		// 		name:allGamesEntry[0].name,
		// 		deck: allGamesEntry[0].deck,
		// 		image:allGamesEntry[0].image,
		// 		platform:allGamesEntry[0].platforms,
		// 		originalRelease:allGamesEntry[0].originalRelease
		// 	}
		// 	$.post(
		// 		'insertgames.php',
		 //		{
		// 		name:allGamesEntry[0].name,
		// 		deck: allGamesEntry[0].deck,
		// 		image:allGamesEntry[0].image,
		// 		platform:allGamesEntry[0].platforms,
		// 		originalRelease:allGamesEntry[0].originalRelease
		// 		},
		// 		function(){
		// 			console.log("FUCKKKKKKKKKKKKKKKK");
		// 		});
		
	 // var invocation = new XMLHttpRequest(); 
	 // var url = "http://localhost/insertgames.php";
	 // function callOtherDomain(){
	 // 	if(invocation){
	 // 		invocation.open('POST',url, true)
	 // 		invocation.onreadystatechange = function(){
	 // 			if(invocation.readyState === XMLHttpRequest.DONE && invocation.status ===200){
	 // 				console.log(invocation.responseText);
	 // 			}
	 // 		};
	 // 		invocation.send(); 
	 // 	}
	 // }

	//  var name = "KODAK BLACK";
	//  var age = 18; 
	// var dataString = 'name='+ name + '&age' + age ; 
	 data = {
		 		name:allGamesEntry[0].name,
		 		deck: allGamesEntry[0].deck,
		 		image:allGamesEntry[0].image,
		 		platform:allGamesEntry[0].platform,
		 		originalRelease:allGamesEntry[0].originalRelease
		 	}


	var request =  $.ajax({
 		url: 'http://localhost/gameApp/php/insertgames.php',
        type: "post",
        data
		 });
    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
        console.log(response);
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            (textStatus, errorThrown));
        });


	 }

function allGamesAjaxCall(request){
			// $.ajax({
 		// 	url: request.url,
 		// 	type:'GET',
 		// 	dataType:'jsonp',
 		 	data = {
 		 		crossDomain:true,
   	    		format:'jsonp',
    			offset: mainGamesPullOffset,
    			json_callback:'cacheData',
    			field_list:request.field_list,
     		}

     		$.get(request.url,
       				data,
       				'cacheData',
       				'jsonp'
       		)

}














