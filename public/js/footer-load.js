document.addEventListener("DOMContentLoaded", function () {
  fetch("/footer.html")
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById("footer-placeholder");
      placeholder.innerHTML = html;

      // Funzionalità per il bottone di chiusura
      const closeBtn = document.getElementById("footer-close-btn");
      const footer = document.getElementById("footer-disclaimer");

      if (closeBtn && footer) {
        closeBtn.addEventListener("click", () => {
          footer.style.display = "none";
          adjustContentPadding(); // aggiorna padding se chiuso
        });
      }

      // Calcola il padding solo dopo che il footer è stato caricato
      adjustContentPadding();
    })
    .catch(err => {
      console.error("Impossibile caricare il footer:", err);
    });
});

