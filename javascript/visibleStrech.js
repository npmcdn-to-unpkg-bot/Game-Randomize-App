//Creating the js needed to transform the width 
//of the text divs when the element is in the
//users viewport. Might look spiffy!


// else if(el.visible(true) && el.hasClass('right_slide')){
// 			el.addClass('strech_in_right');
// 			console.log('reached middle of right slide');
// 			console.log(el.visible());
// 		}



var win = $(window);
var allStrechBoxes = $('.reveal_box');


// allStrechBoxes.each(function(index, el) {
// 	var el = $(el);
// 	if(el.visible(true)){
// 		el.addClass('already_visible');

// 	}
// });

win.scroll(function(event) {
	allStrechBoxes.each(function(index, el) {
		var el = $(el);
		if(el.visible(true) && el.hasClass('left_slide') ){
			el.addClass('strech_in_left');
			console.log('reached middle of strech in');
			console.log(el.visible());
		}
	});
});