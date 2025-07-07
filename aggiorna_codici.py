import hashlib
from datetime import datetime
import os
import json
import string

def generate_code(name, type_code, pub_date, length=12):
    """
    Genera un codice univoco con lunghezza fissa, con carattere di controllo alfabetico finale.
    Codice composto solo da caratteri alfanumerici (A-Z, 0-9).
    """

    # Prendi solo caratteri alfanumerici e calcola iniziali (prima lettera di ogni parola valida)
    words = [''.join(ch for ch in word if ch.isalnum()) for word in name.split()]
    initials = ''.join(word[0].upper() for word in words if word)  # parola non vuota

    # Convertire data in formato YYMMDD
    date_obj = datetime.strptime(pub_date, "%Y-%m-%d")
    date_str = date_obj.strftime("%y%m%d")

    # Combinazione base senza carattere di controllo
    base_code = initials + type_code + date_str

    # Troncamento o padding per rispettare lunghezza-1
    max_base_len = length - 1
    if len(base_code) > max_base_len:
        base_code = base_code[:max_base_len]
    else:
        base_code = base_code.ljust(max_base_len, 'X')  # padding con 'X'

    # Calcolo carattere di controllo alfabetico (A-Z)
    hash_input = name + type_code + pub_date
    hash_bytes = hashlib.md5(hash_input.encode()).digest()
    control_index = hash_bytes[0] % 26
    control_char = string.ascii_uppercase[control_index]

    # Codice finale
    code = base_code + control_char
    return code

def main():
    # Percorso file JSON (modifica se serve)
    json_path = "public/data/entries.json"

    # Percorso file output
    output_path = os.path.join("netlify", "functions", "md", "realta.md")

    # Leggi dati JSON
    with open(json_path, "r", encoding="utf-8") as f:
        entries = json.load(f)

    # Scrivi output
    with open(output_path, "w", encoding="utf-8") as f:
        for entry in entries:
            name = entry["name"]
            type_code = entry["type_code"]
            pub_date = entry["pub_date"]
            code = generate_code(name, type_code, pub_date, length=12)
            f.write(f"{name}: {code}\n")

if __name__ == "__main__":
    main()
