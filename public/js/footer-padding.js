function adjustContentPadding() {
  const footer = document.getElementById('footer-disclaimer');
  const content = document.getElementById('content');
  
  if (footer && content) {
    const footerHeight = footer.offsetHeight;
    content.style.paddingBottom = footerHeight + 'px';
  }
}

// Esegui subito
adjustContentPadding();

// Aggiorna se la finestra cambia dimensione (utile se il footer è responsive)
window.addEventListener('resize', adjustContentPadding);
