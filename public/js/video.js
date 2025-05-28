const API_KEY = 'AIzaSyBSmrQkfmMEKBuSnltZmw0SBv6ljcDpIiM';
const CHANNEL_ID = '@project800a';

async function fetchVideos() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
    );
    const data = await response.json();
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';

    data.items.forEach(item => {
      if(item.id.kind === "youtube#video"){
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        const li = document.createElement('li');
        li.innerHTML = `<a href="${videoUrl}" target="_blank">${title}</a>`;
        videoList.appendChild(li);
      }
    });
  } catch (error) {
    console.error("Errore nel recupero dei video:", error);
  }
}

fetchVideos();
