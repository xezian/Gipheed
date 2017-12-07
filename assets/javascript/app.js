// this is an app which will send a request to the GIPHY API based on which button the user pressed to return an assortment of GIFs to to the display for the user to enjoy looking at, and which can be held still or paused by clicking
var theVars = {
    query: "",
    giphURL: "",
    stillURL: "",
    colorChoices: ["primary", "success", "info", "warning", "danger", "inverse", "faded", "light", "dark"],
    limit: function() {
        return $("#limit-choice").val();
    },
    rating: function() {
        return $("#rating-choice").val();
    },
    random: function () {
        if ($("#random").is(":checked")) {
            return true
        } else {
            return false
        }
    }
};
var randoColor = function() {
    return theVars.colorChoices[Math.floor(Math.random() * theVars.colorChoices.length)];
};
var querySearchURL = function(query, limit, rating) {
    return `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=CukVvGuLlYmHG7AfCRA2mnKRIiGe1XoN&limit=${limit}&rating=${rating}`;
} 
var queryRandomURL = function(query, rating) {
    return `http://api.giphy.com/v1/gifs/random?api_key=CukVvGuLlYmHG7AfCRA2mnKRIiGe1XoN&tag=${query}&rating=${rating}`;
} 
var displaySomeBeauty = function () {    
    var somethingToSee = $("<img/>");
    somethingToSee
        .attr("class", "gipher")
        .attr("src", stillURL)
        .attr("data-still", stillURL)
        .attr("data-giph", giphURL)
        .appendTo("#giph-area");
}
var makeApiRequest = function() {
    if (theVars.random()) {
        var queryURL = queryRandomURL(theVars.query, theVars.rating());
        console.log(queryURL);
        for (var i = 0; i < parseInt(theVars.limit()); i++) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                console.log(response);
                giphURL = response.data.fixed_height_small_url;
                stillURL = response.data.fixed_height_small_still_url;
                displaySomeBeauty();
            });
        }
    } else { 
        var queryURL = querySearchURL(theVars.query, theVars.limit(), theVars.rating());
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                giphURL = response.data[i].images.fixed_height_small.url;
                stillURL = response.data[i].images.fixed_height_small_still.url;
                displaySomeBeauty();
            }
        });
    }
};
var theClicks = function() {
    $(document).on("click", ".btnz", function() {
        theVars.query = $(this).attr("data-reaction");
        $("#giph-area").empty();
        makeApiRequest();
    });
    $(document).on("click", "#new-button", function() {
        var newButton = $("<button>");
        var inputField = $("#what-button").val().trim();
        newButton
            .attr("class", `btnz btn btn-${randoColor()}`)
            .attr("id", inputField)
            .attr("data-reaction", inputField.replace(/\s/g,'+'))
            .text(inputField)
            .appendTo($("#button-party"));
    });
    $(document).on("click", ".gipher", function() {
        var gipher = $(this);
        if (gipher.attr("src") === gipher.attr("data-still")) {
            gipher.attr("src", gipher.attr("data-giph"))
        } else if (gipher.attr("src") === gipher.attr("data-giph")) {
            gipher.attr("src", gipher.attr("data-still"))
        } else {
            console.log("problem!")
        }
    });
};

theClicks();