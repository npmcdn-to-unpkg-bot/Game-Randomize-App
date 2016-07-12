//Functions to pull data from the IGDB API, its different from the Giant bomb api so there will have
//to be a lot of formating the data.
/*
Data is nicely formatted?

*/
//Constants for the platform, taken from local storage. 
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
	





//Limit is 50 at at time, for now test 1 
//Need to keep track  of the offset number
var offSetNumber= 0;


var requestData = {
	url:'https://igdbcom-internet-game-database-v1.p.mashape.com/games/?',	
    type: "GET",
    dataType:'json',
    data:{
    fields:'name,id,cover,summary,platforms,genres,release_dates,time_to_beat,rating,genres,aggregated_rating',
    limit:10,
    order:'created_at:asc'
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
	// console.log(data);
 //    for(var i=0;i<data.length;i++){
 //    	console.log(data[i].name);
 //    }
    cacheData(data);
  });
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
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year ;
  return time;
}

//Seconds on game, review implementation
function timeConverter(UNIX_timestamp){
UNIX_timestamp = Number(UNIX_timestamp);
var h = Math.floor(UNIX_timestamp / 3600);
var m = Math.floor(UNIX_timestamp % 3600 / 60);
var s = Math.floor(UNIX_timestamp % 3600 % 60);
return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 

}






//name,id,cover,summary,platforms,genres,release_dates,time_to_beat,rating
function cacheData(result){
	console.log('cacheData function called');
	$.each(result, function(index,value){
		var name = value.name;
		console.log('name is ' +name); 
		var id = value.id;
		console.log('id is ' +id);
		var summary =  value.summary;
		console.log('summary is ' + summary); 
		var imageId =  value.cover.cloudinary_id;
		var imageUrl = 'https://res.cloudinary.com/igdb/image/upload/t_cover_big/'+ imageId+'.jpg';
		console.log('image url is '  + imageUrl);
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
			console.log('New Summary is '  + summary); 
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
		var rating  = value.rating;
		console.log("rating is " + rating);
		//Can be an array you know
		i
			var genres =[];
			for(var i = 0;i<value.genres.length;i++){
				 var id = value.genres[i];
				 genres.push(igbdGenreCodes[id]);
				console.log('Genre is at index '  + i + ' is ' +  genres[i]);
			}
		var gameEntry = {
			//name,id,cover,summary,platforms,genres,release_dates,time_to_beat,rating
			name:name,
			id:id,
			genre:genres,
			cover:imageUrl,
			summary:summary,
			platform:allPlatformsNames,
			releaseDate: allReleaseDates,
			howLong:timeToBeat,
			rating:rating
		};
		allGamesEntry.push(gameEntry);
		console.log(gameEntry);
	});
}


