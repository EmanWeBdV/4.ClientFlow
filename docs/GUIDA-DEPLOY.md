# Guida passo passo: database, registrazioni e deploy

Ordine consigliato: prima il database, poi la prova in locale, poi i due deploy.

---

## 1. MongoDB Atlas (database)

1. Vai su https://www.mongodb.com/cloud/atlas/register e registrati (va bene anche l'accesso con Google).
2. Alla creazione del cluster scegli **M0 Free**, provider e regione qualsiasi (es. AWS / Francoforte), e dai un nome al cluster (es. `clientflow`).
3. Quando ti chiede di creare un utente database: scegli username e password. **Salva la password**, ti serve subito. Usa una password senza caratteri strani (solo lettere e numeri) per evitare problemi nella stringa di connessione.
4. Vai su **Network Access** (menu a sinistra) → **Add IP Address** → **Allow access from anywhere** (0.0.0.0/0). Serve perché Render si connette da IP variabili.
5. Vai su **Database** → bottone **Connect** sul cluster → **Drivers** → copia la stringa di connessione. Sarà tipo:
   ```
   mongodb+srv://user:password@clientflow.uvrpsuw.mongodb.net/?appName=clientflow
   ```
6. Sostituisci `<password>` con la password vera e aggiungi il nome del database `clientflow` dopo lo `/`:
   ```
   mongodb+srv://tuoutente:lapassword@clientflow.xxxxx.mongodb.net/clientflow?retryWrites=true&w=majority
   ```

## 2. Configurare il backend in locale

Apri `backend/.env` e metti:

```env
PORT=5001
MONGODB_URI=<la stringa di Atlas del punto 1.6>
JWT_SECRET=<una stringa lunga e casuale>
```

Per generare un JWT_SECRET casuale puoi usare nel terminale:

```bash
openssl rand -hex 32
```

## 3. Prova in locale

Terminale 1:

```bash
cd backend
npm run dev
```

Devi vedere `MongoDB connesso` e `Server avviato sulla porta 5001`. Se vedi un errore di connessione, controlla la stringa (password, nome db) e il Network Access su Atlas.

Terminale 2:

```bash
cd frontend
npm run dev
```

Apri http://localhost:5173, registra un utente, crea un cliente, un progetto e un task. Prova anche a restringere la finestra per verificare il responsive. **Fai gli screenshot qui** per il README e per il video (cartella `docs/screenshots/`).

## 4. Push su GitHub

Il repo è già collegato a GitHub. Committa le modifiche e pusha:

```bash
git add .
git commit -m "css scritto a mano senza bootstrap, config vite e vercel"
git push
```

## 5. Deploy backend su Render

1. Vai su https://render.com e registrati **con l'account GitHub** (così vede i tuoi repo).
2. Dashboard → **New** → **Web Service** → seleziona il repo `4.ClientFlow`.
3. Impostazioni:
   - **Name**: `clientflow-api` (o simile)
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
4. Sezione **Environment Variables**, aggiungi:
   - `MONGODB_URI` = la stringa di Atlas
   - `JWT_SECRET` = lo stesso segreto (o uno nuovo, ma poi i login locali non valgono online — non è un problema)
5. **Create Web Service** e aspetta il deploy. Alla fine avrai un URL tipo `https://clientflow-api.onrender.com`.
6. Verifica aprendo quell'URL nel browser: devi vedere `{"message":"ClientFlow API online"}`.

Nota: sul piano Free, Render "addormenta" il servizio dopo 15 minuti di inattività; la prima richiesta dopo una pausa può metterci 30-60 secondi. Prima di registrare il video, apri l'URL dell'API per svegliarla.

## 6. Deploy frontend su Vercel

1. Vai su https://vercel.com e registrati **con l'account GitHub**.
2. **Add New** → **Project** → importa il repo `4.ClientFlow`.
3. Impostazioni:
   - **Root Directory**: `frontend` (clicca Edit e selezionala)
   - Framework: Vite (lo rileva da solo)
4. Sezione **Environment Variables**, aggiungi:
   - `VITE_API_URL` = `https://clientflow-api.onrender.com/api` (l'URL di Render del punto 5 + `/api`)
5. **Deploy**. Alla fine avrai un URL tipo `https://clientflow-xxx.vercel.app`.
6. Il file `frontend/vercel.json` (già nel repo) gestisce le rotte di React Router: ricaricando `/clients` non avrai 404.

## 7. Verifica finale

1. Apri l'URL Vercel, registra un utente nuovo e rifai il giro completo (cliente → progetto → task → dashboard).
2. Aggiorna nel `README.md` la sezione "Link deploy" con gli URL veri di Vercel e Render.
3. Aggiungi gli screenshot in `docs/screenshots/` e committa.

## Problemi comuni

- **Errore CORS o "Network Error" dal frontend online**: quasi sempre `VITE_API_URL` sbagliata (manca `/api` finale) oppure il backend Render è addormentato — riprova dopo un minuto.
- **`querySrv ENOTFOUND`** all'avvio del backend: stringa Atlas sbagliata o placeholder.
- **Login che non funziona dopo il deploy**: controlla che `JWT_SECRET` sia impostato su Render.
- Le variabili `VITE_*` vengono lette **al momento della build**: se cambi `VITE_API_URL` su Vercel devi fare un **Redeploy**.
