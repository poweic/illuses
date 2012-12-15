function keyDownHandler(event) {	
	if(isFocusOnSlides())
		return;
	
	$("#slide-" + current).removeClass("present");
	
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
	
	$("#slide-" + current).addClass("present");

};

function isFocusOnSlides() {
	var aNode = window.getSelection().anchorNode;
	return aNode != null && aNode.parentNode.getAttribute("class") != "stage-padding";
}

var current = 0;
var nSlides = 0;

function next() {
	current = (current + 1) % 3;
}

function prev() {
	current = (current + 2) % 3;
}

function resizeStage() {
	$("#back-stage").css("width", window.innerWidth).css("height", window.innerHeight);
}

$(window).resize(function(){
	resizeStage();
});

$(function() {
	resizeStage();
	window.onkeydown = keyDownHandler;
});

var isSaved = true;

/*window.onbeforeunload = function (e) {
	return 'Are you sure?';
};*/

function loadFile(filename) {
	$("#front-stage").empty();
	jQuery.get(filename, { "_": $.now() }, function(data){
		//console.log('File: ' + filename + " loaded completely!");
		
		var dom = $('<div>').html(data);
		var content = $("span#front-stage", dom).html();
		$("#front-stage").append(content);
		
		$(".slide").removeClass("present");
		$("#slide-0").addClass("present");
		
		nSlides = $("span#front-stage > div.slide").length;
		console.log("There're " + nSlides + " slides in total");
		createMiniatureInNavigation();
	});
}

function createMiniatureInNavigation() {
	var miniature = new Array(nSlides);
	for(var i=0; i<nSlides; ++i) {
		var span = sprintf("<span class='mini-slide' id='mini-slide-%d'>%s</span>", i, $("div#slide-" + i).html());
		$("#navigation").append(span);
		$("#mini-slide-" + i).css("left", 10*i + '%');
	}
}

function saveFile() {
	var bb = new BlobBuilder();
	// bb.append("test msg");
	bb.append((new XMLSerializer).serializeToString(document));
	var blob = bb.getBlob("application/xhtml+xml;charset=" + document.characterSet);
	saveAs(blob, "new-slide.xhtml");
	
	var date = new Date();
	console.log(date.getMonth() + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + " Saved");
}