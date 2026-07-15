<div align="center">

<img src="frontend/public/clientflow-logo-horizontal.svg" alt="ClientFlow" width="320" />

# ClientFlow

**Web app full stack per gestire clienti, progetti e task in un unico posto.**
Pensata per freelance e piccoli team che vogliono smettere di rincorrere informazioni tra email, chat e fogli Excel.

*Progetto Capstone finale del corso Web Developer — realizzato a scopo didattico.*

![Capstone](https://img.shields.io/badge/Progetto-Capstone-1c446d?style=for-the-badge)
![Full Stack](https://img.shields.io/badge/Full-Stack-3aa9b4?style=for-the-badge)
![CRUD](https://img.shields.io/badge/CRUD-Completo-2e9e6b?style=for-the-badge)
![Educational](https://img.shields.io/badge/Scopo-Didattico-e0a02e?style=for-the-badge)

[Demo](#-demo) · [Funzionalità](#-funzionalità) · [Installazione](#-installazione) · [API](#-api-principali)

</div>

---

## 🖼 Anteprima

<div align="center">

<img src="docs/screenshots/dashboard.png" alt="Dashboard di ClientFlow" width="800" />

</div>

> Screenshot da aggiungere in `docs/screenshots/`: `login.png`, `dashboard.png`, `clienti.png`, `kanban.png`, `task.png`, `mobile.png`.

## 🚀 Demo

- **Frontend (Vercel):** `https://SOSTITUISCI-CON-URL.vercel.app`
- **API (Render):** `https://clientflow-api-ey0j.onrender.com`

> Nota: il backend è su piano gratuito Render e si "addormenta" dopo 15 minuti di inattività. La prima richiesta può richiedere 30-60 secondi.

## 📑 Indice

- [Il progetto](#-il-progetto)
- [Funzionalità](#-funzionalità)
- [Tecnologie](#-tecnologie)
- [Struttura del progetto](#-struttura-del-progetto)
- [Installazione](#-installazione)
- [Variabili d'ambiente](#-variabili-dambiente)
- [Dati demo](#-dati-demo)
- [API principali](#-api-principali)
- [Test](#-test)
- [Deploy](#-deploy)
- [Uso dell'AI](#-uso-dellai)
- [Difficoltà incontrate](#-difficoltà-incontrate)
- [Cosa ho imparato](#-cosa-ho-imparato)
- [Autore](#-autore)

## 💡 Il progetto

Quando si seguono più clienti è facile perdere informazioni tra chat, email e documenti sparsi. ClientFlow raccoglie in un unico posto:

- **Clienti** — anagrafica, contatti, stato della relazione e note
- **Progetti** — collegati ai clienti, con date di inizio e scadenza
- **Task** — collegati ai progetti, con priorità, stato e scadenza
- **Dashboard** — riepilogo con contatori, scadenze imminenti e ultimi inserimenti

Il progetto nasce come Capstone finale del corso Web Developer: l'obiettivo è dimostrare la gestione completa di frontend, backend, database, autenticazione, deploy e test.

## ✨ Funzionalità

- **Autenticazione**
  - Registrazione con conferma password e occhio mostra/nascondi
  - Avviso post-registrazione (nessuna email di conferma prevista: si accede subito)
  - Login con JWT, password criptate con bcrypt
  - Rotte protette sia lato frontend sia lato backend
- **Clienti**
  - CRUD completo con creazione e modifica in finestra modale
  - Ricerca per nome, email o telefono e filtro per stato
  - Menu azioni (⋯) con dettaglio, modifica ed eliminazione con conferma esplicita
  - Eliminazione a cascata: cancellando un cliente si eliminano i suoi progetti e task
  - Pagina di dettaglio con i progetti collegati
- **Progetti**
  - Bacheca **kanban** con 4 colonne di stato e **drag & drop** delle card
  - Selettore di stato rapido su ogni card
  - Date di inizio e scadenza etichettate, scadenza in evidenza sulla card
  - Ricerca per titolo o cliente e filtro per cliente
- **Task**
  - Tabella con cambio stato rapido direttamente dalla riga
  - Ricerca e filtri per stato e priorità
  - Priorità con badge colorati
- **Notifiche**
  - Campanella nella barra superiore con scadenze dei prossimi 7 giorni
  - Evidenza dei progetti e task già in ritardo
- **Registro attività**
  - Ogni creazione, modifica, eliminazione e cambio di stato viene salvata con data e ora
  - Pagina "Attività" con lo storico completo
- **UI e design**
  - Brand identity dedicata: logo, palette e tipografia (Sora + IBM Plex Sans)
  - CSS scritto interamente a mano: niente framework UI, solo Grid, Flexbox e media query
  - Completamente responsive con menu hamburger su mobile

## 🛠 Tecnologie

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS_a_mano-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**Testing e deploy**

![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![MongoDB Atlas](https://img.shields.io/badge/Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## 📁 Struttura del progetto

```text
.
├── backend
│   ├── src
│   │   ├── config          # connessione a MongoDB
│   │   ├── middleware      # verifica del token JWT
│   │   ├── models          # User, Client, Project, Task, Activity
│   │   ├── routes          # auth, clients, projects, tasks, dashboard, activities, notifications
│   │   ├── utils           # log automatico delle attivita
│   │   ├── seed.js         # script dati demo
│   │   ├── app.js
│   │   └── server.js
│   └── tests               # test Jest + Supertest
├── frontend
│   ├── public              # loghi e favicon
│   ├── src
│   │   ├── api             # client Axios con interceptor JWT
│   │   ├── components      # Modal, ConfirmDialog, DropdownMenu, icone SVG, ...
│   │   ├── context         # AuthContext
│   │   ├── pages           # Dashboard, Clienti, Progetti (kanban), Task, Attivita, Auth
│   │   ├── utils           # formattazione date
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css      # CSS scritto a mano
│   ├── vercel.json         # rewrite SPA per React Router
│   └── vite.config.js
├── docs                    # brand identity, guida deploy, copione video
└── README.md
```

## ⚙️ Installazione

**Backend** (terminale 1):

```bash
cd backend
npm install
cp .env.example .env   # poi compila le variabili, vedi sotto
npm run dev
```

**Frontend** (terminale 2):

```bash
cd frontend
npm install
npm run dev
```

Apri http://localhost:5173.

## 🔑 Variabili d'ambiente

`backend/.env`:

```env
PORT=5001
MONGODB_URI=mongodb+srv://utente:password@cluster.mongodb.net/clientflow
JWT_SECRET=una_chiave_segreta_lunga_e_casuale
```

`frontend/.env` (facoltativo in locale, obbligatorio su Vercel):

```env
VITE_API_URL=http://localhost:5001/api
```

## 🌱 Dati demo

Per popolare il database con clienti, progetti e task realistici:

```bash
cd backend
node src/seed.js email-del-tuo-account@esempio.it
```

Lo script aggiunge 8 clienti, 12 progetti e 25 task collegati all'utente indicato (che deve essersi già registrato). Se esistono già dei clienti chiede il flag `--force`.

## 🔌 API principali

| Metodo | Endpoint | Descrizione |
|---|---|---|
| POST | `/api/auth/register` | Registrazione |
| POST | `/api/auth/login` | Login, restituisce il token JWT |
| GET/POST | `/api/clients` | Elenco e creazione clienti |
| GET/PUT/DELETE | `/api/clients/:id` | Dettaglio, modifica, eliminazione |
| GET/POST | `/api/projects` | Elenco e creazione progetti |
| PUT/DELETE | `/api/projects/:id` | Modifica (anche solo stato), eliminazione |
| GET/POST | `/api/tasks` | Elenco e creazione task |
| PUT/DELETE | `/api/tasks/:id` | Modifica (anche solo stato), eliminazione |
| GET | `/api/dashboard` | Contatori e riepiloghi |
| GET | `/api/activities` | Registro attività |
| GET | `/api/notifications` | Scadenze entro 7 giorni e ritardi |

Tutte le rotte (tranne l'autenticazione) richiedono l'header `Authorization: Bearer <token>`.

## 🧪 Test

```bash
cd backend
npm test
```

Test con Jest e Supertest sull'autenticazione: registrazione, login corretto, login rifiutato con password errata.

## ☁️ Deploy

| Componente | Servizio | Note |
|---|---|---|
| Frontend | Vercel | root `frontend`, variabile `VITE_API_URL`, rewrite SPA in `vercel.json` |
| Backend | Render | root `backend`, start `npm start`, variabili `MONGODB_URI` e `JWT_SECRET` |
| Database | MongoDB Atlas | cluster M0 gratuito, accesso di rete aperto per Render |

La guida completa passo passo è in [docs/GUIDA-DEPLOY.md](docs/GUIDA-DEPLOY.md).

## 🤖 Uso dell'AI

Ho usato strumenti di AI come supporto per:

- inventare i dati demo (clienti, progetti e task di esempio)
- la brand identity del progetto (logo e palette colori — vedi [docs/BRAND.md](docs/BRAND.md))

## 🧗 Difficoltà incontrate

La parte più delicata è stata collegare bene le entità tra loro: un progetto appartiene a un cliente, un task appartiene a un progetto e tutti i dati devono appartenere all'utente loggato. Ho scelto modelli Mongoose separati, query sempre filtrate per utente e un middleware JWT unico per tenere il codice leggibile. Anche l'eliminazione a cascata (cliente → progetti → task) ha richiesto attenzione per non lasciare dati orfani nel database.

## 📚 Cosa ho imparato

Con questo progetto ho ripassato il flusso completo di una web app: creazione delle API, collegamento a MongoDB, autenticazione con token, protezione delle rotte, chiamate dal frontend, componenti React riutilizzabili (modali, menu, bacheca kanban con drag & drop) e un CSS responsive scritto interamente a mano. Ho capito quanto contano nomi chiari e file con responsabilità precise per poter spiegare il progetto durante una presentazione.

## 👤 Autore

**Emanuele Vaccaro** — Progetto Capstone del corso Web Developer

---

<div align="center">
<sub>Realizzato a scopo didattico · ClientFlow © 2026</sub>
</div>
