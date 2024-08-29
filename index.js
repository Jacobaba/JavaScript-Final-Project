const pokedex = document.getElementById('pokedex');
const pokemonName = document.getElementById('searchItem').value.toLowerCase()


const pullPokemon = (event) => {
    const searchItem = event.target.value.toLowerCase();
    const promises = [];
    for (let i = 1; i <= 1; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${searchItem}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name.toUpperCase(),
            image: result.sprites.other.home['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
    .map(
        (pokemon) => `
        <li class="card">
        <img class="card-image" src="${pokemon.image}"/>
        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-subtitle">Type: ${pokemon.type}</p>
        </li>
        `
    )
    .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

pullPokemon();