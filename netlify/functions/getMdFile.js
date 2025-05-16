// netlify/functions/getMdFile.js
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const filename = event.queryStringParameters.file;
    if (!filename || !filename.endsWith(".md")) {
      return {
        statusCode: 400,
        body: "Parametro file non valido",
      };
    }

    const filePath = path.join(__dirname, "md", filename);
    if (!fs.existsSync(filePath)) {
      return {
        statusCode: 404,
        body: "File non trovato",
      };
    }

    const content = fs.readFileSync(filePath, "utf-8");
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/markdown" },
      body: content,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Errore interno: " + err.message,
    };
  }
};
