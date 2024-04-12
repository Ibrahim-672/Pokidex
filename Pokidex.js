document.addEventListener("DOMContentLoaded", async function () {
    const pokedex = document.getElementById("pokedex");

    // Fetch data from the Pokémon API
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    //once response is collected from the api .json parses the data to json data and stores it in 'data/
    const data = await response.json();
    //store the pokemon data in 'pokemon' variable
    const pokemon = data.results;

    
    // Fetch additional details for each Pokémon and create cards
    for (const poke of pokemon) {    
        const pokeResponse = await fetch(poke.url);
        const pokeData = await pokeResponse.json();
        createPokemonCard(pokeData);
    }

    // Function to create a Pokémon card
    function createPokemonCard(pokeData) {
        const card = document.createElement("li");
        card.classList.add("card");

        const name = document.createElement("h2");
        name.textContent = pokeData.name;

        const image = document.createElement("img");
        image.classList.add("card-image");
        image.src = pokeData.sprites.front_default;
        image.alt = pokeData.name;

        const types = document.createElement("p");
        types.classList.add("card-subtitle");
        types.textContent = `Type: ${pokeData.types.map((type) => type.type.name).join(", ")}`;

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(types);

        pokedex.appendChild(card);
    }
});