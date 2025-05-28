// Inserisci la tua API Key di YouTube Data API v3
const API_KEY = 'AIzaSyBSmrQkfmMEKBuSnltZmw0SBv6ljcDpIiM';

// Inserisci l'ID del canale YouTube da cui vuoi ottenere i video
const CHANNEL_ID = 'UCL0CDBSk0zBkY-366Vpg4BQ';

// Funzione asincrona che recupera gli ultimi video pubblicati dal canale specificato
async function fetchVideos() {
  try {
    // Effettua la richiesta all'API YouTube Data
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10`
    );

    // Converte la risposta in formato JSON
    const data = await response.json();

    // Seleziona l'elemento <ul> con id="video-list" dove verranno inseriti i video
    const videoList = document.getElementById('video-list');

    // Pulisce eventuali contenuti precedenti
    videoList.innerHTML = '';

    // Itera attraverso i risultati ottenuti
    data.items.forEach(item => {
      // Controlla che l'elemento sia effettivamente un video (può anche essere una playlist o altro)
      if (item.id.kind === "youtube#video") {
        const videoId = item.id.videoId;           // ID del video
        const title = item.snippet.title;          // Titolo del video
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // URL completo del video

        // Crea un nuovo elemento <li> per ogni video
        const li = document.createElement('li');
        li.innerHTML = `<a href="${videoUrl}" target="_blank">${title}</a>`; // Link cliccabile al video

        // Aggiunge l'elemento alla lista
        videoList.appendChild(li);
      }
    });
  } catch (error) {
    // Gestisce eventuali errori nella richiesta o nel parsing
    console.error("Errore nel recupero dei video:", error);
  }
}

// Chiama la funzione quando lo script viene caricato
fetchVideos();
