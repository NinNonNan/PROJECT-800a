function adjustContentPadding() {
  const footer = document.getElementById('footer-disclaimer');
  const content = document.getElementById('content');
  
  if (footer && content) {
    const footerHeight = footer.offsetHeight;
    content.style.paddingBottom = footerHeight + 'px';
  }
}

// Aspetta che il footer venga aggiunto al DOM
const observer = new MutationObserver(() => {
  const footer = document.getElementById('footer-disclaimer');
  if (footer) {
    adjustContentPadding();
    observer.disconnect(); // Una volta trovato, non osservare più
    window.addEventListener('resize', adjustContentPadding); // continua ad aggiornare al resize
  }
});

observer.observe(document.getElementById('footer-placeholder'), {
  childList: true,
  subtree: true
});
