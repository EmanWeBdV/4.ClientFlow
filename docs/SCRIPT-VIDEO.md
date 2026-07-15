# Copione per il video di presentazione

Da leggere mentre mostri l'app sullo schermo. Tra parentesi quadre trovi [cosa mostrare in quel momento]. Durata stimata: 5-6 minuti a ritmo tranquillo.

---

## 1. Introduzione (30 secondi)

[Mostra la pagina di login]

Ciao, sono Emanuele e questo è ClientFlow, il mio progetto Capstone. ClientFlow è una web app full stack pensata per freelance e piccoli team che seguono più clienti contemporaneamente. Il problema che risolve è semplice: quando lavori con tanti clienti, le informazioni si perdono tra email, chat e fogli di calcolo. ClientFlow raccoglie tutto in un unico posto: i clienti, i progetti collegati a ogni cliente, e i task collegati a ogni progetto.

## 2. Tecnologie (30 secondi)

[Resta sulla pagina di login, oppure mostra velocemente l'editor con la struttura delle cartelle]

Il progetto è diviso in due parti. Il frontend è fatto con React e Vite, con React Router per la navigazione e Axios per le chiamate API. Lo stile è CSS scritto interamente a mano, senza framework: il responsive è gestito con CSS Grid, Flexbox e media query. Il backend è un'API REST costruita con Node ed Express, con MongoDB come database attraverso Mongoose. L'autenticazione usa JSON Web Token e le password sono criptate con bcrypt.

## 3. Registrazione e login (45 secondi)

[Vai su "Registrati", compila il form e crea un account]

Partiamo dall'inizio: un nuovo utente si registra con nome, email e password. Quando invio il form, il backend controlla che l'email non sia già usata, cripta la password con bcrypt — quindi nel database non viene mai salvata in chiaro — e mi restituisce un token JWT. Il frontend salva il token e lo invia automaticamente in ogni chiamata successiva, grazie a un interceptor di Axios. Tutte le pagine interne sono protette: se provo ad aprirle senza essere loggato, vengo rimandato al login. E la stessa protezione c'è anche lato server: ogni rotta dell'API verifica il token prima di rispondere.

## 4. Dashboard (30 secondi)

[Sei sulla dashboard dopo la registrazione]

Questa è la dashboard. In alto ci sono tre contatori: clienti totali, progetti attivi e task ancora aperti. Sotto, a sinistra, i task in scadenza nei prossimi sette giorni, e a destra gli ultimi clienti e progetti inseriti. Ora è vuota perché l'account è nuovo, quindi riempiamola.

## 5. Clienti (1 minuto)

[Vai su "Clienti", crea un cliente con il form a sinistra]

Nella pagina Clienti ho un form per inserire un nuovo cliente: nome, email, telefono, uno stato — ad esempio Nuovo, Attivo o In pausa — e delle note libere. [Crea il cliente] Il cliente appare subito nella tabella. Da qui posso modificarlo, eliminarlo, o aprire la pagina di dettaglio.

[Clicca "Dettaglio"]

La pagina di dettaglio mostra tutte le informazioni del cliente e, sotto, i progetti collegati a lui. Ogni dato appartiene solo all'utente loggato: nell'API tutte le query filtrano per l'id dell'utente, quindi un altro account non può vedere i miei clienti.

## 6. Progetti e task (1 minuto)

[Vai su "Progetti", crea un progetto scegliendo il cliente dal menu]

Ora creo un progetto: titolo, il cliente a cui appartiene — scelto da un menu a tendina — uno stato, le date di inizio e scadenza e una descrizione. [Crea il progetto] Il progetto compare come card, con il badge colorato dello stato e il nome del cliente.

[Vai su "Task", crea un task scegliendo il progetto]

Lo stesso vale per i task: ogni task è collegato a un progetto, ha una priorità — bassa, media o alta — uno stato e una scadenza. [Crea il task]

[Torna sulla Dashboard]

Se torno sulla dashboard, i contatori si sono aggiornati e il task appena creato appare tra le scadenze della settimana. C'è anche una logica di eliminazione a cascata: se elimino un cliente, vengono eliminati anche i suoi progetti e i task collegati, per non lasciare dati orfani nel database.

## 7. Responsive (30 secondi)

[Restringi la finestra del browser o apri i dev tools in modalità mobile]

L'interfaccia è completamente responsive, con CSS scritto a mano. Su schermi piccoli la sidebar diventa una barra orizzontale in alto, le griglie a più colonne si impilano su una colonna sola e le tabelle si possono scorrere in orizzontale. Tutto questo è gestito con media query, senza nessun framework CSS.

## 8. Codice e test (45 secondi)

[Mostra l'editor: prima la cartella backend, poi il file dei test, poi lancia npm test]

Due parole sul codice. Il backend è organizzato per responsabilità: i modelli Mongoose definiscono i dati — Utente, Cliente, Progetto e Task — le rotte gestiscono le operazioni CRUD, e un middleware verifica il token JWT su tutte le rotte protette. Ho scritto anche dei test con Jest e Supertest sulla parte più delicata, l'autenticazione: verificano la registrazione, il login corretto e il rifiuto di un login con password sbagliata. [Lancia npm test e mostra i 3 test verdi]

## 9. Chiusura (30 secondi)

[Torna sull'app, sulla dashboard]

Per concludere: il progetto è deployato con il frontend su Vercel, il backend su Render e il database su MongoDB Atlas. Con questo progetto ho messo insieme tutto il percorso: la costruzione di un'API REST, l'autenticazione con token, un database con relazioni tra le entità, e un frontend React con rotte protette e stile scritto a mano. Tra le cose che vorrei aggiungere in futuro: filtri e ricerca nelle liste, più test e l'upload di documenti per i progetti. Grazie per l'attenzione.

---

## Promemoria prima di registrare

1. Sveglia il backend su Render aprendo l'URL dell'API un minuto prima (il piano gratuito lo addormenta).
2. Usa un account demo pulito, oppure preparane uno con 2-3 clienti già inseriti se non vuoi partire da zero.
3. Tieni pronti: browser sull'app, editor con il progetto aperto, terminale nella cartella backend per `npm test`.
4. Se qualcosa non carica subito durante il video, è quasi sempre Render che si sta svegliando: aspetta qualche secondo e ricarica.
