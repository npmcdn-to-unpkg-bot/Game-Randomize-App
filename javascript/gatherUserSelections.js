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


$(document).on('click' , '.run_button' , function(){
		console.log('Executing random search'); 
		gatherButtonValues(); 
		//roatateWheel();
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
function roatateWheel(currentDeg)
{	
	var carousel = $("#carousel");
	console.log(carousel);
	//var currentDeg = 0;
	//currentDeg+=40;
	carousel.css({
   		"-webkit-transform": "rotateY("+currentDeg+"deg)",
   		"-moz-transform": "rotateY("+currentDeg+"deg)",
   		"-o-transform": "rotateY("+currentDeg+"deg)",
   		"transform": "rotateY("+currentDeg+"deg)"
  	});
}

	// while(counter<25){
	// 	$arrayPanels =  $("#carousel figure ").each(function(index) {
	// 		console.log($(this));
	// 		rotateValue+=40;
	// 		$(this).css("-webkit-transform", "rotateY("+ rotateValue + " deg) " + "translateZ(687px)");
	// 	});
	// 	counter++;
	// 	console.log("counter: " + counter);
	// }






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
    	    request.success(function (response){
	    	  console.log("PRINTING THE RESPONSE IN THE SCUESS FUNCTION!!");
	    	  //Right now it is print the whole echoed data, not just for the final array.
	    	   var formatedResponse = $.parseJSON(response);
	    	  console.log(formatedResponse);
	    	  	//Append it to the screen.
	    	  		//Create divs.
	    	  		var div1 = $('<div></div>');
	    	  		div1.addClass('game_title');

	    	  		var div2 = $('<div></div>');
	    	  		div1.addClass('game_sum');

	    	  		var div3 = $('<div></div>');
	    	  		div1.addClass('game_genre');

	    	  		var div4 = $('<div></div>');
	    	  		div1.addClass('game_release');

	    	  		var div5 = $('<div></div>');
	    	  		div1.addClass('game_rating');

	    	  		var div6 = $('<div></div>');
	    	  		div1.addClass('game_time');

	    	  		



	    	  		$('.game_img').css({
	    	  			'content':'url('+formatedResponse.cover+')'
	    	  		});
	    	  		console.log($('#main game_title'));
	    	  		div1.append(formatedResponse.name);
	    	  		div2.append( "Summary: "+formatedResponse.summary);
	    	  		var genreString="Genres: ";
	    	  		for(var i = 0;i<formatedResponse.genres.length;i++){
	    	  			genreString+= formatedResponse.genres[i]+"";
	    	  		}
	    	  		var releaseString="Release Info: ";
	    	  		for(var i = 0;i<formatedResponse.release_info.length;i++){
	    	  			releaseString+= formatedResponse.release_info[i]+"";
	    	  		}


	    	  		div3.append(genreString);
	    	  		div4.append(releaseString);
	    	  		div5.append("Rating: " +formatedResponse.rating);
	    	  		div6.append("Time to beat: " + formatedResponse.time_to_beat);

	    	  		$('.game_title').append(div1);	
	    	  		//$('.game_info').append(div1);
	    	  		$('.game_info').append(div2);
					$('.game_info').append(div3);
					$('.game_info').append(div4);
					$('.game_info').append(div5);
					$('.game_info').append(div6);



	  //   	  		<div class="game_info">
			// <div class="game_img">IMG  HERE</div>
			// 		<div class="game_sum">Summary here</div>
			// 		<div class="game_genre">Genres here</div>
			// 		<div class="game_release"> Release info here</div>
			// 		<div class="game_rating">Rating here</div>
			// 		<div class="game_time">Time to beat here</div>


    	    });
	    	
    	    
}