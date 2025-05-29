// Carica il footer nel placeholder
fetch('/footer.html')
  .then(res => res.text())
  .then(html => {
    const placeholder = document.getElementById('footer-placeholder');
    placeholder.innerHTML = html;

    // Ora che il footer è nel DOM, possiamo regolare il padding
    adjustContentPadding();

    // Rende il padding reattivo al resize
    window.addEventListener('resize', adjustContentPadding);
  });

function adjustContentPadding() {
  const footer = document.getElementById('footer-disclaimer');
  const content = document.getElementById('content');

  if (footer && content) {
    const footerHeight = footer.offsetHeight;
    content.style.paddingBottom = footerHeight + 'px';
  }
}
