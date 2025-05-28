/**
 * Script per il caricamento e la visualizzazione dinamica di valori energetici
 * legati all'utente, basati su pseudoscienze e teorie new age.
 * 
 * Funzionamento:
 * - Recupera da un file JSON esterno (DATA_URL) un elenco di parametri con
 *   descrizioni e range di valori tipici.
 * - Ogni parametro viene aggiornato e mostrato con un valore casuale
 *   generato all’interno del range specificato.
 * - In particolare, per il parametro "Livello energetico dei chakra",
 *   visualizza separatamente i valori per i 7 chakra principali.
 * - Il contenuto viene aggiornato automaticamente ogni REFRESH_INTERVAL
 *   millisecondi (default 10 secondi).
 * - Il valore visualizzato viene arrotondato e mostrato con l’unità di misura
 *   se presente.
 */

const DATA_URL = 'data/bio-feedback.json';  // Percorso al file JSON esterno
const REFRESH_INTERVAL = 10000; // Intervallo aggiornamento in ms (10 secondi)

async function fetchData() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Errore nel caricamento dei dati:', error);
    return null;
  }
}

function generateRandomValue(min, max, decimals = 1) {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

function displayValues(values) {
  const container = document.getElementById('values-container');
  if (!container) return;

  container.innerHTML = ''; // Pulisce contenuto precedente

  values.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('value-item');

    // Se è il campo dei chakra, mostra i 7 valori
    if (item.chakras && Array.isArray(item.chakras)) {
      let chakraHtml = item.chakras.map(chakra => {
        const value = generateRandomValue(chakra.min, chakra.max);
        return `<li><strong>${chakra.name}:</strong> ${value}/100</li>`;
      }).join('');
      
      div.innerHTML = `
        <h3>${item.name} (${item.abbr})</h3>
        <p><strong>Descrizione:</strong> ${item.description}</p>
        <ul>${chakraHtml}</ul>
      `;
    } else {
      const value = generateRandomValue(item.min, item.max, item.unit === 'Hz' ? 2 : 1);
      div.innerHTML = `
        <h3>${item.name} (${item.abbr})</h3>
        <p><strong>Descrizione:</strong> ${item.description}</p>
        <p><strong>Valore attuale:</strong> ${value} ${item.unit || ''}</p>
      `;
    }

    container.appendChild(div);
  });
}

async function refreshData() {
  const values = await fetchData();
  if (values) {
    displayValues(values);
  }
}

// Avvia il ciclo di aggiornamento
refreshData();
setInterval(refreshData, REFRESH_INTERVAL);
