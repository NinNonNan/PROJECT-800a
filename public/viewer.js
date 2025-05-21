/**
 * viewer.js
 *
 * Questo script carica dinamicamente un file Markdown in base al parametro "file"
 * presente nella query string dell'URL. Il contenuto Markdown viene convertito in HTML
 * tramite la libreria `marked` e iniettato all'interno dell'elemento con ID "content".
 *
 * Dipendenze:
 * - marked (inclusa separatamente tramite CDN)
 * - endpoint Netlify serverless: `/.netlify/functions/getMdFile`
 */

// Estrae il parametro "file" dalla URL
const params = new URLSearchParams(window.location.search);
const file = params.get("file");

if (file) {
  // Se è specificato un file, invia una richiesta al backend per ottenere il contenuto
  fetch(`/.netlify/functions/getMdFile?file=${encodeURIComponent(file)}`)
    .then(res => {
      if (!res.ok) {
        // Se il file non è stato trovato o c'è un errore nella risposta
        throw new Error('File non trovato o errore nel caricamento');
      }
      return res.text(); // Converte la risposta in testo
    })
    .then(text => {
      // Converte il Markdown in HTML e lo inserisce nel contenitore
      document.getElementById("content").innerHTML = marked.parse(text);
    })
    .catch(err => {
      // Gestione errori: mostra un messaggio di errore nella pagina
      document.getElementById("content").textContent =
        "Errore nel caricamento del file: " + err.message;
    });
} else {
  // Nessun parametro "file" nella URL
  document.getElementById("content").textContent = "Nessun file specificato.";
}

