// const { json } = require("body-parser");



const apiKey = 'jTAuqirruj85Vtd9DISWXopoSqNOHRUG';
const limit = 5;
let offset = limit;
let loading = false;
let currentSearch = '';

const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}&offset=${offset}`;

function searchGIFs(keyword) {
    offset = 0;
    currentSearch = keyword;
    const myList = document.getElementById('myList');
    myList.innerHTML = '';
    loadMoreGIFs();
}

function loadMoreGIFs() {
    if (loading) {
        return;
    }
    loading = true;

    const searchUrl = currentSearch !== '' ? `${url}&q=${currentSearch}` : url;

    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            const parsedInfo = [];

            for (const gif of data.data) {
                const title = gif.title;
                const url = gif.images.original.url;
                const fixed_height = gif.images.original.height;
                const fixed_width = gif.images.original.width;

                const gifInfo = {
                    title: title,
                    url: url,
                    fixed_height: fixed_height,
                    fixed_width: fixed_width
                };

                parsedInfo.push(gifInfo);
            }

            const myList = document.getElementById('myList');
            for (const element of parsedInfo) {
                const listItem = `<li class="contain"><div class="box heading"><h3>${element.title}</h3></div><img src="${element.url}" alt="GIF" ></li>`;
                myList.innerHTML += listItem;
            }

            loading = false;
            offset += limit;
        })
        .catch(error => {
            console.error('Error:', error);
            loading = false;
        });
}

// Load more GIFs when the user reaches the bottom of the page
window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        loadMoreGIFs();
    }
});



// Load initial GIFs
loadMoreGIFs();

console.log("load")