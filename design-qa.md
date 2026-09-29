# Design QA — Überarbeitung nach Thanos-Pappas-Referenz

final result: passed

## Visuelle Grundlage

- Referenz: http://thanos-pappas.com/ (im Browser erreichbar; HTTPS-Webabruf zuvor fehlgeschlagen).
- Umsetzung: http://127.0.0.1:4173/, anschließend https://johannesgoelz.github.io/portfolio/.
- Desktopvergleich: beide Ansichten bei 1103 × 910 CSS-Pixeln, Scrollposition 0, helle Ansicht. Beide Browser-Screenshots wurden gemeinsam in derselben Toolausgabe betrachtet. Bilder sind im Aufgabenverlauf sichtbar, nicht als lokale Dateien gespeichert. Screenshotdarstellung wurde vom Browserwerkzeug skaliert; Layoutmessungen basieren auf CSS-Pixeln.
- Weitere visuelle Prüfung: lokale Desktopansicht 1280 × 720, mobile Ansicht 390 × 844, Projektbereich und Dunkelmodus bei 360 × 800.
- Die Referenz ist eine Stil- und Strukturvorlage für eine persönliche Anpassung, kein pixelidentischer Klon. Fremdes Foto, fremde Lebenslaufdaten, Logos und Projektscreenshots wurden nicht übernommen.

## Geprüfte Oberflächen

- **Typografie:** Dosis für den Namen und die Akzentleiste, Bitter für Überschriften und Profiltext wie in der Referenz. Lokal über Fontsource geladen und im Browser geprüft. Inter für kleine Metadaten. Die Lebenslauf-Schriftgrößen wurden nach dem ersten Vergleich erhöht.
- **Layout:** feste Profilspalte links, scrollbarerer Lebenslauf rechts, oben haftende Navigation, rote Unterstreichung und offene Timeline. Mobile: Profil vor dem Lebenslauf, aufklappbare Navigation. Absichtlich zusätzliche Innenabstände und zurückhaltendere Metadaten.
- **Farben:** heller Papierhintergrund, dunkle Schrift und ein roter Akzent. Separater Dunkelmodus. Frühere Glaskarten, lila Verläufe und schräge Projektillustrationen vollständig entfernt.
- **Bilder:** Kein Originalfoto von Johannes vorhanden. Statt eines fremden oder erfundenen Porträts eine offen typografische Signatur. Echte Bilddatei kann über src/config.ts eingesetzt werden. Das dezente Netz ist ein berechnetes Canvas-Element mit 27 Knoten; keine Bildkopie der Referenz. Animation stoppt bei ausgeblendeter Seite und respektiert reduzierte Bewegung.
- **Inhalt:** Johannes' vorhandene Daten und DE/EN-Inhalte übernommen. Unbekannte Angaben bleiben als TODO erkennbar. Keine erfundenen Stellen, Abschlüsse, Kontaktadressen oder Links.

## Interaktion und technische Prüfung

- TypeScript strict und Vite-Build erfolgreich.
- Browserbreiten 360, 390, 768, 820, 1024, 1440 und 3840 geprüft: kein horizontaler Seitenüberlauf.
- Mobiles Menü öffnen, Navigationsziel auswählen und per Escape schließen: geprüft.
- Projektinformationen auf-/zuklappen, aria-expanded und sichtbarer Inhalt: geprüft.
- Deutsch/Englisch, html lang sowie Hell/Dunkel: geprüft.
- Ankerpositionen nach Ende des sanften Scrollens unterhalb der Navigation geprüft.
- Sichtbare Fokusmarkierungen, übersichtliche Überschriften und Link-/Buttonnamen vorhanden.
- Keine Warnungen oder Fehler in der Browserkonsole.
- Reduzierte Bewegung per Code/CSS geprüft, nicht über Browser-Emulation. Kein vollständiges WCAG-Audit.

## Vergleichsverlauf

1. Erste Umsetzung: die Hauptstruktur und Schriften entsprachen der Richtung, Metadaten und Fließtext rechts wirkten zu klein. Textgrößen erhöht.
2. Zurück-nach-oben-Link: eigener Dokumentanker ergänzt, damit die feste Profilspalte nicht als Scrollziel dienen muss.
3. Gemeinsamer Desktopvergleich nach Anpassung: keine offenen P0/P1/P2-Probleme. Unterschiedliche Fotos, Inhalte und die schmalere Profilspalte sind bewusste Anpassungen an Johannes.

## Offene Inhalte

Originalfoto, öffentliche E-Mail, Projektlinks, konkrete Tools und Sprachkenntnisse fehlen weiterhin. Wunschdomain wartet auf Open-Domains-Zugang. Diese offenen Inhalte sind unabhängig von der abgeschlossenen Designüberarbeitung.
