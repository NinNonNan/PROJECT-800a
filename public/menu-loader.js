document.addEventListener("DOMContentLoaded", async () => {
  const menu = document.getElementById("menu");

  try {
    const res = await fetch("/.netlify/functions/listFiles");
    if (!res.ok) {
      throw new Error(`Errore HTTP ${res.status}`);
    }

    const files = await res.json();
    if (!Array.isArray(files)) {
      throw new Error("Risposta inattesa");
    }

    // Ordina i file alfabeticamente (ignorando maiuscole/minuscole)
    files.sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    menu.innerHTML = "";
    files.forEach(file => {
      const name = file.replace(".md", "").replace(/[-_]/g, " ");
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `viewer.html?file=${encodeURIComponent(file)}`;
      link.textContent = name;
      li.appendChild(link);
      menu.appendChild(li);
    });

  } catch (err) {
    menu.innerHTML = `<li>Errore nel caricamento del menu: ${err.message}</li>`;
    console.error("Errore nel caricamento del menu:", err);
  }
});
