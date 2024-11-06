const pokedex = document.getElementById("pokedex");
const searchInput = document.querySelector("#searchItem");

let pokemon = [];

const pullPokemon = (filter) => {
  const promises = [];
  for (let i = 1; i <= 1025; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((result) => ({
      name: result.name,
      image: result.sprites.other.home["front_default"],
      type: result.types.map((type) => type.type.name).join(", "),
      id: result.id,
    }))
    if (filter === 'LOW_TO_HIGH') {
      pokemon.sort((a, b) => a.id > b.id ? 1 : -1)  
    }
    else if (filter === 'HIGH_TO_LOW') {
      pokemon.sort((a, b) => b.id > a.id ? 1 : -1)
    }
    else if (filter === 'A_TO_Z') {
      pokemon.sort((a, b) => a.name > b.name ? 1 : -1)
    }
    else if (filter === 'Z_TO_A') {
      pokemon.sort((a, b) => b.name > a.name ? 1 : -1)
    }
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  let query = searchInput.value;
  console.log("Query::", query);
  const pokemonHTMLString = pokemon.filter((eventData) => {
    if (query === "") {return eventData}
    else if (eventData.name.toLowerCase().includes(query.toLowerCase())) {return eventData}
  })
    .map(
      (pokemon) => `
        <li class="card">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">Type: ${pokemon.type}</p>
        </li>
        `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

pullPokemon();

searchInput.addEventListener("input", () => {
  pullPokemon()
})

function filterPokemon(event) {
  pullPokemon(event.target.value)
}