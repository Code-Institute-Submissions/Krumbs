const baseURL = "https://www.themealdb.com/api/json/v1/1/random.php";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + type + "/");
    xhr.send();
}

function writeToDocument(type) {
    
    getData(type, function(data) {
        //div with id=data printing this//
        document.getElementById("data").innerHTML = data.meals["0"].strMeal;
    });
}

// meals[""0""].strMeal; //
//property path for the random meal title but cant get working//