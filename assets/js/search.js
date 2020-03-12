const baseURL = "https://www.themealdb.com/api/json/v1/1/random.php";

function getData(type, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };

    xhr.open("GET", baseURL + type + "/");
    xhr.send();
}

function writeToDocument(type) {

    getData(type, function (data) {
        //div with id=data printing this//
        document.getElementById("recipe-title").innerHTML = data.meals["0"].strMeal;
        //food category breakfast lunch diner desert etc
        document.getElementById("recipe-category").innerHTML = data.meals["0"].strCategory;
        //link needs converted to image
        document.getElementById("recipe-image").innerHTML = data.meals["0"].strMealThumb;
        //need list of ingredients an measures

        // description
        document.getElementById("recipe-instruction").innerHTML = data.meals["0"].strInstructions;        
        //youtube clip needs embeeded
        document.getElementById("recipe-vid").innerHTML = data.meals["0"].strYoutube;
    });
}