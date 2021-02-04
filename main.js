function block({ Poster, Title, Type, Year, imdbID }) {
    return (
        `<div class="movie col-3">
            <div class="movie__poster" style="background-image: url(${Poster})"></div>
            <h2 class="movie__title">${Title}</h2>

            <p class="movie__type">${Type}</p>
            <p class="movie__released">${Year}</p>

            <button type="button" class="btn btn-success movie__details" onClick="showDetails()" data-id="${imdbID}" data-bs-toggle="modal" data-bs-target="#details">More details</button>
        </div>`
    );
}

function detailsBlock({ Poster, Title, Rated, Year, Genre, Plot, Writer, Director, Actors, BoxOffice, Awards, Ratings }) {
    function ratings(array) {
        let ratingsBlock = document.createElement('div');

        for (const item of array) {
            ratingsBlock.innerHTML += `<span>${item.Source}: ${item.Value}</span><br>`;
        }

        return ratingsBlock;
    }

    return (
        `<div class="details__poster" style="background-image: url(${Poster})"></div>
        
        <div class="details__info">
            <h2 class="details__title">${Title}</h2>
            <p class="details__rated">${Rated} ${Year} ${Genre}</p>
            <p class="details__plot">${Plot}</p>
            
            <p class="details__writer"><b>Written by:</b> ${Writer}</p>
            <p class="details__director"><b>Directed by:</b> ${Director}</p>
            <p class="details__actors"><b>Staring:</b> ${Actors}</p>
            <p class="details__box-office"><b>BoxOffice:</b> ${BoxOffice}</p>
            <p class="details__awards"><b>Awards:</b> ${Awards}</p>

            <p class="details__ratings"><b>Ratings:</b><br>
            ${ratings(Ratings).innerHTML}
            </p>
        </div>`
    )
}

async function getData(url) {
    let response = await fetch(url);

    return await response.json();
}

const GET_MOVIE_FORM = document.querySelector('.search-form');
GET_MOVIE_FORM.addEventListener(
    'submit',
    function (e) {
        e.preventDefault();

        const MOVIE_NAME = document.getElementById('movie-name').value;
        const URL = `http://www.omdbapi.com/?s=${MOVIE_NAME.toLowerCase()}&apikey=777b83da`;

        getData(URL)
            .then(function (data) {
                let movies = data;

                const MOVIES_BLOCK = document.querySelector('.movies');
                MOVIES_BLOCK.innerHTML = '';

                for (const movie of movies.Search) {
                    MOVIES_BLOCK.innerHTML += block(movie);
                }
            })
            .catch(error => console.log(error));
    }
);

const MODAL_DETAILS = document.querySelector('#details .modal-body');
function showDetails() {
    const URL = `http://www.omdbapi.com/?i=${event.target.dataset.id}&apikey=777b83da`;

    getData(URL)
        .then(message => {
            let data = message;

            MODAL_DETAILS.innerHTML = detailsBlock(data);
        })
        .catch(error => console.log(error));
}