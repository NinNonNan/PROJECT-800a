// ✅ Questo script gestisce un effetto "glitch" animato sul titolo della pagina (document.title).
// Ora carica i messaggi da un file JSON esterno e li alterna creando un effetto di distorsione temporanea
// usando caratteri casuali prima di ripristinare il messaggio originale. Il ciclo si ripete ogni 3 secondi.

// Caratteri casuali usati per creare l'effetto "glitch"
const glitchChars = "!@#$%^&*()_+{}|:<>?-=[];',./~";

/**
 * Funzione che crea un effetto di glitch sul testo passato, modificando il titolo della pagina.
 * @param {string} text - Il testo da visualizzare dopo l'effetto glitch.
 * @param {number} iterations - Quante iterazioni di glitch prima di mostrare il testo originale.
 * @param {number} delay - Il tempo (in ms) tra ogni iterazione.
 */
function glitchText(text, iterations = 10, delay = 100) {
  let iteration = 0; // Contatore delle iterazioni
  const originalText = text; // Salva il testo originale

  // Esegue un intervallo che aggiorna il titolo a intervalli regolari
  const interval = setInterval(() => {
    let glitched = ''; // Variabile che conterrà il testo distorto

    // Cicla ogni carattere del testo originale
    for (let i = 0; i < originalText.length; i++) {
      // Con una probabilità del 50%, sostituisce il carattere con uno casuale
      if (Math.random() < 0.5) {
        glitched += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
      } else {
        glitched += originalText.charAt(i);
      }
    }

    document.title = glitched; // Imposta il titolo distorto

    iteration++; // Incrementa il numero di iterazioni

    // Dopo un certo numero di iterazioni, ferma l'intervallo e ripristina il titolo originale
    if (iteration >= iterations) {
      clearInterval(interval);
      document.title = originalText;
    }
  }, delay); // Ritardo tra ogni ciclo di glitch
}

/**
 * Carica il file JSON contenente i messaggi e avvia il ciclo dell'effetto glitch.
 * I messaggi vengono alternati ogni 3 secondi.
 */
fetch('data/messages.json')
  .then(response => {
    if (!response.ok) throw new Error("Impossibile caricare messages.json");
    return response.json(); // Converte la risposta in oggetto JSON
  })
  .then(data => {
    const messages = data.messages; // Estrae l'array "messages" dal JSON
    let currentMessage = 0; // Variabile per tenere traccia del messaggio corrente

    // Ogni 3 secondi (3000 ms), esegue un nuovo effetto glitch con il messaggio successivo
    setInterval(() => {
      glitchText(messages[currentMessage]); // Applica l'effetto glitch al messaggio corrente
      currentMessage = (currentMessage + 1) % messages.length; // Passa al prossimo messaggio in modo ciclico
    }, 3000);
  })
  .catch(error => {
    console.error("Errore durante il caricamento dei messaggi:", error);
  });
