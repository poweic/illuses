$(function() {
	resizeStage();
	window.onkeydown = keyDownHandler;
});

function keyDownHandler(event) {
	console.log(event.which);
	switch(event.which) {
		case 38: 	// ¡ô
			break;
		case 40: 	// ¡õ
			break;
			
		case 37:	// ¡ö
			prev();
			break;
		case 39: 	// ¡÷ 
			next();
			break;
		default:
			break;
	}
};

var current = 1;

function next() {
	$("#slide" + current).removeClass("present");
	current = (current + 1) % 3;
	$("#slide" + current).addClass("present");
}

function prev() {
	$("#slide" + current).removeClass("present");
	current = (current + 2) % 3;
	$("#slide" + current).addClass("present");
}

function resizeStage() {
	$(".stage").css("width", window.innerWidth).css("height", window.innerHeight);
}

$(window).resize(function(){
	resizeStage();
});