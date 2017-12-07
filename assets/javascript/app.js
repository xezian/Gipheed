// this is an app which will send a request to the GIPHY API based on which button the user pressed to return an assortment of GIFs to to the display for the user to enjoy looking at, and which can be held still or paused by clicking
var theVars = {
    query: "",
    giphURL: "",
    stillURL: "",
    colorChoices: ["pink", "orange", "green", "yellow", "red", "white", "blue", "turquise", "black"],
    leftIsOpen: false,
    rightIsOpen: false,
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
// select a random bootstrap color
// TODO change to random css colors
var randoColor = function() {
    return theVars.colorChoices[Math.floor(Math.random() * theVars.colorChoices.length)];
};
var randoExistingButtons = function () {
    $(".btnz").addClass(randoColor);
};
// returns query url when performing normal search
var querySearchURL = function(query, limit, rating) {
    return `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=CukVvGuLlYmHG7AfCRA2mnKRIiGe1XoN&limit=${limit}&rating=${rating}`;
};
// returns query url when performing random search
var queryRandomURL = function(query, rating) {
    return `http://api.giphy.com/v1/gifs/random?api_key=CukVvGuLlYmHG7AfCRA2mnKRIiGe1XoN&tag=${query}&rating=${rating}`;
};
// gives the gif to an html element and sticks it to the page
var displaySomeBeauty = function () {    
    var somethingToSee = $("<img/>");
    somethingToSee
        .attr("class", "gipher")
        .attr("src", stillURL)
        .attr("data-still", stillURL)
        .attr("data-giph", giphURL)
        .appendTo("#giph-area");
};
var makeApiRequest = function() {
    // if random is selected
    if (theVars.random()) {
        var queryURL = queryRandomURL(theVars.query, theVars.rating());
        console.log(queryURL);
        // we must make an api call per number set as limit because random only returns one gif at a time
        for (var i = 0; i < parseInt(theVars.limit()); i++) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                console.log(response);
                giphURL = response.data.fixed_height_downsampled_url;
                stillURL = response.data.fixed_height_small_still_url;
                displaySomeBeauty();
            });
        }
    } else {
        // here only one api call is needed for a regular search 
        var queryURL = querySearchURL(theVars.query, theVars.limit(), theVars.rating());
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            // now we go through the array inside the response object which should be the length limit was set to
            for (var i = 0; i < response.data.length; i++) {
                giphURL = response.data[i].images.fixed_height.url;
                stillURL = response.data[i].images.fixed_height_small_still.url;
                displaySomeBeauty();
            }
        });
    }
};
var makeNewButton = function () {
    var newButton = $("<button>");
    var inputField = $("#what-button").val().trim();
    // this clears the form when a new button is submitted
    $("#submitButtonForm").find("input:text").val("");
    if (inputField === "") {
        return
    } else {
        newButton
            .attr("class", `btnz btn ${randoColor()}`)
            .attr("id", inputField)
            .attr("data-reaction", inputField.replace(/\s/g,'+'))
            .text(inputField)
            .appendTo($("#button-party"));
    }
};
// function to spin the font awesome symbol 
var faSpin = function (icon) {
    icon
        .removeClass("fa")
        .addClass("fas")
        .addClass("fa-spin");
    setTimeout(function(){
        icon
            .removeClass("fa")
            .removeClass("fa-spin")
            .addClass("fas");
    }, 2000);
}
var faSpinReverse = function(icon) {
    icon
        .removeClass("fa")
        .addClass("fas")
        .addClass("fa-spin-reverse");
    setTimeout(function(){
        icon
            .removeClass("fa")
            .removeClass("fa-spin-reverse")
            .addClass("fas");
    }, 2000);
}
// sweet little function here to handle on click stuff
var theClicks = function() {
    $(document).on("click", ".btnz", function() {
        theVars.query = $(this).attr("data-reaction");
        $("#giph-area").empty();
        makeApiRequest();
    });
    // not a click technically but here's a keyup listener for the enter key
    $("#what-button").keypress(function(e) {
        if (e.which == 13)  {
            makeNewButton();
        }
    });
    $(document).on("click", "#new-button", function() {
        makeNewButton();
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
    $(document).on("click", "#fa-edit", function() {
        if (theVars.leftIsOpen) {
            faSpinReverse($(this));
            theVars.leftIsOpen = false;
        } 
        else {
            faSpin($(this));
            theVars.leftIsOpen = true;
        }
    });
    $(document).on("click", "#fa-add", function() {
        if (theVars.rightIsOpen) {
            faSpin($(this));
            theVars.rightIsOpen = false;
        } 
        else {
            faSpinReverse($(this));
            theVars.rightIsOpen = true;
        }
    });
};
// let's call that inside the document ready state
$(document).ready(function () {
    theClicks();
    randoExistingButtons();
});