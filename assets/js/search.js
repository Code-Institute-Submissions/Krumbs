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

        //need list of ingredients an measures 1-20 on a for loop? Unpacking Our Data Onto The DOM lesson: 
        //checks if the meal has that corresponding ingredient-measure pair. If it does, we're putting it into the ingredients array. 
        //If there aren't any more ingredients we're stopping the for loop with a break condition. needs figured out next.
        document.getElementById("recipe-ingred").innerHTML = data.meals["0"].strIngredient1; 

        //for (let i = 1; i <= 20; i++) {
	   // console.log(ingred[i]);
       // }

        //document.getElementById("recipe-meas").innerHTML = data.meals["0"].strMeasure1; 

        
        // description of how to carry out the meal
        document.getElementById("recipe-instruction").innerHTML = data.meals["0"].strInstructions;



        //youtube clip embeded
        
        let watchURL = `${data.meals["0"].strYoutube}`
        let newURL = watchURL.toString()  
        console.log(res)
                

        var str = newURL;  
        var res = str.replace("watch?","embed/");   
        document.getElementById("recipe-vid").innerHTML = `<iframe src=${res}>`;   
        console.log(res)
        //document.getElementById("recipe-vid").innerHTML = `<iframe src=${newURL}>`; `<iframe src=${res}>`;
         
    });
       
            
        
       
}




//  '<iframe src="data.meals["0"].strYoutube">'; 
// document.getElementById("recipe-vid").innerHTML = '<iframe src="https://www.youtube.com/embed/$"{data.meals["0"].strYoutube.slice(-11)}">'; 



