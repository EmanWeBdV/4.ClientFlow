# ClientFlow — Brand Identity

Logo, palette e tipografia del progetto. Gli asset SVG definitivi sono in `frontend/public/`.

## Loghi

- `clientflow-logo-horizontal.svg` — simbolo + wordmark "ClientFlow" ("Client" blu scuro, "Flow" teal). Uso: login, documenti, header su sfondo chiaro.
- `clientflow-icon.svg` — solo simbolo su tile blu scuro. Uso: favicon, app icon. Leggibile a 16-32 px.
- `clientflow-logo-white.svg` — versione monocromatica bianca per la sidebar e gli sfondi scuri.

Il simbolo (tre barre che convergono e si allineano) rappresenta il flusso clienti → progetti → task che si mette in ordine.

Regole: area di rispetto pari a metà dell'altezza del simbolo su ogni lato; non ruotare, non distorcere, non ricolorare.

## Palette

Primari:

| Token | Hex | Uso |
|---|---|---|
| Blu scuro (primary) | `#1c446d` | Sidebar, titoli, bottoni primari |
| Blu medio | `#457faf` | Link, elementi attivi, hover, info |
| Teal accento | `#3aa9b4` | Highlight, badge, CTA secondarie |

Neutri:

| Token | Hex | Uso |
|---|---|---|
| Testo | `#1e2a36` | Testo primario, heading |
| Testo secondario | `#5a6b7c` | Testo di supporto, label |
| Bordi / divisori | `#d8e1ea` | Bordi card, separatori, input |
| Sfondo pagina | `#f4f7fa` | Background applicazione |
| Superficie / card | `#ffffff` | Card, pannelli, tabelle |

Semantici:

| Token | Hex | Uso |
|---|---|---|
| Successo | `#2e9e6b` | Task completati, conferme |
| Avviso | `#e0a02e` | Scadenze vicine |
| Errore | `#d64550` | Errori, azioni distruttive |
| Info | `#457faf` | Note informative |

## Tipografia

Google Fonts (licenza OFL):

- **Sora** — titoli (H1-H3), numeri in evidenza, navigazione. Pesi 600/700.
- **IBM Plex Sans** — testo e UI (tabelle, form, label). Pesi 400/500/600.

## Altri token

- Border radius: card 12px, elementi minori 10px, tile icona 14px.
- Bordo card: `1px solid #d8e1ea`.
