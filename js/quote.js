$(document).ready(function(){

    populateJokePage();

});

function homeRedirect(){
    var url = window.location.toString();
    window.location = url.replace('pages/quote.html', 'index.html');
}

function populateJokePage() {

    // Load order data from local storage
    jokeCategory = localStorage.getItem("Category");
    joke = localStorage.getItem("Joke");

    // Populate fields with data
    console.log(jokeCategory)
    $("#categoryTxt").text(jokeCategory);
    $("#jokeTxt").text(joke);
}