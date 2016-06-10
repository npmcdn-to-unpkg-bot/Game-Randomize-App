//A simple jquery function to keep track of the states of the buttons.
//The way jquery makes the array is that is starts from top 
//to bottom ranking the elements based on their position in the
//html. So in a 3x3 button grid.
// 1 2 3
// 4 5 6
// 7 8 9

//Active class means clicked

//NEEDS .on();


 $(function generateButtons(){
			$(".gen_button_platform").click(function(){
				//Create new buttons in the platform section
				//Right now it generates one button, but realistical
				//it should do maybe 6 at a time.
			var plaformButtonList = $('.button_column.platform ul');
			var  button = $("<button> </button>");
			button.addClass('game_button');
			button.attr('id','fourth' );
			button.text('fourth');

			console.log('created button with  class ' + button.attr('class'));
			plaformButtonList.append(button);
			});
		});

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


//TIME TO PULL THE DATA FROM THE APIS!
//1. GIANT BOMB
//First search for all games on the Nintedo Wii.
//f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0 API KEY

//http://www.giantbomb.com/api/search?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=json&query=""/platforms=""
//http://www.giantbomb.com/api/platforms/?api_key=f04a7c4e6c0dc84173ec15ce40ca61d964d4b5b0&format=json]&field_list=name
//Above is a sample query returning just the names of all the plaforms, NOW LETS MAKE SOME BUTTONS






 // $(function changeButtonState(){
	// 		$(".game_button").on("click", function(){
	// 			console.log( $(this).text());
	// 			if( $(this).hasClass('active') ){
	// 				console.log('removed active class');
	// 				$(this).removeClass("active");
	// 			}else{
	// 				console.log('added active class ')
	// 				$(this).addClass('active')
	// 			}
	// 		});
	// 	});







