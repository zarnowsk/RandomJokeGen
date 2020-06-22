$(document).ready(function(){

    // Load drop down content
    populateDropdown();

    
    // On form submit
    $("form").submit(function(e){
        e.preventDefault();
        retrieveJokeData();
    });

});

function homeRedirect(){
    var url = window.location.toString();
    window.location = url.replace('pages/quote.html', 'index.html');
}

function populateDropdown() {
      
    let categories = ["Select an option..."];

    try {
        $.ajax({
            url: 'http://api.icndb.com/categories',
            data : { format : 'json'},
            success: function(data) {
                data.value.forEach(category => {
                   categories.push(category);
                });

                categories.forEach((category) => {
                    $('#categories').append($('<option>').val(category).text(category));   
                });
            },
            error: function() {
               window.alert("Error occured while loading API data");
            },
            dataType: 'jsonp',
            type :'GET'
        });

    }
    catch(err) {
        window.alert("Error occured while loading API data");
    }

}

function retrieveJokeData() {

    // Get API url
    let apiUrl = getApiUrl();

    // Make API call
    try {
        $.ajax({
            url: apiUrl,
            data : { format : 'json'},
            success: function(data) {
                console.log('here')
                saveDataToLocalSorage(data.value);
            },
            error: function() {
               window.alert("Error occured while loading API data");
            },
            dataType: 'jsonp',
            type :'GET'
        });

    }
    catch(err) {
        window.alert("Error occured while loading API data");
    }
    
}

function getApiUrl() {

    // Get API url based on drop down box
    let category = $('#categories').val();
    if (category == 'Select an option...') {
        category = '';
    }

    let apiUrl;
    if (category.length == 0) {
        apiUrl = 'http://api.icndb.com/jokes/random';
    } else {
        apiUrl = `http://api.icndb.com/jokes/random?limitTo=[${category}]`;
    }

    return apiUrl;
}

function saveDataToLocalSorage(data) {
    console.log(data);

    // Save form values into local storage
    localStorage.setItem("Id", data.id);
    localStorage.setItem("Joke", data.joke);
    localStorage.setItem("Category", $('#categories').val() == 'Select an option...' ? 'Any' : data.categories[0]);

    location.assign('pages/quote.html');
}
