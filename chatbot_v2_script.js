function displayRecipe(response) {
    console.log("recipe generated");
    new Typewriter("#recipe", {
      strings: response.data.answer,
      autoStart: true,
      delay: 40,
      cursor: "",
    });
  }
  
  function generateRecipe(event) {
    event.preventDefault();
    let instructions = document.querySelector("#user-instructions").value;
    let apiKey = "16t1b3fa04b8866116ccceb0d2do3a04";
    let prompt = `User instructions are: Generate a recipe for ${instructions}`;
    let context =
      "You are an expert at recipes. Your mission is to generate a short and easy recipe in basic HTML. Make sure to follow user instructions. Sign the recipe at the end with '<strong>Thank You</strong>' in bold";
  
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt
    }&context=${context}&key=${apiKey}`;
  
    let recipeElement = document.querySelector("#recipe")
    recipeElement.classList.remove("hidden")
      recipeElement.innerHTML = `<div class="blink">👩🏽‍🍳 Generating recipe for ${instructions}..</div>`;
  
    console.log("generating recipe");
    axios.get(apiUrl).then(displayRecipe);
  }
  
  let recipeForm = document.querySelector("#recipe-generator-form");
  recipeForm.addEventListener("submit", generateRecipe);

  document.addEventListener('DOMContentLoaded', () => {
    const mealCardsRight = document.querySelectorAll('.meal-card-right');
  
    const cuisineFoodIdeas = {
      "Italian": ["pasta", "pizza", "risotto", "lasagna", "gnocchi", "tiramisu"],
      "French": ["soup", "crepes", "ratatouille", "quiche", "macarons", "boeuf bourguignon"],
      "Mexican": ["tacos", "enchiladas", "burritos", "salsa", "guacamole", "churros"],
      "Chinese": ["noodles", "stir-fry", "dumplings", "fried rice", "spring rolls", "Peking duck"],
      "Indian": ["curry", "biryani", "naan", "samosa", "tikka masala", "jalebi"],
      "Japanese": ["sushi", "ramen", "tempura", "miso soup", "yakitori", "mochi"],
      "Thai": ["curry", "noodles", "soup", "stir-fry", "spring rolls", "mango sticky rice"],
      "Greek": ["salad", "gyros", "souvlaki", "moussaka", "spanakopita", "baklava"]
      // Add more cuisines and their food ideas
    };
  
    // Create an object to store the suggestion container for each card
    const suggestionContainers = {};
    let currentlyOpenCard = null; // Keep track of the currently open card
  
    mealCardsRight.forEach(card => {
      // Create a suggestion container for this card
      const suggestionsContainer = document.createElement('div');
      suggestionsContainer.classList.add('suggestions-container');
      suggestionsContainer.style.marginTop = '5px';
      suggestionsContainer.style.paddingLeft = '10px';
      suggestionsContainer.style.fontSize = '0.8em';
      suggestionsContainer.style.display = 'none'; // Initially hide the container
      suggestionContainers[card.dataset.cuisine] = suggestionsContainer;
      card.parentNode.insertBefore(suggestionsContainer, card.nextSibling); // Insert below the card
  
      card.addEventListener('click', function() {
        const cuisine = this.dataset.cuisine;
        const foodIdeas = cuisineFoodIdeas[cuisine];
        const currentContainer = suggestionContainers[cuisine];
  
        // Close the previously open card's suggestions if it's not the current card
        if (currentlyOpenCard && currentlyOpenCard !== this) {
          const previousCuisine = currentlyOpenCard.dataset.cuisine;
          suggestionContainers[previousCuisine].style.display = 'none';
        }
  
        // Toggle the display of the current card's suggestions
        if (currentContainer.style.display === 'none') {
          currentContainer.innerHTML = ''; // Clear previous suggestions
          if (foodIdeas && foodIdeas.length > 0) {
            const suggestionsList = document.createElement('ul');
            suggestionsList.style.listStyleType = 'none';
            suggestionsList.style.padding = '0';
            suggestionsList.style.margin = '5px 0';
  
            foodIdeas.forEach(food => {
              const listItem = document.createElement('li');
              listItem.textContent = food;
              listItem.style.padding = '2px 0';
              listItem.style.cursor = 'pointer';
              listItem.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the card's click event from firing again
                if (recipeInput) {
                  recipeInput.value = food;
                }
                currentContainer.style.display = 'none'; // Close suggestions after selection
                currentlyOpenCard = null;
              });
              suggestionsList.appendChild(listItem);
            });
            currentContainer.appendChild(suggestionsList);
            currentContainer.style.display = 'block';
            currentlyOpenCard = this; // Set the current card as open
          } else {
            const noSuggestions = document.createElement('p');
            noSuggestions.textContent = `No suggestions for ${cuisine} yet.`;
            currentContainer.appendChild(noSuggestions);
            currentContainer.style.display = 'block';
            currentlyOpenCard = this;
          }
        } else {
          currentContainer.style.display = 'none';
          currentlyOpenCard = null; // No card is open
        }
      });
    });
  });
  document.getElementById("calorieForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const activity = parseFloat(document.getElementById("activity").value);
  
    let bmr;
  
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    const calories = Math.round(bmr * activity);
  
    document.getElementById("result").textContent = `You need approximately ${calories} calories/day.`;
  });