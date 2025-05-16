const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    // Percorso relativo corretto alla cartella "public/md"
    const dirPath = path.resolve(__dirname, "../../public/md");

    // Leggi i file nella cartella
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".md"));

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(files)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

