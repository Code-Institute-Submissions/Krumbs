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
        document.getElementById("recipe-image").innerHTML = '<img src=`${meals["0"].strMealThumb}`>'; 
                                                        // '<img src="data.meals["0"].strMealThumb">';


       //document.getElementById("recipe-image").innerHTML = '<img src="data.meals["0"].strMealThumb">';
        //need list of ingredients an measures 1-20 on a for loop? Unpacking Our Data Onto The DOM lesson: 
        //checks if the meal has that corresponding ingredient-measure pair. If it does, we're putting it into the ingredients array. 
        //If there aren't any more ingredients we're stopping the for loop with a break condition. needs figured out next.
        
        // description of how to carry out the meal
        document.getElementById("recipe-instruction").innerHTML = data.meals["0"].strInstructions;        
        //youtube clip needs embeeded as video instead of website link/ broken link
        document.getElementById("recipe-vid").innerHTML = '<iframe src=`${strYoutube}`>';

       
        
    });
        function myFunction() {
        var str = document.getElementById("recipe-vid").innerHTML; 
        var res = str.replace(/watch/g, "embed");
        document.getElementById("recipe-vid").innerHTML = res;}
}

//  '<iframe src="data.meals["0"].strYoutube">'; 
// document.getElementById("recipe-vid").innerHTML = '<iframe src="https://www.youtube.com/embed/${"data.meals["0"].strYoutube.slice(-11)}">';
