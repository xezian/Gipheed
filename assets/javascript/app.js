// this is an app which will send a request to the GIPHY API based on which button the user pressed to return an assortment of GIFs to to the display for the user to enjoy looking at, and which can be held still or paused by clicking
var gipheed = {
    theVars = {
        queryURL: "http://api.giphy.com/v1/gifs/search?q=" + gipheed.theVars.query + "&api_key=CukVvGuLlYmHG7AfCRA2mnKRIiGe1XoN&limit=" + gipheed.theVars.limit.toString() + "&rating=" + gipheed.theVars.rating,
        query: "",
        limit: 5,
        rating: "",
        ratingArray: ["Y","G","PG","PG-13", "R"],

    },
    theFuncs = {
        makeApiRequest = function() {
            // make a request of the api. this function will be called when a button gets clicked on
        },
        theClicks = function() {
            // on click event listeners
        },
    },
}