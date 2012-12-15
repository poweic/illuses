function keyDownHandler(event) {	
	if(isFocusOnSlides())
		return;
	
	$("#slide" + current).removeClass("present");
	
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
	
	$("#slide" + current).addClass("present");
	
		
};

function isFocusOnSlides() {
	var aNode = window.getSelection().anchorNode;
	return aNode != null && aNode.parentNode.getAttribute("class") != "stage-padding";
}
var current = 0;

function next() {
	current = (current + 1) % 3;
}

function prev() {

	current = (current + 2) % 3;
}

function resizeStage() {
	$(".stage").css("width", window.innerWidth).css("height", window.innerHeight);
}

$(window).resize(function(){
	resizeStage();
});

$(function() {
	resizeStage();
	window.onkeydown = keyDownHandler;
	initFs();
});

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

const fileName = 'log.txt';
const REQUESTING_QUOTA = 1024*1024;
var fs = null;
window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

function initFs() {
	
	window.webkitStorageInfo.requestQuota(
		PERSISTENT,
		REQUESTING_QUOTA,
		function(grantedBytes) {
			window.requestFileSystem(
				PERSISTENT,
				grantedBytes,
				function(fileSystem) {
					fs = fileSystem;
					load();
				},
				errorHandler);
		},
		function(e) {
			console.log('Error', e);
		});
}

function save() {
  fs.root.getFile(fileName, {create: true}, function(fileEntry) {
  
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };
	  
	  var dataToBeWrite = $("#stage").html();
	  console.log("dataToBeWrite = " + dataToBeWrite);
      var blob = new Blob([dataToBeWrite], {type: 'text/plain'});
      fileWriter.write(blob);
    }, errorHandler);
	
  }, errorHandler);
};

function load() {
	fs.root.getFile(fileName, {}, function(fileEntry) {

    // Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
		var reader = new FileReader();

		reader.onloadend = function(e) {
			console.log("this.result = " + this.result);
			$("#stage").append(this.result);
			$(".slide").removeClass("present");
			$("#slide0").addClass("present");
		};

       reader.readAsText(file);
    }, errorHandler);

  }, errorHandler);
};

function remove() {
	fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

		fileEntry.remove(function() {
		  console.log('File removed.');
		}, errorHandler);

	}, errorHandler);
}