// Public Key
// 8ef3c799dfb791ffe453fdf363f2b764

// Private Key
// ac76bbd5a45201d2168ef0988b374f2a7532d740

// importing cryptoJS for creation of hash
const MD5 = require('crypto-js/md5')

// getting the elements from document
let searchBar = document.getElementById('search-bar');
let searchResults = document.getElementById('search-results');

// adding event listener to search bar
searchBar.addEventListener('input', () => searchHeroes(searchBar.value));

// searchHeroes function
async function searchHeroes(textSearched){
    let Public_Key = '8ef3c799dfb791ffe453fdf363f2b764';
    let Private_Key = 'ac76bbd5a45201d2168ef0988b374f2a7532d740';
    let ts = new Date().getTime();
    let hash = MD5(ts + Private_Key + Public_Key).toString();

    // if no text in search bar
    if(textSearched.length == 0){
        searchResults.innerHTML = '';
        return;
    }

    // get the data from Marvel API
    await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&apikey=${Public_Key}&hash=${hash}?ts=${ts}`)
    .then(res => res.json())
    .then(data => showSearchedResults(data.data.results));
}