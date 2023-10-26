const recipeContainer = document.querySelector('.container')
const btn = document.querySelector('.random')



const renderRecipe = function (data, ingredient) {

    let url = data.meals[0].strYoutube
    let urlM = url.replace(/\/watch\?v=/, "/embed/")

    const html = `
    <div class="box recipeName">
    ${data.meals[0].strMeal}
        </div>
        <div class="img box">
            <img src="${data.meals[0].strMealThumb}" alt="">
        </div>

        <main class="main">
            <article class="box country">
              <strong>ORIGIN:</strong>  <span>${data.meals[0].strArea}</span>
            </article>
            <article class="box ingredient">
              <strong>INGREDIENT:</strong>    <span>${ingredient.join(', ')}</span>
            </article>
            <article class="box instruction">
              <strong>INSTRUCTION:</strong>    <span>${data.meals[0].strInstructions}</span>
            </article>
            <article class="box ytLink">
              <strong>YOUTUBE LINK:</strong> <div><iframe width="640" height="360" src="${urlM}"></iframe></div>
            </article>
        </main>
        `
    recipeContainer.insertAdjacentHTML('beforeend', html)
}



const getRecipe = async function () {
    const recipes = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    const dataRecipe = await recipes.json()


    getIngredient(dataRecipe)


}

getRecipe()

let arr = [];
const getIngredient = function (data) {
    let ingredient = Object.entries(data.meals[0]).filter((e) => e[0].includes("strIngredient"));
    ingredient.forEach((item) => {
        if (item[1].length > 1) {
            arr.push(item[1]);
        }
    });

    arr = Array.from(new Set(arr));


    renderRecipe(data, arr);
}


btn.addEventListener('click', () => {
    recipeContainer.innerHTML = ''
    getRecipe()

})