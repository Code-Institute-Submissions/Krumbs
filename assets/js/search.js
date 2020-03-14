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

        //link needs converted to image instead of showing a website link/ or broken image
        document.getElementById("recipe-image").innerHTML = `<img src=${data.meals["0"].strMealThumb}>`;

        // document.getElementById("recipe-ingred").innerHTML = data.meals["0"].strIngredient1;
        //document.getElementById("recipe-meas").innerHTML = data.meals["0"].strMeasure1; 
        // trying to use a loop to return ingredients and measures

        // from stackoverflow: https://stackoverflow.com/a/58007798 (keep this for your README!)
        document.getElementById("recipe-ingred").innerHTML = ""; // clear the list each time
        let results = Object.keys(data.meals["0"])
            .filter(value => /^strIngredient[1-20]?/i.test(value))
            .map(e => data.meals["0"][e]);
        results.forEach(ingredient => {
            if (ingredient !== "") {
                // console.log(ingredient)
                newLI = document.createElement("li");
                newLI.innerHTML = ingredient;
                recipeUL = document.getElementById("recipe-ingred");
                recipeUL.appendChild(newLI);
            }
        });

        // description of how to carry out the meal
        document.getElementById("recipe-instruction").innerHTML = data.meals["0"].strInstructions;

        //youtube clip embeded
        let watchURL = `${data.meals["0"].strYoutube}`;
        let newURL = watchURL.toString().replace("v=", "");
        //var str = newURL;
        var res = newURL.replace("watch?", "embed/"); //changed str to newURL cuts down on amount of code delete these comments later
        document.getElementById("recipe-vid").innerHTML = `<iframe src=${res}>`;

    });
}