const fs = require('fs');
const path = require('path');

exports.handler = async function () {
  const markdownDir = path.join(__dirname, '../../markdown');

  try {
    const files = fs.readdirSync(markdownDir)
      .filter(file => file.endsWith('.md'));
    
    return {
      statusCode: 200,
      body: JSON.stringify(files)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore nella lettura della directory' })
    };
  }
};
