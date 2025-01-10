const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchMeals(query);
    }
});

async function fetchMeals(query) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    displayMeals(data.meals);
}

function displayMeals(meals) {
    resultsContainer.innerHTML = ''; // Clear previous results
    if (meals) {
        const mealsToShow = meals.slice(0, 5);
        const resultsGrid = document.createElement('div');
        resultsGrid.classList.add('results-grid');

        mealsToShow.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('meal-card');
            mealCard.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p>ID: ${meal.idMeal}</p>
                <p>${meal.strInstructions}</p>
            `;
            resultsGrid.appendChild(mealCard);
        });

        resultsContainer.appendChild(resultsGrid);

        if (meals.length > 5) {
            const showAllButton = document.createElement('button');
            showAllButton.innerText = 'SHOW ALL';
            showAllButton.classList.add('show-all-button');
            showAllButton.addEventListener('click', () => {
                displayAllMeals(meals);
            });
            resultsContainer.appendChild(showAllButton);
        }
    } else {
        resultsContainer.innerHTML = '<p>No meals found.</p>';
    }
}

function displayAllMeals(meals) {
    resultsContainer.innerHTML = ''; // Clear previous results
    const resultsGrid = document.createElement('div');
    resultsGrid.classList.add('results-grid');

    meals.forEach(meal => {
        const mealCard = document.createElement('div');
        mealCard.classList.add('meal-card');
        mealCard.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <p>ID: ${meal.idMeal}</p>
            <p>${meal.strInstructions}</p>
        `;
        resultsGrid.appendChild(mealCard);
    });

    resultsContainer.appendChild(resultsGrid);
}