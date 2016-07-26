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


$(document).on('click' , '.execute_button' , function(){
		console.log('Executing random search'); 
		//Also start the spinner
		gatherButtonValues(); 
		//roatateWheel();
});

/*
Function to roatate the wheel as long as the the function to get the random game is still there
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
	    	 // var formatedResponse = $.parseJSON(response);
	    	 // console.log(formatedResponse);
    	    });
	    	
    	    
}