// this is an app which will send a request to the GIPHY API based on which button the user pressed to return an assortment of GIFs to to the display for the user to enjoy looking at, and which can be held still or paused by clicking
var theVars = {
    query: "initial",
    limit: 5,
    rating: "G",
};
var queryURL = `http://api.giphy.com/v1/gifs/search?q=${theVars.query}&api_key=CukVvGuLlYmHG7AfCRA2mnKRIiGe1XoN&limit=${theVars.limit.toString()}&rating=${theVars.rating}`;
var theFuncs = {
    makeApiRequest: function() {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
        });
    },
    theClicks: function() {
        $(document).on("click", ".btn", function() {
            theVars.query = $(this).attr("data-reaction");
            theFuncs.makeApiRequest();
        });
    },
};
theFuncs.theClicks();