//Methods to buttons the user pressed and check that information against the information in the database (separate php function)

//Platform
var selectedPlats = [] ;
//Genre
var selectedGenres = []; 
//Score
var selectedScores = [];
//time
var selectedTimes = [];
//Date
var selectedYears= [];


function clearData(){
 selectedPlats = [] ;
 selectedGenres = []; 
 selectedScores = [];
 selectedTimes = [];
 selectedYears= [];
}

function gatherButtonValues (){
	//Clear the array.
	clearData();
	console.log('in here!!!');
	var platformButtons =$(".button_column.platform button");
	var genreButtons  =$(".button_column.genre button");
	var scoreButtons= $(".button_column.score button");
	var timeButtons= $(".button_column.time button");
	var yearButtons = $(".button_column.date button");
	$.each(platformButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			//console.log("id: "+ tempId);
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				console.log( ' currentButton is not hidden and active '  + tempJQ.attr('id'));
				selectedPlats.push(tempId);
			}
				//console.log(selectedPlats);
	});
	$.each(genreButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				console.log( ' currentButton is not hidden and active '  + tempJQ.attr('id'));
				selectedGenres.push(tempId);
			}
				//console.log(selectedGenres);
	});
	$.each(scoreButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				console.log( ' currentButton is not hidden and active'  + tempJQ.attr('id'));
				selectedScores.push(tempId);
			}
			//	console.log(selectedScores);

	});
	$.each(timeButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				console.log( 'currentButton is not hidden and active '  + tempJQ.attr('id'));
				selectedTimes.push(tempId);
			}
		//	console.log(selectedTimes);
	});
	$.each(yearButtons,function(index,value){
			var tempJQ = $(value);
			var tempId = tempJQ.attr('id');
			if(!(tempJQ.is(':hidden')) &&  tempJQ.hasClass('active') ){
				console.log( 'currentButton is not hidden and active'  + tempJQ.attr('id'));
				selectedYears.push(tempId);
			}
			//console.log(selectedYears);
	});

	//Put the them in an object to send as data through the post
	data = {
		platformArray:selectedPlats , 
		genreArray:selectedGenres ,
		scoreArray:selectedScores,
		timeArray:selectedTimes,
		yearArray:selectedYears
	}

	console.log(data);
	sendSelectedData(data);
}


/*
One Ajax Call to pull all possible games and cache them in the browser using Javascript
*/
		var value=0;
//Something wrong with this shit

$(document).on('click' , '.run_button' , function(){
		console.log('Executing random search'); 
		//gatherButtonValues();
		var counter = 0 ; 
		while(counter<800){
			if(counter%2){
			value+=0.4;
		}else{
			value-=0.4;
		}
			roatateWheel(value);
			counter++
			console.log("Counter is " + counter +" and value is  " + value)
		}
		resetWheelValues();
});

/*
Function to roatate the wheel as long as the there function to get the random game is still there
*/
//setTimeout(myFunction, 3000)
 $(document).ready(function(){
//  	var currentDeg = 0;
//  for(var i =0 ; i<400; i++){
//  	$.when(
//  		roatateWheel(currentDeg),
//  		currentDeg++,
//  		console.log("when PART")
//  		).then(function(){
//  			console.log("then PART"),
//  			roatateWheel(currentDeg),
//  			currentDeg++
//  	});
// }
 }); 


//Moves 40 degrees at a time.
function roatateWheel(currentDeg){	
	 var carousel = $("#carousel");
	// console.log(carousel);
	 carousel.css({
    		"-webkit-transform": "rotateY("+currentDeg+"deg)",
    		"-moz-transform": "rotateY("+currentDeg+"deg)",
    		"-o-transform": "rotateY("+currentDeg+"deg)",
    		"transform": "rotateY("+currentDeg+"deg)"
   	}); 	
}



$(document).ready(function(){
    $(window).resize(function(){
       console.log("WINDOW RESIZED");
       recalcuateWheelZ();
    });
});


function recalcuateWheelZ(){
		 var carousel = $("#carousel");
		 var containerWidth  =$("container").css('width');
		 console.log("WIDTH---> " +containerWidth);
		 var zVal  = (containerWidth/2)/(Math.tan(20));
		  carousel.css({
    		"-webkit-transform": "translateZ("+currentDeg+"px)",
    		"-moz-transform": "translateZ("+currentDeg+"px)",
    		"-o-transform": "translateZ("+currentDeg+"px)",
    		"transform": "translateZ("+currentDeg+"px)"
   	}); 	
}






function sendSelectedData(data){
	var request =  $.ajax({
 			url: 'http://localhost/gameApp/php/queryDatabase.php',
    	    type: "post",
    	    data
			 });
    	request.done(function (response, textStatus, jqXHR){
    	    //console.log("Hooray, it worked!");
    	    console.log(response);
    	    //Get the selected games information 
    	});
	    	request.fail(function (jqXHR, textStatus, errorThrown){
	    	    
	    	    console.error(
	    	        "The following error occurred: "+
	    	        (textStatus, errorThrown));
    	    });
    	//     request.success(function (response){
	    // 	  console.log("PRINTING THE RESPONSE IN THE SCUESS FUNCTION!!");
	    // 	  //Right now it is print the whole echoed data, not just for the final array.
	    // 	   var formatedResponse = $.parseJSON(response);
	    // 	  console.log(formatedResponse);
	    // 	  	//Append it to the screen.
	    // 	  		//Create divs.
	    // 	  		//Clear the divs
	    // 	  		$(".game_info").empty();


	    // 	  		var div_title = $('<div></div>');
	    // 	  		div_title.addClass('game_title');

	    // 	  		var div_sum = $('<div></div>');
	    // 	  		div_sum.addClass('game_sum');

	    // 	  		var div_genre = $('<div></div>');
	    // 	  		div_genre.addClass('game_genre');

	    // 	  		var div_platform = $('<div></div>');
	    // 	  		div_platform.addClass('game_platform');

	    // 	  		var div_year = $('<div></div>');
	    // 	  	    div_year.addClass('game_year');

	    // 	  		var div_rating = $('<div></div>');
	    // 	  		div_rating.addClass('game_rating');

	    // 	  		var div_time = $('<div></div>');
	    // 	  		div_time.addClass('game_time');


	    // 	  		var escapedCover = formatedResponse.cover;
	    // 	  		var regularUrl = escapedCover.replace('\/','/');
	    // 	  		//var realUrl = regularUrl.slice(0, (regularUrl.length)-1)
	    // 	  		console.log("REG URL " + regularUrl);
	    // 	  		var div_img = $('<img src='+regularUrl+" />");

	    // 	  		// $('.game_img').css({
	    // 	  		// 	'content':'url('+formatedResponse.cover+')'
	    // 	  		// });
	    // 	  		console.log($('.game_img'));
	    // 	  		console.log($('#main game_title'));
	    // 	  		div_title.append(formatedResponse.name);
	    // 	  		div_sum.append( "Summary: "+formatedResponse.summary);
	    // 	  		var genreString="Genres: ";
	    // 	  		if(formatedResponse.genres!=undefined){
	    // 	  			for(var i = 0;i<formatedResponse.genres.length;i++){
	    // 	  				if(i==formatedResponse.genres.length){
	    // 	  					genreString+= formatedResponse.genres[i];

	    // 	  				}else{
	    // 	  					genreString+= formatedResponse.genres[i]+" , ";
	    // 	  			    }
	    // 	  			}
	    // 	  	    }
	    // 	  		var platformString="Platforms: ";
	    // 	  		if(formatedResponse.platforms!=undefined){
	    // 	  			for(var i = 0;i<formatedResponse.platforms.length;i++){
	    // 	  				if(i==formatedResponse.platforms.length){
	    // 	  				platformString+= formatedResponse.platforms[i];
	    // 	  				}else{
	    // 	  				platformString+= formatedResponse.platforms[i]+" , ";
	    // 	  				}
	    // 	  			}
	    // 	    	}
	    // 	    	var timeString="";
	    // 	  		if(formatedResponse.time_to_beat!=undefined){
	    // 	  			for(var i = 0;i<formatedResponse.time_to_beat.length;i++){
	    // 	  				switch(i){
	    // 	  					case 1:
	    // 	  						 timeString+=" Main Story: "+formatedResponse.time_to_beat[i];
	    // 	  					break;
	    // 	  					case 2:
	    // 	  						 timeString+=" Main Story+ Extras: "+formatedResponse.time_to_beat[i];
	    // 	  					break;
	    // 	  					case 3:
	    // 	  						 timeString+=" Completionist: "+formatedResponse.time_to_beat[i];
	    // 	  					break;
	    // 	  					case 4:
	    // 	  						 timeString+=" Combined Time: "+formatedResponse.time_to_beat[i];
	    // 	  					break;
	    // 	  				}
	    // 	  			}
	    // 	    	}



	    // 	  		div_sum.append(genreString);
	    // 	  		div_platform.append(platformString);
	    // 	  		div_year.append(formatedResponse.releaseDate);
	    // 	  		div_rating.append("Rating: " +formatedResponse.rating);
	    // 	  		div_time.append(timeString);
	    // 	  		$('.game_info').append(div_title);	
	    // 	  		$('.game_info').append(div_img);
	    // 	  		$('.game_info').append(div_sum);
					// $('.game_info').append(div_genre);
					// $('.game_info').append(div_year);
					// $('.game_info').append(div_time);
					// $('.game_info').append(div_platform);
					// $('.game_info').append(div_rating);


    	//     });
	    	    	    
}