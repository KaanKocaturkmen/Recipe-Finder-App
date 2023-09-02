const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetails = document.querySelector(".recipe-details");
const recipeDetailsContent  = document.querySelector(".recipe-details-content");
const recipeCloseBtn  = document.querySelector(".recipe-closeBtn");


const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "Fetching Recipes...";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json();
    console.log(response);
    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src=${meal.strMealThumb}>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span></p>
        <p><span>${meal.strCategory}</span></p>
        
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe"
        recipeDiv.appendChild(button)

        // Adding EventListener to recipe button

        button.addEventListener('click',()=>{
            openRecipePopUp(meal)
        })
        recipeContainer.appendChild(recipeDiv)
    })

}
// Function to fetch ingredients
const fetchIngredients = (meal)=>{
    let ingredientList = "";
    for(let i = 1; i<=20;i++){
        const ingredients = meal[`strIngredient${i}`];
        if(ingredients){
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredients}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openRecipePopUp = (meal)=>{
    recipeDetailsContent.innerHTML =  `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div>
        <h3 class="Instructions">Instructions</h3>
        <p class="recipeInstructions">${meal.strInstructions}</p>
    </div>


    `
    recipeDetailsContent.parentElement.style.display = "block";
    
}



recipeCloseBtn.addEventListener('click',(e)=>{
    recipeDetails.style.display="none"
    e.preventDefault()
})
searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const searchInput = searchBox.value.trim()
    if(!searchInput){
        recipeContainer.innerHTML = `
        <h2>Type the meal in the search box..</h2>
        `
        return;
    }
    fetchRecipes(searchInput);
    
});