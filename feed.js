
var $grid;

$(function() {

    //laetud

    getTweets();

    $grid = $('#content').isotope({
        //üks kast
        itemSelector: ".item"
    });

});


function getTweets(){

    //vajadusel saab urliga kaasa saata parameetreid
    $.ajax({
        url: "getfeed.php",
        success: function(data){

            //stringi teen massiiviks
            var array = JSON.parse(data).statuses;

            console.log(array);
            printTweets(array);

        },
        error: function(error){
            console.log(error);
        }
    });

}

function printTweets(newTweets){

    var html = '';

    $(newTweets).each(function(i, tweet){

        html += '<div class="item">'+

        '<div class="profile-image" style="background-image:url('+tweet.user.profile_image_url.replace("_normal", "")+')"></div>'+
        '<p>'+tweet.user.name+'</p>'+
        '<p>'+tweet.text+'</p>'+

        '</div>';

    });

    // laeb sisu allapoole otsa
    //$("#content").append( $(html) );

    // $(html) teeb tavalise stringi html elementideks, see on vajalik isotope'i jaoks
    var tweetsHTML = $(html);

    // laeb ettepoole otsa ja aktiveerib isotope'i
    $grid.prepend(tweetsHTML)
    .isotope('prepended', tweetsHTML)
    .isotope('layout');

    //oota ja siis küsi uuesti
    window.setTimeout(function(){
        getTweets();
    },10000);

}
