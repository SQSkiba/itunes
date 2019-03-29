$(document).ready(function(){
    $("#showResults").on("click",function(){
            var artist = $("#selectArtist").val();
            var limit = $("#selectNumResults").val();
        $.ajax({
            url: "https://itunes.apple.com/search?term=" + artist + "&limit=" + limit,
            dataType: "jsonp",
            success: function (answer){
                console.log(answer);
                myCallback(answer);
            }
        });

    });
});

    function myCallback(json) {
        console.log(json);

        $("#artistName").empty();
        $ ("#output").empty();
       $("#showSongs").empty();
       $("#select").empty();

       var name = $("#selectArtist").val();
       console.log(name);

        $("#artistName").append(name);
        $("#select").append("(Select another artist to search again)");

        var output = "<br><table id='table'>";
        json.resultCount = $("#selectNumResults").val();

        for(var i=0; i<json.resultCount; i++){

            output += "<tr>";
            output += "<td><span class='rank'> " + (i+1)+ " </span><img src='" + json.results[i].artworkUrl100 + "'></td>";
            output += "<td>" + json.results[i].trackName + "</td>";
            output += "<td>" + json.results[i].collectionName + "</td>";
            output += "<td><audio controls='true' src=" + json.results[i].previewUrl + " id='audio' type='audio/m4a'></audio></td>";
            output += "<td>" + "<a href='detail.html?artist=" + json.results[i].trackName + "&song=" + i + "'>" + "Learn more!" + " </a>" + "</td>";
            output += "</tr>";
        }
        output += "</table>";
        console.log();
        $("#showSongs").append(output);
    }



