# Prüfung am 29.09.2026

- TypeScript mit strikten Typen: bestanden.
- Vite-Produktionsbuild: bestanden (Node 24.19.0).
- JS: rund 248 kB / 78 kB gzip; CSS: rund 23 kB / 6 kB gzip. Schriften liegen lokal im Build.
- Browser: 360, 768 und 3840 Pixel Breite, nach Korrektur der mobilen Überschrift kein horizontaler Überlauf.
- Desktop-Dunkelansicht und mobile Hellansicht visuell geprüft.
- Deutsch/Englisch: Umschalter, übersetzte Texte, Dokumenttitel und html lang geprüft.
- Hell/Dunkel: Umschaltung und berechnete Farben geprüft; Sprach-/Themeauswahl bleibt nach Reload erhalten.
- Mobiles Menü: Öffnen, Schließen mit Escape und Schließen nach Anker-Navigation geprüft.
- Ankerziele: alle vorhanden.
- Browserkonsole: keine Warnungen oder Fehler während der Prüfung.
- Reduced Motion und Backdrop-Fallback: im CSS implementiert, nicht mit separater Browser-Emulation getestet.
- Kein vollständiges WCAG-Audit durchgeführt. Fokusmarkierungen, semantische Bereiche und zugängliche Namen sind vorhanden; Kontrastfarben wurden für beide Themes gewählt.

## Nicht verifiziert

Live-Domain, Domainverfügbarkeit, zusätzliche DNS-Labels, Zertifikat, Codeberg-Webhook und Live-Deployment sind nicht eingerichtet. Codeberg untersagt überwiegend KI-generierte Projekte in seinen aktuellen Nutzungsbedingungen. Open Domains verlangt noch einen Login. E-Mail, Foto und CV wurden nicht bereitgestellt.

## Live-Veröffentlichung

- GitHub Pages am 29.09.2026 erfolgreich veröffentlicht: https://johannesgoelz.github.io/portfolio/
- Workflow 36612492666: Build und Deployment erfolgreich. HTTPS aktiviert.
- Live im Browser geprüft: Inhalt, Layout, Deutsch/Englisch, Inter und Space Grotesk geladen, korrekte Canonical-URL, GitHub-Link, keine Konsolenwarnungen/-fehler.
- Alle 18 Dateien des Übergangsbuilds sind im pages-Branch. Der frühere lokale HTTP-Test lieferte alle damals 17 Build-Dateien fehlerfrei aus; danach kam die leere .nojekyll-Datei hinzu.
- Ein zusätzlicher paralleler HTTPS-Test aus Node scheiterte an einem Verbindungs-Timeout. Die öffentliche Website und Fonts wurden anschließend/parallel erfolgreich über den Browser geladen. Kein vollständiger automatisierter Netzwerktest aller Live-Assets behauptet.
- Der Übergangsbuild nutzt /portfolio/; die Quellkonfiguration bleibt wie gefordert auf / für die spätere Custom Domain.
- Noch blockiert: Open-Domains-Login, damit Verfügbarkeit und DNS eingerichtet werden können. Foto, öffentliche E-Mail und CV fehlen weiterhin.
