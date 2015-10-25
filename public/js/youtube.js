var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player, event_item;
function onYouTubeIframeAPIReady(id,element) {
    return new YT.Player(element, {
        height: '390',
        width: '640',
        videoId: id,
        playerVars: {'autoplay': 0, 'controls': 0, 'showinfo': 0},
        events: {
            'onReady': function(event){
                alert("Test");
            }
        }
    });
    
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    alert("Test");
    event_item = event.target;
}  