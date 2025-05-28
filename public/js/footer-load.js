async function loadFooter() {
  try {
    const response = await fetch('footer-disclaimer.html');
    if (!response.ok) throw new Error('Impossibile caricare il footer');
    const footerHTML = await response.text();
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
  } catch (error) {
    console.error(error);
  }
}

loadFooter();
