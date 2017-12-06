// this is an app which will send a request to the GIPHY API based on which button the user pressed to return an assortment of GIFs to to the display for the user to enjoy looking at, and which can be held still or paused by clicking
var theVars = {
    query: "",
    limit: 5,
    rating: "G",
    random: true,
};
var querySearchURL = function(query, limit, rating) {
    return `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=CukVvGuLlYmHG7AfCRA2mnKRIiGe1XoN&limit=${limit.toString()}&rating=${rating}`;
} 
var queryRandomURL = function(query, rating) {
    return `http://api.giphy.com/v1/gifs/random?q=${query}&api_key=CukVvGuLlYmHG7AfCRA2mnKRIiGe1XoN&rating=${rating}`;
} 
var displaySomeBeauty = function (object) {
    if (theVars.random) {
        var gif = object;
    }
}
var makeApiRequest = function() {
    if (theVars.random) {
        var queryURL = queryRandomURL(theVars.query, theVars.rating);
        for (var i = 0; i < theVars.limit; i++) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                console.log(response);
                //displaySomeBeauty(response);
            });
        }
    } else { 
        var queryURL = querySearchURL(theVars.query, theVars.limit, theVars.rating);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
        });
    }
};
var theClicks = function() {
    $(document).on("click", ".btn", function() {
        theVars.query = $(this).attr("data-reaction");
        makeApiRequest();
    });
};

theClicks();