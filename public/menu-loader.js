document.addEventListener("DOMContentLoaded", async () => {
  const menu = document.getElementById("menu");

  try {
    const response = await fetch("/.netlify/functions/listFiles");
    const files = await response.json();

    if (!Array.isArray(files)) throw new Error("Risposta inattesa");

    files.forEach(file => {
      const name = file.replace(".md", "");
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `viewer.html?file=${encodeURIComponent(file)}`;
      a.textContent = name;
      li.appendChild(a);
      menu.appendChild(li);
    });
  } catch (err) {
    console.error("Errore nel caricamento del menu:", err);
    menu.innerHTML = "<li>Errore nel caricamento del menu</li>";
  }
});
