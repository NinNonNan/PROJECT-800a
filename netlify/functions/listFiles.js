const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  try {
    // Usa path relativo alla cartella di deploy
    // Supponiamo che i tuoi .md siano nella cartella 'public/md'
    const dirPath = path.join(__dirname, "..", "..", "public", "md");

    // Leggi i file nella cartella
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".md"));

    // Torna array come JSON
    return {
      statusCode: 200,
      body: JSON.stringify(files)
    };

  } catch (error) {
    // In caso di errore, ritorna errore con messaggio
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
