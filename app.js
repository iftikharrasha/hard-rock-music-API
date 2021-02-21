const searchSongs = () => {
    const searchText = document.getElementById("search-field").value;
    // console.log("searchText");

    const url = `https://api.lyrics.ovh/suggest/${searchText}`;

    toggleSpinner();
    // toggleSpinner(true);
    //loading data
    fetch(url)
    .then(res => res.json()) 
    .then(value => displaySongs(value.data))  //renamed value because out api has the variable data, just to not get confused
    // .catch(error => console.log(error));
    .catch(error => displayError('Something went wrong!'));

    //.then(value => displaySongs(value))  //gives us the whole object
    //.then(value => displaySongs(value.data))  //gives us the array
}

document.getElementById("search-field").addEventListener("keypress", function(event) {
    //event.preventDefault();
    if (event.key == 'Enter'){
        document.getElementById("search-button").click();
    }
});

const displaySongs = songs => {
    const songContainer = document.getElementById("song-container");

    songContainer.innerHTML = ' '; //cleaning when we are searching again
    songs.forEach(song => {
        // console.log(song.title);
        // const li = document.createElement('li');
        // li.innerText = song.title;
        // songContainer.appendChild(li);
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML =  `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>

                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songContainer.appendChild(songDiv);
        toggleSpinner();
        // toggleSpinner(false);
    });
}


const getLyric = (artist, title) => {
    // console.log(artist, title);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(error => displayError('Something went wrong!'));
        
    // doing it with async-await
    // const getLyric = async(artist, title) => {
    //     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    //     try{
    //         const res = await fetch(url);
    //         const data = await res.json();
    //         displayLyrics(data.lyrics);

    //     }catch(error){
    //         displayError('Something went wrong!');
    //     }
    // }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;

}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggleSpinner = (show) => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
    
    // if(show){
    //     spinner.classList.remove('d-none');
    // }else{
    //     spinner.classList.add('d-none');
    // }
}

