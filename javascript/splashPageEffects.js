//Effect to make random game images float across the splash page.
var array; 

 $(document).ready(function(){
 	 generateImages();
 }); 





function moveImages(){

}


function generateImages(){

	var imageArray ;
	var request =  $.ajax({
 		url: 'http://localhost/gameApp/php/queryForImages.php',
   	    type: "post",
   	    //data needed?
		 });
   	request.done(function (response, textStatus, jqXHR){
   	    // Log a message to the console
   	    console.log("Hooray, it worked!");
   	    console.log(response);
   	});

   	request.success(function(response){
   		console.log("POST call for splash screen successful");
   		 var data = jQuery.parseJSON(response);
   		 console.log(data);
   		 //GOT IT
   		 console.log("Returned data!!!");
   		 appendImages(data);
   		

   	});
    	request.fail(function (jqXHR, textStatus, errorThrown){
    	    // Log the error to the console
    	    console.error(
    	        "The following error occurred: "+
    	        (textStatus, errorThrown));
   	    });
   
}


function appendImages(links){
//Add 10 images to each row.
	var counter = 0 ;
	var imageTableNum = "1";
	$.each(links, function(index,value){
		//console.log(value);
		//$('#photos').append('<img src="http://www.lorempixel.com/'+width+'/'+height+'/cats" alt="pretty kitty">');

		console.log('In the each function');
		var img = $('<img src=' + value+'></img>');
		img.addClass('game_image');
		//img.append("<img id='theImg' src="+value+ " />");
		console.log(img);
		$(".first_page .image_table").append(img);
	});	
}