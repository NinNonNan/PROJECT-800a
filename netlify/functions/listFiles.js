const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    // Percorso corretto alla cartella md inclusa nella build
    const dirPath = path.resolve(__dirname, "md");

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
