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

/**
 * Genera un valore casuale compreso tra min e max, con due decimali
 */
function getRandomValue(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function displayValues(values) {
  const container = document.getElementById('values-container');
  if (!container) return;
  
  container.innerHTML = ''; // Pulisce contenuto precedente

  values.forEach(item => {
    const randomValue = getRandomValue(item.min, item.max);
    const div = document.createElement('div');
    div.classList.add('value-item');
    div.innerHTML = `
      <h3>${item.name} (${item.abbr})</h3>
      <p><strong>Descrizione:</strong> ${item.description}</p>
      <p><strong>Valore rilevato:</strong> ${randomValue} ${item.unit}</p>
      <p><strong>Valori tipici:</strong> ${item.min} - ${item.max} ${item.unit}</p>
    `;
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
