function formatLabel(filename) {
  const name = filename.replace('.md', '');
  return name.replace(/_/g, ' ')
             .replace(/([a-z])([A-Z])/g, '$1 $2')
             .replace(/\b\w/g, c => c.toUpperCase());
}

fetch('/.netlify/functions/listFiles')
  .then(res => res.json())
  .then(files => {
    const menu = document.getElementById('menu');
    files.forEach(file => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `viewer.html?file=${encodeURIComponent(file)}`;
      a.textContent = formatLabel(file);
      li.appendChild(a);
      menu.appendChild(li);
    });
  })
  .catch(err => {
    console.error('Errore nel caricamento del menu:', err);
  });
