# PROJECT:800a

**PROJECT:800a** è un'esperienza web narrativa in stile sci-fi/paranormale (ispirata all'estetica SCP Foundation). Il sito simula un archivio classificato contenente report, video e analisi di bio-feedback su entità e fenomeni sconosciuti.

## 👁️ Caratteristiche

*   **Atmosfera Immersiva:** Design "glitch", terminale verde su nero, effetti CRT e animazioni CSS personalizzate (`buzzing.css`).
*   **Architettura Modulare:** Caricamento dinamico di componenti comuni (Menu, Footer) tramite Vanilla JS per simulare un sistema di templating senza build tools complessi.
*   **Visualizzatore Markdown:** Rendering dinamico di documenti `.md` tramite `marked.js` nella pagina `viewer.html`.
*   **Analisi Dati:** Visualizzazione di dati JSON (es. `bio-feedback.json`) sotto forma di schede interattive.
*   **Netlify Forms:** Modulo di contatto funzionante integrato nativamente con Netlify.
*   **Automazione:** Workflow GitHub Actions per l'aggiornamento automatico dei "Codici Realtà" tramite script Python.

## 📂 Struttura del Progetto

*   `public/`: Contiene tutti i file statici del sito web (root del sito pubblicato).
    *   `css/`: Fogli di stile (incluso `style.css` con variabili CSS globali).
    *   `js/`: Script per logica UI, caricamento dati e effetti visivi.
    *   `data/`: File JSON contenenti i dati mostrati nelle pagine.
    *   `*.html`: Pagine principali (Home, Viewer, Video, Bio-Feed).
*   `.github/workflows/`: Configurazioni per GitHub Actions.

## 🚀 Installazione e Uso locale

Poiché si tratta di un sito statico, non è necessaria una build complessa, ma per via delle policy CORS dei browser (per caricare i moduli JS e i JSON), è necessario un server locale.

1.  Clona il repository:
    ```bash
    git clone https://github.com/tuo-username/PROJECT-800a.git
    ```
2.  Entra nella cartella pubblica:
    ```bash
    cd PROJECT-800a/public
    ```
3.  Avvia un server locale (es. con Python):
    ```bash
    python -m http.server 8000
    ```
4.  Apri il browser su `http://localhost:8000`.

## 🛠 Tecnologie

*   HTML5 / CSS3 (CSS Variables, Flexbox, Animations)
*   JavaScript (ES6+)
*   Marked.js (Markdown parsing)
*   Python (Script di automazione backend)

---
*Accesso riservato. Livello di autorizzazione richiesto: GAMMA.*