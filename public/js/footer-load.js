async function loadFooter() {
  try {
    // Se è già stato chiuso, non lo carichiamo più
    if (localStorage.getItem('footerClosed') === 'true') return;

    const response = await fetch('footer-disclaimer.html');
    if (!response.ok) throw new Error('Impossibile caricare il footer');
    const footerHTML = await response.text();
    const container = document.getElementById('footer-placeholder');
    container.innerHTML = footerHTML;

    // Aggiungi event listener al bottone di chiusura
    const closeBtn = container.querySelector('#footer-close-btn');
    const footer = container.querySelector('#footer-disclaimer');
    if (closeBtn && footer) {
      closeBtn.addEventListener('click', () => {
        footer.style.display = 'none';
        localStorage.setItem('footerClosed', 'true');
      });
    }
  } catch (error) {
    console.error(error);
  }
}

loadFooter();
