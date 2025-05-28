const DATA_URL = 'bio-feedback.json';  // Percorso al file JSON esterno
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

function displayValues(values) {
  const container = document.getElementById('values-container');
  if (!container) return;
  
  container.innerHTML = ''; // Pulisce contenuto precedente

  values.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('value-item');
    div.innerHTML = `
      <h3>${item.name} (${item.abbr})</h3>
      <p><strong>Descrizione:</strong> ${item.description}</p>
      <p><strong>Valori tipici:</strong> ${item.typicalRange}</p>
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
