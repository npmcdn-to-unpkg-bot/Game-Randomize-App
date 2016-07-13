/*
I AM CREATING MY OWN DATABASE. AJAX THE DATA INTO THE LOCAL HOST TALBES. 
*/
//WITH TIME,GENRE,PLATFORMS,RELEASEDATE (maybe rating?)
var allGamesEntry  = [] ; 
var allPlatforms  = [];
var showButtons = 4;
var defaultAmountButtons =6; //bUTTONS to initially spawned
var platformIds = []; 
var platformOffset = 0 ;
var genreOffSetCounters =  0 ;
var platformFilterString='&';
var userSelectedPlatformGamesId = [];
var totalGames; 
var platformArray= [] ;
var genreArray = {};

function cachePlatformData(result){
	console.log('in the show results section');
	$.each(result, function(index,value) {
			var mainName = value.name;
			var mainId = value.id;
			localStorage.setItem('plat ' + mainId, mainName);
			platformOffset++;
			console.log('Pushed '  + mainName + " with id: "  + mainId + " to localStorage Platform");
		});
	console.log('done WITH cachePlatformData() function');
}
function cacheGenreData(result){
	console.log('in the show results section');
	$.each(result, function(index,value) {
			var mainName = value.name;
			var mainId = value.id;
			localStorage.setItem('genre '+ mainId, mainName);
			genreOffSetCounters++;
			console.log('Pushed '  + mainName + " with id: "  + mainId + " to localStorage Genre");
		});
	console.log('done WITH cacheGenreData() function');
	
}
/*
Generate buttons from local storage for both platforms and genres. Makes buttons for all data, and hides the rest
to ensure there is only on long load time. 
*/

function generatePlatformButtonsfromCache(numberOfDeafaultButtons){
	var platButtonsAdded=0;
	for (var i = 0; i < localStorage.length; i++){
		if(localStorage.key(i).includes("plat")){
			var unCodedId = localStorage.key(i);
			var realId = (unCodedId.substr(unCodedId.indexOf(" "), unCodedId.length)).trim();
			var mainName =  localStorage.getItem(unCodedId);
			var mainId = realId;
			var button =  $('<button></button>');
			button.addClass('game_button');
			button.attr('id', mainId);
			button.text(mainName);
			column = $('.button_column.platform');
			column.append(button); 
			platButtonsAdded++;
			console.log('Platform buttons added at ' + platButtonsAdded);
			if(platButtonsAdded  >=numberOfDeafaultButtons){
				console.log('Hidling buttons in platform');
				button.hide()
			}
		}
	}
}

function generateGenreButtonsFromCache(numberOfDeafaultButtons){
	var genreButtonsAdded=0; 
	for (var i = 0; i < localStorage.length; i++){
		if(localStorage.key(i).includes("genre")){
			var unCodedId = localStorage.key(i);
			var realId = (unCodedId.substr(unCodedId.indexOf(" "), unCodedId.length)).trim();
			var mainName =  localStorage.getItem(unCodedId);
			var mainId = realId;
			var button =  $('<button></button>');
			button.addClass('game_button');
			button.attr('id', mainId);
			button.text(mainName);
			column = $('.button_column.genre');
			column.append(button);
			genreButtonsAdded++; 
			if(genreButtonsAdded  >=numberOfDeafaultButtons){
				button.hide();
			}
		}
	}
}



function platformPullData(){
	var platformUrl ='https://igdbcom-internet-game-database-v1.p.mashape.com/platforms/?';
		$.ajax({
 		url: platformUrl,
        type: "GET",
        dataType:'json',
        data:{
        		 fields:'name,id',
        		 offset: platformOffset,
        		 limit:50,
        		 order:'created_at:asc'
        	},
        complete: function(){	
        	console.log('Done with the AJAX Call');
        	//Here you will keep generating till the offset is over
        	  console.log('Platform offset is currently at ' + platformOffset);
        	if( platformOffset%50 == 0 || platformOffset==0 ){
        	  console.log('More data exists, starting another pull');
        	  platformPullData();
        	}else{
        		generatePlatformButtonsfromCache(5);
        	}
        },	
        success: function(data){
        	console.log('called success: in AJAX call') ;
        },
        beforeSend:function(xhr){
			xhr.setRequestHeader("X-Mashape-Authorization", "LRvm3vxiEQmshkEwtQG4T9bvtltop1lz3VZjsnPNh1NDFpFH1K");
        },
        error(xhr, textStatus, errorThrown){
        	if(xhr.readyState < 4){
        		//Means the call was interrupted by the user.
        		xhr.abort();
        		window.localStorage.clear();

        	}
        }
 		}).done(function(data){
 			cachePlatformData(data);
 		});
}


function genrePullData(){
		console.log('In genrePullData');
	    var genreUrl = 'https://igdbcom-internet-game-database-v1.p.mashape.com/genres/?';
		$.ajax({
 		url: genreUrl,
        type: "GET",
        dataType:'json',
        data:{
        		 fields:'name,id',
        		 offset: genreOffSetCounters,
        		 limit:50,
        		 order:'created_at:asc'
        	},
        complete: function(){	
        	console.log('Complete() with the AJAX Call');
        	//Here you will keep generating till the offset is over
        	  console.log('Genre offset is currently at ' + genreOffSetCounters);
        	if( genreOffSetCounters%50 == 0 || genreOffSetCounters==0 ){
        	  console.log('More data exists, starting another pull');
        	  genrePullData();
        	}else{
        		console.log('generateGenreButtonsFromCache Called in else');
        		generateGenreButtonsFromCache(5);
        	}
        },	
        success: function(data){
        	console.log('called success: in AJAX call') ;
        },
        beforeSend:function(xhr){
			xhr.setRequestHeader("X-Mashape-Authorization", "LRvm3vxiEQmshkEwtQG4T9bvtltop1lz3VZjsnPNh1NDFpFH1K");
        },
        error(xhr, textStatus, errorThrown){
        	if(xhr.readyState < 4){
        		//Means the call was interrupted by the user.
        		xhr.abort();
        		window.localStorage.clear();
        	}
        }
 		}).done(function(data){
 			console.log('cacheGenreData called in done function');
 			cacheGenreData(data);

 		});
}

 $(document).ready(function(){
 	console.log("executing json Giant bomb api for the first time."); 		
 	if(window.localStorage.length<=0){
 		platformPullData();
 		genrePullData();
	}else{
		generatePlatformButtonsfromCache(6);
		generateGenreButtonsFromCache(6);
	}
 });

 
 $(function detectClick(){
			$(".gen_button.platform").click(function(){
				console.log('generate button clicked');
				unhidePlatformButtons(1);
			});
			$(".gen_button.genre").click(function(){
				console.log('generate button clicked');
				unhideGenreButtons(1);	
			});	
});


///////////////////////////////////////////////////////////////////////////
 function unhidePlatformButtons(showButtons){
 					console.log('in function GENERATEBUTTONS()');
					column = $('.button_column.platform .game_button');
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
}

 function unhideGenreButtons(showButtons){
 					console.log('in function GENERATEBUTTONS()');
					column = $('.button_column.genre .game_button');
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
}




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
















