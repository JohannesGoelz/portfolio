# Johannes Gölz — Portfolio

Zweisprachiges Portfolio mit Vite, React, TypeScript und CSS Modules. Das aktuelle Design orientiert sich am Aufbau von thanos-pappas.com: feste Profilspalte, heller Lebenslauf, rote Akzente, Dosis und Bitter als lokal gehostete Schriften. Keine Cookies, Analytics, externen Fonts oder Kontakt-Backends. Sprache und Theme werden in localStorage gespeichert; blockierter Speicher wird abgefangen.

## Entwicklung

Node.js >=22.12 verwenden.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vite `base` ist `/` für die Custom Domain. `dist/` enthält die statische Website.

## Inhalte

- `src/i18n/de.ts` und `en.ts`: Texte.
- `src/config.ts`: Profil-, Foto- und Projektlinks.
- TODO: Originalfoto, Play-Store-URL, Fraunhofer-Link, Tools, Sprachkenntnisse und genaue Zeiträume.
- Grundlage sind der Nutzerauftrag und das ältere lokale Portfolio. Kein CV/Foto bereitgestellt; LinkedIn war nicht lesbar. Keine Telefonnummer veröffentlichen.
- Studiengänge werden ohne unbelegten Abschlussstatus genannt. Das Monogramm ist ein Foto-Platzhalter. Kein CV-Download ohne freigegebenen CV.

## Veröffentlichung: GitHub Pages

Repository: https://github.com/JohannesGoelz/portfolio

Der Nutzer hat GitHub Pages als kostenlosen Ersatz für Codeberg freigegeben. Codeberg untersagt in § 2 Abs. 1 Nr. 7 überwiegend KI-generierte Projekte. Dort wurde nichts hochgeladen.

- Quellcode auf `main`, Build auf `pages`.
- GitHub Settings → Pages → Deploy from a branch → `pages` → `/`.
- Bis zur Domainfreigabe kann ein Übergangsbuild mit `npm run build -- --base=/portfolio/` auf der GitHub-URL bereitgestellt werden. Für die Custom Domain wieder normal mit `base: /` bauen.
- `node scripts/publish-pages.mjs JohannesGoelz` veröffentlicht den fertigen `dist/`-Ordner in einem isolierten temporären Git-Checkout mit normalem Push ohne Force. Git Credential Manager/gh verwaltet die Zugangsdaten.

### Custom Domain — noch offen

1. Bei Open Domains anmelden und zuerst `johannes.goelz.is-not-a.dev` prüfen. Falls nicht unterstützt/verfügbar: `johannes-goelz.is-not-a.dev`, `goelz.is-not-a.dev`, `johannes.is-not-a.dev`.
2. Domain mit `node scripts/set-domain.mjs DOMAIN` in Canonical, Open Graph, robots.txt, sitemap.xml und `.domains` aktualisieren. `.domains` ist nur eine Merkdatei und wird von GitHub Pages nicht ausgewertet.
3. Die gewählte Domain in GitHub Pages konfigurieren und als `public/CNAME` speichern.
4. In Open Domains einen CNAME auf `johannesgoelz.github.io` setzen, ohne Repository-Pfad. Keine Wildcard anlegen.
5. Normalen Build mit `base: /` veröffentlichen und HTTPS nach Zertifikatsausstellung aktivieren. DNS, TLS und Live-Assets überprüfen.

Domainverfügbarkeit und verschachtelte Labels sind noch nicht im Dashboard geprüft. Das Open-Domains-Login fehlt.

## Prüfung

Siehe `VERIFICATION.md` und die aktuelle Designprüfung in `design-qa.md`. Fonts werden vom gleichen Host geladen. Externe Profile öffnen erst beim Klick. Der Host kann technische Server-Logs führen.

## Quellen

- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.codeberg.org/codeberg-pages/
- https://docs.codeberg.org/codeberg-pages/using-custom-domain/
- https://codeberg.org/Codeberg/org/src/branch/main/TermsOfUse.md#2-allowed-content-usage

E-Mail wird auf Wunsch nicht angezeigt. Der englische Profiltext ist in beiden Sprachversionen identisch. Konkrete Kalenderdaten für Projekte und Arbeitserfahrung sind in den vorhandenen Unterlagen nicht belegt; bekannte Dauern bleiben sichtbar.
