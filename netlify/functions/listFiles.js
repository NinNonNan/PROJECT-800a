const path = require("path");
const fs = require("fs");

exports.handler = async function(event, context) {
  try {
    const dirPath = path.resolve(__dirname, "../../public/md");
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".md"));
    
    return {
      statusCode: 200,
      body: JSON.stringify(files)
    };
  } catch (error) {
    console.error("Errore nella funzione:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
