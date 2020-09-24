function getLyricsList() {
  document.getElementById("lyricsListing").innerHTML =
    '<div class="loader"></div>';

  let searchText = document.getElementById("searchBox").value;

  let url = "https://api.lyrics.ovh/suggest/" + searchText;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      let data = response.data;
      let html = "";
      if (data.length > 0) {
        data.forEach((element) => {
          html += '<div class="card shadow-1">';
          html += '<div class="row">';
          html += '<div class="column-1">';
          html += element.title;
          html += "</div>";

          html += '<div class="column-2">';
          html +=
            "<button class='btn-primary' onClick='getLyrics(" +
            element.id +
            ");'>Show Lyrics</button>";
          html +=
            '<input type="hidden" value="' +
            element.title +
            '" id="title_' +
            element.id +
            '">';
          html +=
            '<input type="hidden" value="' +
            element.artist.name +
            '" id="artist_' +
            element.id +
            '">';
          html += "</div>";
          html += "</div>";
          html += "</div>";
        });
      } else {
        html += "<div class='no-lyric'><h4>No lyrics found!</h4></div>";
      }

      document.getElementById("lyricsListing").innerHTML = html;
    })
    .catch((error) => {
      html = "<div class='no-lyric'><h4>No lyrics found!</h4></div>";
      document.getElementById("lyricsListing").innerHTML = html;
    });
}

function getLyrics(id) {
  let title = document.getElementById("title_" + id).value;
  let artist = document.getElementById("artist_" + id).value;
  let url = "https://api.lyrics.ovh/v1/" + artist + "/" + title;

  document.getElementById("lyricsListing").innerHTML =
    '<div class="loader"></div>';

  fetch(encodeURI(url))
    .then((response) => response.json())
    .then((response) => {
      html = '<div id="lyricsText" class="lyrics-text">';
      html +=
        '<div class="back-link"><a href="#" onClick="getLyricsList();">< Go back</a></div>';
      html += "<h4 style='text-align: center;margin: 30px;'>" + title + "</h4>";
      console.log(response.lyrics);
      if (response.lyrics != "") {
        html += response.lyrics;
      } else {
        html += "<div class='no-lyric'><h4>No lyrics found!</h4></div>";
      }
      html += "</div>";
      document.getElementById("lyricsListing").innerHTML = html;
    })
    .catch((error) => {
      html = "<div class='no-lyric'><h4>No lyrics found!</h4></div>";
      document.getElementById("lyricsListing").innerHTML = html;
    });
}
