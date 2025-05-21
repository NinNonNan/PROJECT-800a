// ✅ Questo script viene eseguito al caricamento completo della pagina HTML.
// La funzione recupera un elenco di file Markdown da una funzione serverless Netlify,
// li ordina alfabeticamente (ignorando maiuscole/minuscole), e genera dinamicamente
// una lista di link cliccabili che puntano alla visualizzazione del file selezionato.

document.addEventListener("DOMContentLoaded", async () => {
  const menu = document.getElementById("menu"); // Recupera l'elemento <ul> o <ol> con id="menu"

  try {
    // Richiesta alla funzione serverless per ottenere l'elenco dei file
    const res = await fetch("/.netlify/functions/listFiles");

    // Se la risposta non è OK, solleva un errore
    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}`);
    }

    const files = await res.json(); // Converte la risposta JSON in un array

    // Verifica che la risposta sia effettivamente un array
    if (!Array.isArray(files)) {
      throw new Error("Risposta inattesa");
    }

    // Ordina i nomi dei file in ordine alfabetico ignorando maiuscole/minuscole
    files.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

    // Svuota il contenuto del menu prima di riempirlo
    menu.innerHTML = "";

    // Per ogni file trovato, crea un elemento di menu
    files.forEach(file => {
      // Pulisce il nome del file: rimuove ".md" e sostituisce - e _ con spazi
      const name = file.replace(".md", "").replace(/[-_]/g, " ");

      // Crea un nuovo elemento <li> con un link al file Markdown
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `viewer.html?file=${encodeURIComponent(file)}`;
      link.textContent = name;

      // Inserisce il link nell'elemento <li>, e lo aggiunge al menu
      li.appendChild(link);
      menu.appendChild(li);
    });

  } catch (err) {
    // In caso di errore, mostra un messaggio nell'interfaccia e scrive l'errore in console
    menu.innerHTML = `<li>Errore nel caricamento del menu: ${err.message}</li>`;
    console.error("Errore nel caricamento del menu:", err);
  }
});
