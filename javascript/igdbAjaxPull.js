//Functions to pull data from the IGDB API, its different from the Giant bomb api so there will have
//to be a lot of formating the data.
/*
Data is nicely formatted?
TIME TO


//Whats the problem? 
//Why is the data all mixed up, is 10000 pulls only give ~6800 games, maybe some ajax calls get snuffed, for example if 2 ajax.
//calls end at the same time, then the offset might get incremented by 100 and miss some data.

*/
//Constants for the platform, taken from local storage. 
var igdbOffset = 0;

igdbPlatformCodes = {};
igbdGenreCodes= {};
	for (var i = 0; i < localStorage.length; i++){
		if(localStorage.key(i).includes("plat")){
			var unCodedId = localStorage.key(i);
			var realId = (unCodedId.substr(unCodedId.indexOf(" "), unCodedId.length)).trim();
			 igdbPlatformCodes[realId] =(localStorage.getItem(localStorage.key(i))); 
			 //console.log("Console name is "  +localStorage.getItem(localStorage.key(i)) + " id: " + realId); 
		}else if(localStorage.key(i).includes("genre")){
			var unCodedId = localStorage.key(i);
		  	var realId = (unCodedId.substr(unCodedId.indexOf(" "), unCodedId.length)).trim();
			igbdGenreCodes[realId] =localStorage.getItem(localStorage.key(i)); 
			//console.log("Genre name is "  +localStorage.getItem(localStorage.key(i)) + " id: " + realId );
		}
}

	
//console.log(igdbPlatformCodes);
console.log(igbdGenreCodes);
	





//Limit is 50 at at time, for now test 1 
//Need to keep track  of the offset number
var offSetNumber= 0;





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
	// if(igdbOffset<=20){
	// 	$.when(
	 	    cacheData(data)
	// 	    ).then(function(){
	// 	    	incrementOffset(),
	// 	    	ajaxCall(createRequestData())
	// 	    });
	// }
  });
}

 $(document).ready(function(){
//ajaxCall(createRequestData());
 }); //end of document


function incrementOffset(){
	igdbOffset+=10;
}

function createRequestData(){
var requestData = {
			url:'https://igdbcom-internet-game-database-v1.p.mashape.com/games/?',	
    		type: "GET",
    		dataType:'json',
    		data:{
    		fields:'name,id,cover,summary,platforms,genres,release_dates,time_to_beat,rating,genres,aggregated_rating,url',
    		limit:50,
    		offset:igdbOffset,
    		order:'created_at:asc'
		}
	}
return requestData;
}



//Function to convert unix time to javascript human dates. STACK
/*
Just convert from nanoseconds to miliseconds and use the functions.
*/
function dateConverter(UNIX_timestamp){
  console.log("NANO SECONDS IS " + UNIX_timestamp);
  console.log("Miliseconds is "+  Math.floor(UNIX_timestamp));
  var a = new Date(Math.floor(UNIX_timestamp));
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  console.log('converted year is' + a.getFullYear());
  var month = a.getMonth();
  var date = a.getDate();
  var time = year+ '-'+ date + "-"+ month ;
  return time;
}

//Seconds on game, review implementation
function timeConverter(UNIX_timestamp){
UNIX_timestamp = Number(UNIX_timestamp);
var h = Math.floor(UNIX_timestamp / 3600);
var m = Math.floor(UNIX_timestamp % 3600 / 60);
var s = Math.floor(UNIX_timestamp % 3600 % 60);
var rounded = Math.round(m);
if(rounded >=31){
	//Put another hour
	h++; 
}
//return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
return h;
}






//name,id,cover,summary,platforms,genres,release_dates,time_to_beat,rating
function cacheData(result){
	console.log('cacheData function called');
	$.each(result, function(index,value){
		var name = value.name;
		console.log('name is ' +name); 
		var mainId = value.id;
		console.log('id is ' +mainId);
		var gameUrl  = value.url;
		console.log('url is ' + gameUrl );
		var summary =  value.summary;
		console.log('summary is ' + summary); 
		var imageId;
		if(value.cover!==undefined){
		 imageId =  value.cover.cloudinary_id;
		var imageUrl = 'https://res.cloudinary.com/igdb/image/upload/t_cover_big/'+ imageId+'.jpg';
		console.log('image url is '  + imageUrl);
	}else{
		imageId=null;
	}
		//This is an array
		var releaseDates = value.release_dates;
		allReleaseDates=[];
		allPlatformsNames=[];
		$.each(releaseDates, function(index,value){
			var platKey= value.platform;
			var platName = igdbPlatformCodes[platKey];
			var realDate  =dateConverter(value.date);
			console.log("Name of platform/s is " + platName);
			console.log("Date of release with this platform is " + realDate) ;
			//Put into array
			allReleaseDates.push(realDate);
			allPlatformsNames.push(platName);
		});

		for(var i=0;i<allReleaseDates.length;i++){
			console.log(" Release date is " + allReleaseDates[i] + " on platform:  " + allPlatformsNames[i]);
		}
		//SQL needs to had apstromphes double escaped
			for(var i=0;i<name.length;i++){
				if(name[i]==='\''){
					name = insertAt(name, i , '\'');
					console.log('Found apostrophe at index ' + i );
					i++;
				}
			}

			console.log('New name is ' + name);
			if(summary!==undefined){
				for(var i=0;i<summary.length;i++){
					if(summary[i]==='\''){
						console.log('Found apostrophe at index DECK' + i );
						summary  = insertAt(summary, i , '\'');
						i++;
					}
				}
		}
			//console.log('New Summary is '  + summary); 
			//This is also unix nano seoncds
			// var timeToBeatUnixNormal = ;
			// var timeToBeatUnixHaste = ;
			// var timeToBeatUnixCompletely = ;
		 function timeData(){
			console.log('STARTIN TIME TO BEAT FUNCTION');
				if(value.time_to_beat.normally!==undefined){
				   console.log("Time to beat normally is " + value.time_to_beat.normally );
					var normalTime = timeConverter(value.time_to_beat.normally);
					//console.log("Time to beat normally is " + normalTime );
					return normalTime;
				}else if(value.time_to_beat.hastly!==undefined){
					   console.log("Time to beat hastly is " + value.time_to_beat.hastly );
					var hasteTime = timeConverter(value.time_to_beat.hastly);
					//console.log("Time to beat normally is " + hasteTime );
					return hasteTime;
					}else if(value.time_to_beat.completely!==undefined){
						   console.log("Time to beat completely is " + value.time_to_beat.completely );
						var completeTime = timeConverter(value.time_to_beat.completely);
					//	console.log("Time to beat normally is " + completeTime );
						return completeTime;
				}else{
					return undefined;
				}
		}

		if(value.time_to_beat!==undefined){ 
			var timeToBeat = timeData();
		}else{
			timeToBeat= undefined;	
		}
		var rating;
		if(value.aggregated_rating !== undefined){
			rating = value.aggregated_rating;
		}else if(value.rating){
			rating = value.rating;
		}else{
			rating = undefined;
		}
		console.log("rating is " + rating);
		//Can be an array you know

			var genres =[];
			if(value.genres !== undefined){
		 		for(var i = 0;i<value.genres.length;i++){
					 var id = value.genres[i];
					 genres.push(igbdGenreCodes[id]);
					console.log('Genre is at index '  + i + ' is ' +  genres[i]);
				}
		}else{
			genres = null;
		}
		var gameEntry = {
			name:name,
			id:mainId,
			genre:genres,
			cover:imageUrl,
			summary:summary,
			platform:allPlatformsNames,
			releaseDate: allReleaseDates,
			howLong:timeToBeat,
			rating:rating,
			url:gameUrl
		};

		for(var key in gameEntry) {
    		console.log(key + " is: " + gameEntry[key]);
    		if(gameEntry[key]===undefined){
    			gameEntry[key]=null;
    			console.log(gameEntry[key]);
    		}
		}
		allGamesEntry.push(gameEntry);
		console.log(gameEntry);
		insertGamesintoDataBase(gameEntry);
			//}
	});
}


function insertGamesintoDataBase(data){
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