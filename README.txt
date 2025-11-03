XYZ - Website project
---------------------
Structure:
  - index.html
  - products.html
  - e-aadhaar.html
  - about.html, contact.html, privacy.html, disclaimer.html
  - header.html, footer.html (included via js/include.js)
  - css/style.css
  - js/include.js, js/script.js
  - data/products.json (used by the home search)

Notes:
  - No external fonts or Font Awesome are used. Icons are inline SVGs.
  - Header and footer are stored as separate files and loaded via include.js to avoid duplication.
  - Home search searches only data/products.json; it matches substring (left-to-right).
  - Product page lists "Aadhar services" with three items as requested.
  - To host on GitHub Pages, push this folder to a repository and enable Pages on the main branch.
