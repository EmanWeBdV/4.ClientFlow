# Copione per il video di presentazione

Da leggere mentre mostri l'app sullo schermo. Tra parentesi quadre trovi [cosa mostrare in quel momento]. Durata stimata: 6-7 minuti a ritmo tranquillo.

---

## 1. Introduzione (30 secondi)

[Mostra la pagina di login con il logo]

Ciao, sono Emanuele e questo è ClientFlow, il mio progetto Capstone. ClientFlow è una web app full stack pensata per freelance e piccoli team che seguono più clienti contemporaneamente. Il problema che risolve è semplice: quando lavori con tanti clienti, le informazioni si perdono tra email, chat e fogli di calcolo. ClientFlow raccoglie tutto in un unico posto: i clienti, i progetti collegati a ogni cliente, e i task collegati a ogni progetto.

## 2. Tecnologie e brand (30 secondi)

[Resta sul login, indica logo e grafica]

Il progetto è diviso in due parti. Il frontend è fatto con React e Vite, con React Router per la navigazione e Axios per le chiamate API. Lo stile è CSS scritto interamente a mano, senza framework: griglie, componenti e responsive sono fatti con CSS Grid, Flexbox e media query. Anche il progetto ha una sua brand identity: logo, palette colori e tipografia dedicate. Il backend è un'API REST costruita con Node ed Express, con MongoDB come database attraverso Mongoose. L'autenticazione usa JSON Web Token e le password sono criptate con bcrypt.

## 3. Registrazione e login (45 secondi)

[Vai su "Registrati", mostra i campi e l'occhio che mostra la password]

Un nuovo utente si registra con nome, email e password: la password va inserita due volte per conferma, e con l'icona a occhio posso controllare cosa sto scrivendo. Quando invio il form, il backend verifica che l'email non sia già usata e cripta la password con bcrypt, quindi nel database non viene mai salvata in chiaro. [Mostra la schermata di conferma] Dopo la registrazione l'app mi avvisa che non è prevista una email di conferma e che posso accedere subito con le credenziali appena create. [Fai il login] Al login ricevo un token JWT che il frontend invia automaticamente in ogni chiamata grazie a un interceptor di Axios. Tutte le pagine interne sono protette, e la stessa protezione c'è anche lato server su ogni rotta dell'API.

## 4. Dashboard (40 secondi)

[Sei sulla dashboard]

Questa è la dashboard. In alto tre contatori con le icone: clienti totali, progetti attivi e task ancora aperti — sono cliccabili e portano alle rispettive sezioni. Sotto, i task in scadenza nei prossimi sette giorni con priorità e data, e gli ultimi clienti e progetti inseriti. [Clicca la campanella in alto] In alto c'è anche il centro notifiche: mi segnala i progetti e i task in scadenza nei prossimi giorni e quelli già in ritardo.

## 5. Clienti (45 secondi)

[Vai su "Clienti"]

Nella pagina Clienti ho l'elenco completo con ricerca e filtro per stato. [Scrivi qualcosa nella ricerca, poi filtra per stato] Con il pulsante "Aggiungi cliente" si apre una finestra modale dove inserisco nome, contatti, stato e note. [Crea un cliente] Su ogni riga ho un menu con tre puntini: dettaglio, modifica — che riapre la stessa modale con i dati già compilati — ed elimina, che chiede una conferma esplicita perché cancella anche i progetti e i task collegati. [Apri il dettaglio di un cliente] La pagina di dettaglio mostra le informazioni del cliente e i suoi progetti. Ogni dato appartiene solo all'utente loggato: tutte le query filtrano per l'id dell'utente.

## 6. Progetti con kanban (1 minuto)

[Vai su "Progetti"]

I progetti sono organizzati in una bacheca kanban con quattro colonne: da iniziare, attivo, in revisione e completato. [Trascina una card da una colonna all'altra] Posso trascinare una card da una colonna all'altra e lo stato si aggiorna direttamente nel database; in alternativa c'è il selettore di stato sulla card, comodo da mobile. Ogni progetto ha il cliente, la data di scadenza in evidenza e il menu con modifica ed elimina con conferma. [Apri "Aggiungi progetto"] Nella modale di creazione i campi sono tutti etichettati, comprese la data di inizio e la scadenza. Sopra la bacheca ci sono la ricerca per titolo o cliente e il filtro per cliente.

## 7. Task (30 secondi)

[Vai su "Task"]

I task funzionano allo stesso modo: ricerca, filtri per stato e priorità, creazione e modifica in modale. La cosa più comoda è il selettore di stato direttamente nella tabella: segno una task come "in corso" o "completata" al volo, senza aprire nulla. [Cambia stato a una task]

## 8. Attività e notifiche (30 secondi)

[Vai su "Attività"]

Ogni azione che ho fatto finora è stata registrata automaticamente: la pagina Attività è il registro dello spazio di lavoro, con data e ora di ogni creazione, modifica, eliminazione e cambio di stato. È il backend che scrive il log a ogni operazione, quindi niente può sfuggire.

## 9. Responsive (30 secondi)

[Restringi la finestra o usa i dev tools in modalità mobile]

L'interfaccia è completamente responsive, con CSS scritto a mano. Su mobile la sidebar diventa un menu hamburger che scorre da sinistra, le griglie si impilano, la bacheca kanban si scorre in orizzontale e le tabelle restano leggibili. [Apri e chiudi l'hamburger, trascina il kanban] Tutto gestito con media query, senza framework CSS.

## 10. Codice e test (45 secondi)

[Mostra l'editor: cartella backend, file dei test, poi lancia npm test]

Due parole sul codice. Il backend è organizzato per responsabilità: i modelli Mongoose definiscono i dati — Utente, Cliente, Progetto, Task e Attività — le rotte gestiscono le operazioni CRUD, un middleware verifica il token JWT e una utility scrive il log delle attività. Ho scritto anche dei test con Jest e Supertest sulla parte più delicata, l'autenticazione: registrazione, login corretto e rifiuto di un login con password sbagliata. [Lancia npm test e mostra i 3 test verdi]

## 11. Chiusura (30 secondi)

[Torna sull'app, sulla dashboard]

Per concludere: il progetto è deployato con il frontend su Vercel, il backend su Render e il database su MongoDB Atlas. Una nota sulla trasparenza: ho usato strumenti di AI come supporto per inventare i dati demo — i clienti, i progetti e i task di esempio che avete visto — e per la brand identity del progetto, cioè il logo e la palette dei colori. Con questo progetto ho messo insieme tutto il percorso: API REST, autenticazione con token, database con relazioni tra entità, e un frontend React con rotte protette, componenti riutilizzabili e stile scritto a mano. Grazie per l'attenzione.

---

## Promemoria prima di registrare

1. Sveglia il backend su Render aprendo l'URL dell'API un minuto prima (il piano gratuito lo addormenta).
2. I dati demo sono già nel database: accedi con il tuo account e trovi clienti, progetti e task pronti.
3. Tieni pronti: browser sull'app, editor con il progetto aperto, terminale nella cartella backend per `npm test`.
4. Se qualcosa non carica subito durante il video, è quasi sempre Render che si sta svegliando: aspetta qualche secondo e ricarica.
