fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });