let allPokemon;
let search;

document.addEventListener('DOMContentLoaded', () => {
  const pokeList = document.getElementById('pokemon-list');
  document.addEventListener('click', function(e){
    if (e.target.classList.contains('pokemon-img')) {
      let imgs = e.target.parentElement.querySelectorAll('img.pokemon-img');
      imgs.forEach(img => {
        img.classList.toggle('hide');
      })
    }
  });

  const searchField = document.getElementById('pokemon-search-input');
  searchField.addEventListener('keyup', function(e){
    search = searchField.value.toLowerCase();
    if (search !== "") {
      pokeList.innerHTML = "";
      let newList = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(search));
      newList.forEach(pokemon => pokemon.addPokemon());
    } else {
      pokeList.innerHTML = "";
      allPokemon.forEach(pokemon => pokemon.addPokemon());
    }
  })

  getAllPokemon().then( pokemon => {
    allPokemon = pokemon;
    pokeList.innerHTML = '';
    allPokemon.forEach(pokemon => pokemon.addPokemon())
  });

})

const getAllPokemon = () => fetch('http://localhost:3000/pokemon')
                                .then(resp => resp.json())
                                .then(pokemon => pokemon.map(p => new Pokemon(p)) );

