# Trulli Heritage – UI Feedback & Suggerimenti

## ✅ TravelBar (Hero section)

**Obiettivo:** Migliorare chiarezza, accessibilità e conversione.

### Problemi:

- Il bottone circolare non comunica abbastanza chiaramente la funzione di "ricerca"
- Placeholder poco amichevoli e campi poco interattivi
- Poco ottimizzata per mobile

### Suggerimenti:

- ✅ Trasformare il bottone giallo in rettangolare: **"Cerca disponibilità"**
- ✅ Migliorare i placeholder:
  - `gg/mm/aaaa` → `Es. 21/05/2025`
  - `1 Ospiti` → `Quanti ospiti?`
- ✅ Aggiungere hover/focus state sugli input
- ✅ Animazioni micro-interattive: effetto ripple, spinner, validazione
- ✅ Versione sticky o compatta per mobile
- ✅ Quick selectors (es. “Prossimo weekend”)

---

## 🧱 Componente Immagine+Paragraph

**Obiettivo:** Rendere la sezione più coinvolgente e meno "template".

### Problemi:

- Layout statico, poco dinamico
- Tipografia poco espressiva
- Nessun effetto al passaggio mouse o animazione

### Suggerimenti:

- 🔁 Alternare **immagine a sinistra/destra** nei blocchi consecutivi
- 🧾 Aggiungere un **titolo sezione grande e significativo**
- ✨ Aggiungere **animazione lieve** (es. `fade-up` o `slide-in`)
- 🖼️ Utilizzare immagini con **rapporti coerenti** e **ritagli più "cinematografici"**
- 💬 Paragrafo con max 2-3 righe e **CTA soft** tipo "Scopri di più →"

---

## 🍱 BentoGrid (Servizi e Comfort)

**Obiettivo:** Dare più personalità e gerarchia visiva.

### Problemi:

- Stile troppo “Tailwind base”
- Tutti i box hanno lo stesso peso visivo
- Poco storytelling

### Suggerimenti:

- 🧩 Varia dimensioni dei box (es. 2 grandi, 4 piccoli) → effetto tipo "grid editoriale"
- 🌿 Aggiungi sfondi soft (`bg-amber-50`, `bg-stone-100`) con illustrazioni o icone personalizzate
- 🪄 Aggiungi interazioni on-hover (`shadow-lg`, `scale-105`)
- 📝 Ogni box potrebbe linkare ad approfondimento/ancora
- 🖌️ Inserisci un titolo sezione più forte, es: **"Tutti i comfort di casa, nel cuore della Puglia"**

---

## 📱 Responsive & Hierarchy Improvements

### Suggerimenti:

- 📏 Imposta max-width coerente su tutta la pagina (es. `max-w-7xl mx-auto px-4`)
- 📱 Verifica spaziature tra sezioni per scroll fluido in mobile
- 🎯 Usa **ancore sticky** o scroll-to-sections per migliorare navigazione in home

---

## 🎨 UI/UX Polishing Generale

- 🪞 Riduci il numero di font weight diversi nella stessa sezione
- 🖋️ Uniforma stile dei pulsanti (`border-radius`, `hover`, `focus`)
- 📷 Ottimizza proporzioni immagini (alcune troppo ravvicinate o tagliate male)
- 📌 Sticky navbar consigliata dopo scroll
- 🎭 Aggiungi un po’ di teatralità visiva: curve SVG, clip-path per separatori, icone personalizzate

---

## 🔚 In sintesi

| Area               | Azione chiave                        |
| ------------------ | ------------------------------------ |
| TravelBar          | Bottone CTA chiaro + quick selectors |
| Immagine+Paragraph | Alternanza layout + animazione + CTA |
| BentoGrid          | Variazione visiva + interazioni      |
| Tipografia         | Pulizia, coerenza e leggibilità      |
| Responsive         | Versioni mobili fluide e piacevoli   |
