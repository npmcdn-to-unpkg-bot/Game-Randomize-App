//Functions to pull data from the IGDB API, its different from the Giant bomb api so there will have
//to be a lot of formating the data.

/*
Couple of things about the way this API formats the data,
1. there can be multiple genres for a game. Genres are specified by 2 digits. (THANKS DOCUMENTATION)
2. there can be mutiple platforms for a game, again specified by 2 digits.
3.there can be multiple release dates, each for a different platform.
...With that being said, it is best to update the code for the buttons.

*/


//Limit is 50 at at time, for now test 1 
//Need to keep track  of the offset number
var offSetNumber= 0;


var requestData = {
	url:'https://igdbcom-internet-game-database-v1.p.mashape.com/games/?',	
    type: "GET",
    dataType:'json',
    data:{
    fields:'name,id,cover,summary,platforms,genres,release_dates,time_to_beat,rating',
   // fields:'*',
    limit:1
	}
};

var response = ajaxCall(requestData); 

function ajaxCall(requestData){

	console.log(requestData.data);
	$.ajax({
		url:requestData.url,
		type:'GET',
		dataType:requestData.dataType,
		data:requestData.data,
		sucess:function(data){
			console.log('It worked!' );
			console.log(data.source);
			//cacheData(data);
		},
		error:function(data){
			console.log('An Error occured!!');
			console.log(data);
		},
		beforeSend:function(xhr){
			console.log('trying to set request header');
			xhr.setRequestHeader("X-Mashape-Authorization", "LRvm3vxiEQmshkEwtQG4T9bvtltop1lz3VZjsnPNh1NDFpFH1K");
			console.log('set the header');
		}
	}).done(function (data) {
	console.log('AJAX Call is done!');
	console.log(data);
    console.log(data[0].name);
    console.log(data[0].id);
    console.log(data[0].summary);
});

}



// function cacheData(result){
// 	console.log('cacheData function called');
// 	$.each(result.results, function(index,value){
// 		var name = value.name;
// 		console.log('name is ' +name); 
// 		var deck =  value.deck;
// 		console.log('deck is ' + deck); 
// 		var image =  value.image.medium_url;
// 		console.log('image url '  + image);
// 		var platforms = value.platforms;
// 		//There COULD BE MULTIPLE FOR ONE GAME
// 		var allPlatforms="" ;
// 		$.each(platforms, function(index,value){
// 			console.log("Name of platform/s is " + value.name);
// 			allPlatforms += value.name + ", ";
// 		});
// 		console.log("Name of platform/s is " + allPlatforms);
// 		var originalRelease = value.original_release_date;
// 		console.log('Original release date is ' + originalRelease);
// 		mainGamesPullOffset++;
// 		//Put the data in a gameEntry Object.
// 		//Date includes time, which is not needed for mySQL, trim it.
// 		var newDate = originalRelease.substring(0, 10);
// 		//SQL needs to had apstromphes double escaped, so that could possibly
// 		//be in the  name or deck.
// 		//WHAT IF it has more than one apostrophe...
		

// 			for(var i=0;i<name.length;i++){
// 				if(name[i]==='\''){
// 					name = insertAt(name, i , '\'');
// 					console.log('Found apostrophe at index ' + i );
// 					i++;
// 				}
// 			}
// 			console.log('New name is ' + name);

// 			for(var i=0;i<deck.length;i++){
// 				if(deck[i]==='\''){
// 					console.log('Found apostrophe at index DECK' + i );
// 					deck  = insertAt(deck, i , '\'');
// 					i++;
// 				}
// 			}
		
// 		console.log('New deck is '  + deck); 
// 		var gameEntry = {
// 			name:name,
// 			deck: deck,
// 			image:image,
// 			platform:allPlatforms,	
// 			originalRelease:newDate
// 		};
// 		allGamesEntry.push(gameEntry);
// 		console.log(gameEntry);
// 	});