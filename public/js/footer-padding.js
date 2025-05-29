function adjustContentPadding() {
  const footer = document.getElementById("footer-disclaimer");
  const content = document.getElementById("content");

  if (footer && content) {
    const footerHeight = footer.offsetHeight;
    content.style.paddingBottom = `${footerHeight}px`;
  }
}

// Reagisce al resize solo se serve (dopo che il footer è stato caricato)
window.addEventListener("resize", adjustContentPadding);

