window.onload = function() {
var gifArray = ["jello", "trip", "puppy", "fire", "twerk"];


function renderGifBtns(){
	$("#buttonBox").empty()
	for(var i=0; i<gifArray.length; i++){
		var newGifBtn = $("<button>");
		$(newGifBtn).attr("id", gifArray[i]).addClass("gifButton btn btn-primary btn-lg").html(gifArray[i]);
		$("#buttonBox").append(newGifBtn)
	}
}

function renderGifs(KeyWord){
	var queryURL = "//api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+KeyWord+"&limit=10";//added https to resove deployment issue
	$.ajax({
	    url: queryURL,
	    method: "GET"
	})
	.done(function(response) {
		$("#imageBox").empty();
		for(var i=0; i<response.data.length;i++){
	      	var gifImage = $("<img>");
	      	var gifRating = $("<h2>");
	      	gifImage.attr("id", response.data[i].id);
	      	gifImage.attr("src", response.data[i].images.fixed_height_still.url);
	        gifImage.attr("alt", "image missing__");
    	    gifImage.attr("data-still", response.data[i].images.fixed_height_still.url);
	       	gifImage.attr("data-animate", response.data[i].images.fixed_height.url);
	       	gifImage.attr("data-state", "still");
	       	gifImage.addClass("imgBtn");
	        $("#imageBox").append(gifImage);
	        gifRating.html(response.data[i].rating)
	        $("#imageBox").append(gifRating);
       }
	})
}

function searchGIF(newGif){
	gifArray.push(newGif);
	renderGifBtns();
	renderGifs(newGif);
}

function animateGif(id){
	var currentState = $("#"+id).attr("data-state");
	if (currentState === "still") {
	   $("#"+id).attr("src", $("#"+id).attr("data-animate"));
	   $("#"+id).attr("data-state", "animate");
	} else {
	   $("#"+id).attr("src", $("#"+id).attr("data-still"));
	   $("#"+id).attr("data-state", "still");
	}
}

$("#buttonBox").on("click",".gifButton",function(){
	renderGifs(this.id);
})

$("#imageBox").on("click",".imgBtn",function(){
	animateGif(this.id);
})

$("#searchBTN").on("click", function(){
	searchGIF($("#searchInput").val());
})


renderGifBtns();

}
