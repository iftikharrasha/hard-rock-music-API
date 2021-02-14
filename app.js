const searchSongs = () => {
    const searchText = document.getElementById("search-field").value;
    // console.log("searchText");

    const url = `https://api.lyrics.ovh/suggest/${searchText}`;

    //loading data
    fetch(url)
    .then(res => res.json()) 
    .then(value => displaySongs(value.data))  //renamed value because out api has the variable data, just to not get confused

    //.then(value => displaySongs(value))  //gives us the whole object
    //.then(value => displaySongs(value.data))  //gives us the array
}


const displaySongs = songs => {
    const songContainer = document.getElementById("song-container");
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
    });
}


const getLyric = (artist, title) => {
    console.log(artist, title);
}