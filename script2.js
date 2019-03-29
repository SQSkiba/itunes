$(document).ready(function() {
    $.ajax({
        url: "https://itunes.apple.com/search?term=" + getQueryParameter("artist"),
        dataType: "jsonp",
        success: myCallbackTwo,
        })

});


function myCallbackTwo(data){
    console.log(data);
    var x = data.results[getQueryParameter("song")].trackTimeMillis/1000;
    var min =  Math.floor(x/60);
    var sec= Math.floor(x%60);
    var date = new Date(data.results[getQueryParameter("song")].releaseDate);
    var explicit = data.results[getQueryParameter("song")].trackExplicitness;
    var price = data.results[getQueryParameter("song")].trackPrice;
    var genre = data.results[getQueryParameter("song")].primaryGenreName;


    $("#table").empty();
    var newTable = "";
    newTable += "<tr>";
    newTable += "<td>" + "<img src=' " + data.results[getQueryParameter("song")].artworkUrl100 + "'></td>";
    newTable += "<td><audio controls='true' src=" + data.results[getQueryParameter("song")].previewUrl + " id='audio' type='audio/m4a'></audio></td>";
    newTable += "</tr>";
    newTable += "<tr>";
    newTable += "<td>" + "Song Name:  " + data.results[getQueryParameter("song")].trackName + "</td>";
    newTable += "</tr>";
    newTable += "<tr>";
    newTable += "<td>" + "Album Name:  " + data.results[getQueryParameter("song")].collectionName + "<br></td>";
    newTable += "</tr><tr><td>";
    if(sec<10){
        newTable += "Time: " + min + ":0" + sec + "</td></tr>";
    } else {
        newTable += "Time: " + min + ":" + sec + "</td></tr>";
    }
    newTable += "<tr><td>" + "Release Date: " + date.getMonth() + "/" + date.getFullYear() + "</td></tr>";
    newTable += "<tr><td>" + "Language: " + explicit + "</td></tr>";
    newTable += "<tr><td>" + "Price: $" + price +   "</td></tr>";
    newTable += "<tr><td>" + "Genre: " + genre +   "</td></tr>";
    newTable += "</table>";

    $("#table").append(newTable);


}


function getQueryParameter(name)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == name){return pair[1];}
    }
    return false;
}
