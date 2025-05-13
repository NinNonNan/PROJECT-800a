import hashlib
from datetime import datetime

def generate_code(name, type_code, pub_date):
    """
    Genera un codice univoco per l'universo o l'interfaccia.
    
    Args:
    - name (str): Nome dell'universo o interfaccia.
    - type_code (str): Tipo di codice ('UN' per universo, 'IN' per interfaccia).
    - pub_date (str): Data di prima pubblicazione nel formato 'YYYY-MM-DD'.
    
    Returns:
    - str: Codice univoco generato.
    """
    # Calcolare le iniziali del nome (prima lettera di ogni parola)
    initials = ''.join([word[0].upper() for word in name.split()])

    # Convertire la data di pubblicazione nel formato YYMMDD
    date_obj = datetime.strptime(pub_date, "%Y-%m-%d")
    date_str = date_obj.strftime("%y%m%d")

    # Calcolare un carattere di controllo (hash del nome + data)
    hash_input = name + pub_date
    control_char = hashlib.md5(hash_input.encode()).hexdigest()[0].upper()

    # Combinare tutto in un unico codice
    code = f"{initials}{type_code}{date_str}{control_char}"
    
    return code

# Lista di universi e interfacce con nome e data di pubblicazione
entries = [
    # Universi
    ("Fallout", "UN", "1997-10-10"),
    ("The Sims", "UN", "2000-02-04"),
    ("Minecraft", "UN", "2011-11-18"),
    ("Green Oaks", "UN", "2021-01-01"),
    ("Carbon 2185", "UN", "2019-09-01"),
    ("La Torre Nera", "UN", "1982-06-10"),
    ("No Man's Sky", "UN", "2016-08-09"),
    ("Il Faro al Confine dell’Universo", "UN", "2021-02-01"),

    # Interfacce
    ("Fallout 76", "IN", "2018-11-14"),
    ("The Sims 4", "IN", "2014-09-02"),
    ("Minecraft Java Edition", "IN", "2011-11-18"),
    ("Green Oaks: Simulatore", "IN", "2021-01-01"),
    ("Carbon 2185 Roll20", "IN", "2020-01-15"),
    ("La Torre Nera (serie)", "IN", "2017-07-19"),
    ("No Man's Sky (videogioco)", "IN", "2016-08-09"),
    ("Il Faro – Simulatore VR", "IN", "2021-02-01")
]

# Generare e stampare i codici per ogni voce
for entry in entries:
    name, type_code, pub_date = entry
    code = generate_code(name, type_code, pub_date)
    print(f"{name}: {code}")
