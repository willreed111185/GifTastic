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
	console.log("searchTerm: ",KeyWord);
	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="+KeyWord+"&limit=10";
	$.ajax({
	    url: queryURL,
	    method: "GET"
	})
	.done(function(response) {
		console.log(response);
		$("#imageBox").empty();
		for(var i=0; i<response.data.length;i++){
			var searchStill = response.data[i].images.fixed_height_still.url;
			var searchAnimated = response.data[i].images.fixed_height.url;
			var searchID = response.data[i].id;
			console.log("Image: ",searchStill);
			var searchRating = response.data[i].rating;
			console.log("Rating: ",searchRating);
	      	var gifImage = $("<img>");
	      	gifImage.attr("id", searchID);
	      	gifImage.attr("src", searchStill);
	        gifImage.attr("alt", "image missing__");
    	    gifImage.attr("data-still", searchStill);
	       	gifImage.attr("data-animate", searchAnimated);
	       	gifImage.attr("data-state", "still");
	       	gifImage.addClass("imgBtn");
	        console.log("gifImage ",gifImage);
	        $("#imageBox").append(gifImage);
       }
	})

}

function animateGif(id){
	var currentState = $("#"+id).attr("data-state");
	console.log("currentState ",currentState);
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

renderGifBtns();

}
