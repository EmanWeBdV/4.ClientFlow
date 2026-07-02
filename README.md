# ClientFlow

ClientFlow e una web app full stack pensata per freelance, piccoli team o agenzie che vogliono tenere ordinati clienti, progetti e task senza usare mille fogli Excel o note sparse.

Il progetto nasce come Capstone finale del corso web developer. L'obiettivo e mostrare una gestione completa di frontend, backend, database, autenticazione e prime verifiche con test.

## Problema che risolve

Quando si seguono piu clienti e facile perdere informazioni tra chat, email e documenti. ClientFlow raccoglie in un unico posto:

- clienti e informazioni di contatto
- progetti collegati ai clienti
- task collegati ai progetti
- dashboard con riepilogo dello stato del lavoro

## Funzionalita principali

- Registrazione e login con JWT
- Password criptata con bcrypt
- Rotte protette lato frontend e backend
- CRUD clienti
- CRUD progetti
- CRUD task
- Dashboard con conteggi e ultime attivita
- UI responsive con React, Vite e Bootstrap
- API REST con Express, MongoDB e Mongoose
- Test base backend con Jest e Supertest

## Tecnologie usate

Frontend:

- React
- Vite
- JavaScript
- Bootstrap
- React Router
- Axios

Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- CORS
- dotenv
- bcryptjs
- jsonwebtoken

Testing:

- Jest
- Supertest

Deploy previsto:

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Struttura cartelle

```text
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── app.js
│   │   └── server.js
│   └── tests
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
└── README.md
```

## Installazione backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Nel file `.env` inserire:

```env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clientflow
JWT_SECRET=una_chiave_segreta_lunga
```

La stringa `MONGODB_URI` deve essere sostituita con quella reale di MongoDB Atlas. Se si lascia il valore di esempio con `cluster.mongodb.net`, il server parte ma MongoDB restituisce un errore simile a:

```text
querySrv ENOTFOUND _mongodb._tcp.cluster.mongodb.net
```

Per lavorare in locale senza Atlas, se MongoDB e installato sul computer, si puo usare:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/clientflow
```

## Installazione frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Nel file `.env` inserire:

```env
VITE_API_URL=http://localhost:5001/api
```

## API principali

Autenticazione:

- `POST /api/auth/register`
- `POST /api/auth/login`

Clienti:

- `GET /api/clients`
- `GET /api/clients/:id`
- `POST /api/clients`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id`

Progetti:

- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

Task:

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

Dashboard:

- `GET /api/dashboard`

## Screenshot

Inserire qui gli screenshot dopo il deploy o dopo l'avvio locale:

- `docs/screenshots/login.png`
- `docs/screenshots/dashboard.png`
- `docs/screenshots/clienti.png`
- `docs/screenshots/progetti.png`
- `docs/screenshots/task.png`

## Link deploy

- Frontend Vercel: `https://clientflow.vercel.app`
- Backend Render: `https://clientflow-api.onrender.com`

## Test

Dal backend:

```bash
npm test
```

## Difficolta incontrate

La parte piu importante e stata collegare bene le entita tra loro: un progetto appartiene a un cliente, un task appartiene a un progetto e tutti i dati devono appartenere all'utente loggato. Ho scelto una struttura semplice con modelli Mongoose separati e middleware JWT per tenere il codice leggibile.

## Cosa migliorerei in futuro

- Aggiungere filtri e ricerca nelle liste
- Aggiungere una pagina dettaglio piu completa per ogni cliente
- Migliorare la gestione degli errori lato frontend
- Aggiungere test anche per clienti, progetti e task
- Inserire upload di documenti o allegati per i progetti

## Cosa ho imparato

Con questo progetto ho ripassato il flusso completo di una web app: creazione delle API, collegamento a MongoDB, autenticazione con token, protezione delle rotte, chiamate dal frontend e organizzazione di componenti React riutilizzabili. Ho capito meglio anche quanto sia importante mantenere nomi chiari e file con responsabilita precise, per poter spiegare il progetto durante una presentazione.
