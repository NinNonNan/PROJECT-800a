fetch("/.netlify/functions/listFiles")
  .then(res => {
    if (!res.ok) throw new Error("Errore HTTP: " + res.status);
    return res.json();
  })
  .then(files => {
    if (!Array.isArray(files)) {
      throw new Error("Risposta non è un array");
    }
    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = ""; // pulisci lista

    files.forEach(file => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `viewer.html?file=${encodeURIComponent(file)}`;
      a.textContent = file.replace(".md", "");
      li.appendChild(a);
      menuList.appendChild(li);
    });
  })
  .catch(err => {
    console.error("Errore nel caricamento del menu:", err);
    const menuList = document.getElementById("menu-list");
    menuList.innerHTML = `<li>Errore nel caricamento del menu: ${err.message}</li>`;
  });
