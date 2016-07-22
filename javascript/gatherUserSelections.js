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

// $(function randomizeButtonClick(){
//  	$(".execute_button").click(function(){
 			
 		
//  	});
//  });

$(document).on('click' , '.execute_button' , function(){
		console.log('Executing random search'); 
		gatherButtonValues(); 
});






function sendSelectedData(data){
	var request =  $.ajax({
 			url: 'http://localhost/gameApp/php/queryDatabase.php',
    	    type: "post",
    	    data
			 });
    	request.done(function (response, textStatus, jqXHR){
    	    console.log("Hooray, it worked!");
    	    console.log(response);
    	});
	    	request.fail(function (jqXHR, textStatus, errorThrown){
	    	    
	    	    console.error(
	    	        "The following error occurred: "+
	    	        (textStatus, errorThrown));
    	    });
}