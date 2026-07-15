// Popola il database con dati demo realistici per un utente esistente.
// Uso: node src/seed.js email@utente.it  (aggiungere --force se esistono gia clienti)
require('dotenv').config();

const mongoose = require('mongoose');
const User = require('./models/User');
const Client = require('./models/Client');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Activity = require('./models/Activity');

const daysFromNow = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(12, 0, 0, 0);
  return date;
};

const run = async () => {
  const email = process.argv[2];
  const force = process.argv.includes('--force');

  if (!email) {
    console.log('Uso: node src/seed.js email@utente.it [--force]');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connesso');

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    console.log(`Utente ${email} non trovato: registrati prima sull'app, poi rilancia il seed.`);
    process.exit(1);
  }

  const existing = await Client.countDocuments({ user: user._id });
  if (existing > 0 && !force) {
    console.log(`L'utente ha gia ${existing} clienti. Rilancia con --force per aggiungere comunque i dati demo.`);
    process.exit(1);
  }

  const clientsData = [
    { name: 'Studio Legale Ferri', email: 'info@studioferri.it', phone: '02 5566 7788', status: 'Attivo', notes: 'Studio con tre sedi, referente Avv. Ferri. Preferisce aggiornamenti via email.' },
    { name: 'Pasticceria Dolce Vita', email: 'ordini@dolcevitapasticceria.it', phone: '331 204 5566', status: 'Attivo', notes: 'Vogliono spingere le vendite online per le feste.' },
    { name: 'GreenTech Impianti', email: 'amministrazione@greentechimpianti.it', phone: '045 880 1122', status: 'Attivo', notes: 'Installatori fotovoltaico, molto attenti ai preventivi.' },
    { name: 'Palestra UrbanFit', email: 'info@urbanfit.club', phone: '347 990 2211', status: 'Nuovo', notes: 'Nuova apertura a settembre, primo contatto in fiera.' },
    { name: 'Agriturismo Le Querce', email: 'prenotazioni@lequerce.farm', phone: '0575 66 44 21', status: 'Attivo', notes: 'Stagionalita forte: alta stagione da aprile a ottobre.' },
    { name: 'TecnoRicambi SRL', email: 'acquisti@tecnoricambi.com', phone: '011 774 5590', status: 'In pausa', notes: 'Progetto e-commerce in pausa fino a nuovo budget.' },
    { name: 'Fotografa Elisa Conti', email: 'ciao@elisaconti.photo', phone: '340 118 7743', status: 'Nuovo', notes: 'Portfolio da rifare, molto orientata a Instagram.' },
    { name: 'Osteria Del Borgo', email: 'osteriadelborgo@gmail.com', phone: '06 4433 2109', status: 'Chiuso', notes: 'Collaborazione conclusa nel 2025, possibile ritorno per il menu digitale.' }
  ];

  const clients = {};
  for (const data of clientsData) {
    const client = await Client.create({ ...data, user: user._id });
    clients[data.name] = client;
    await Activity.create({
      user: user._id,
      entityType: 'cliente',
      action: 'creato',
      description: `Creato cliente «${client.name}»`,
      createdAt: daysFromNow(-30 + Math.floor(Math.random() * 10))
    });
  }
  console.log(`Creati ${clientsData.length} clienti`);

  const projectsData = [
    { title: 'Sito web Studio Ferri', client: 'Studio Legale Ferri', status: 'Attivo', startDate: -25, dueDate: 12, description: 'Nuovo sito vetrina con area news e modulo contatti.' },
    { title: 'Brand identity Dolce Vita', client: 'Pasticceria Dolce Vita', status: 'In revisione', startDate: -40, dueDate: 3, description: 'Logo, palette e materiali stampa per la pasticceria.' },
    { title: 'E-commerce torte su ordinazione', client: 'Pasticceria Dolce Vita', status: 'Da iniziare', startDate: 10, dueDate: 60, description: 'Shop online con ordini personalizzati e ritiro in negozio.' },
    { title: 'Landing page fotovoltaico', client: 'GreenTech Impianti', status: 'Attivo', startDate: -10, dueDate: 5, description: 'Landing con simulatore di risparmio e richiesta preventivo.' },
    { title: 'Gestionale preventivi interno', client: 'GreenTech Impianti', status: 'Da iniziare', startDate: 20, dueDate: 90, description: 'Analisi per un piccolo gestionale interno dei preventivi.' },
    { title: 'Sito e prenotazioni UrbanFit', client: 'Palestra UrbanFit', status: 'Da iniziare', startDate: 5, dueDate: 45, description: 'Sito con orari corsi e prenotazione lezioni di prova.' },
    { title: 'Restyling sito Le Querce', client: 'Agriturismo Le Querce', status: 'Attivo', startDate: -20, dueDate: -2, description: 'Restyling completo con galleria camere e richiesta disponibilita.' },
    { title: 'Campagna social estate', client: 'Agriturismo Le Querce', status: 'In revisione', startDate: -15, dueDate: 8, description: 'Piano editoriale luglio-agosto con contenuti foto e reel.' },
    { title: 'Portfolio Elisa Conti', client: 'Fotografa Elisa Conti', status: 'Attivo', startDate: -5, dueDate: 25, description: 'Portfolio one-page con gallerie per matrimoni e ritratti.' },
    { title: 'Catalogo ricambi PDF', client: 'TecnoRicambi SRL', status: 'Completato', startDate: -90, dueDate: -30, description: 'Catalogo sfogliabile generato dal listino Excel.' },
    { title: 'Menu digitale QR', client: 'Osteria Del Borgo', status: 'Completato', startDate: -120, dueDate: -75, description: 'Menu consultabile da QR code con gestione allergeni.' },
    { title: 'Newsletter mensile Studio Ferri', client: 'Studio Legale Ferri', status: 'In revisione', startDate: -8, dueDate: 15, description: 'Template newsletter e primo numero di prova.' }
  ];

  const projects = {};
  for (const data of projectsData) {
    const project = await Project.create({
      title: data.title,
      description: data.description,
      client: clients[data.client]._id,
      status: data.status,
      startDate: daysFromNow(data.startDate),
      dueDate: daysFromNow(data.dueDate),
      user: user._id
    });
    projects[data.title] = project;
    await Activity.create({
      user: user._id,
      entityType: 'progetto',
      action: 'creato',
      description: `Creato progetto «${project.title}»`,
      createdAt: daysFromNow(-20 + Math.floor(Math.random() * 12))
    });
  }
  console.log(`Creati ${projectsData.length} progetti`);

  const tasksData = [
    { title: 'Raccolta contenuti e foto studio', project: 'Sito web Studio Ferri', status: 'Completata', priority: 'Media', dueDate: -12 },
    { title: 'Wireframe homepage e pagina team', project: 'Sito web Studio Ferri', status: 'Completata', priority: 'Alta', dueDate: -6 },
    { title: 'Sviluppo template news', project: 'Sito web Studio Ferri', status: 'In corso', priority: 'Alta', dueDate: 4 },
    { title: 'Modulo contatti con privacy', project: 'Sito web Studio Ferri', status: 'Da fare', priority: 'Media', dueDate: 9 },
    { title: 'Presentare tre proposte di logo', project: 'Brand identity Dolce Vita', status: 'Completata', priority: 'Alta', dueDate: -15 },
    { title: 'Correzioni palette dopo feedback', project: 'Brand identity Dolce Vita', status: 'In corso', priority: 'Alta', dueDate: 2 },
    { title: 'File stampa biglietti e box torte', project: 'Brand identity Dolce Vita', status: 'Da fare', priority: 'Media', dueDate: 6 },
    { title: 'Analisi prodotti e varianti', project: 'E-commerce torte su ordinazione', status: 'Da fare', priority: 'Media', dueDate: 18 },
    { title: 'Testi landing e claim risparmio', project: 'Landing page fotovoltaico', status: 'In corso', priority: 'Alta', dueDate: 1 },
    { title: 'Simulatore risparmio bolletta', project: 'Landing page fotovoltaico', status: 'In corso', priority: 'Alta', dueDate: 3 },
    { title: 'Collegare modulo preventivi al CRM', project: 'Landing page fotovoltaico', status: 'Da fare', priority: 'Media', dueDate: 5 },
    { title: 'Call di kickoff con UrbanFit', project: 'Sito e prenotazioni UrbanFit', status: 'Da fare', priority: 'Media', dueDate: 7 },
    { title: 'Nuove foto camere e giardino', project: 'Restyling sito Le Querce', status: 'Completata', priority: 'Media', dueDate: -8 },
    { title: 'Pagina richiesta disponibilita', project: 'Restyling sito Le Querce', status: 'In corso', priority: 'Alta', dueDate: -1 },
    { title: 'Test mobile e correzioni finali', project: 'Restyling sito Le Querce', status: 'Da fare', priority: 'Alta', dueDate: 2 },
    { title: 'Scatti piatti estivi', project: 'Campagna social estate', status: 'Completata', priority: 'Media', dueDate: -5 },
    { title: 'Calendario contenuti agosto', project: 'Campagna social estate', status: 'In corso', priority: 'Media', dueDate: 6 },
    { title: 'Selezione 40 foto portfolio', project: 'Portfolio Elisa Conti', status: 'In corso', priority: 'Media', dueDate: 10 },
    { title: 'Sezione matrimoni con storie', project: 'Portfolio Elisa Conti', status: 'Da fare', priority: 'Bassa', dueDate: 16 },
    { title: 'Ottimizzare immagini gallerie', project: 'Portfolio Elisa Conti', status: 'Da fare', priority: 'Bassa', dueDate: 20 },
    { title: 'Impaginazione capitoli catalogo', project: 'Catalogo ricambi PDF', status: 'Completata', priority: 'Media', dueDate: -45 },
    { title: 'Consegna file definitivi', project: 'Catalogo ricambi PDF', status: 'Completata', priority: 'Alta', dueDate: -32 },
    { title: 'Caricamento menu e allergeni', project: 'Menu digitale QR', status: 'Completata', priority: 'Media', dueDate: -80 },
    { title: 'Bozza template newsletter', project: 'Newsletter mensile Studio Ferri', status: 'In corso', priority: 'Media', dueDate: 5 },
    { title: 'Numero zero da far approvare', project: 'Newsletter mensile Studio Ferri', status: 'Da fare', priority: 'Media', dueDate: 12 }
  ];

  for (const data of tasksData) {
    const task = await Task.create({
      title: data.title,
      project: projects[data.project]._id,
      status: data.status,
      priority: data.priority,
      dueDate: daysFromNow(data.dueDate),
      user: user._id
    });
    await Activity.create({
      user: user._id,
      entityType: 'task',
      action: 'creato',
      description: `Creato task «${task.title}»`,
      createdAt: daysFromNow(-15 + Math.floor(Math.random() * 14))
    });
  }
  console.log(`Creati ${tasksData.length} task`);

  console.log('Seed completato.');
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error('Errore seed:', error.message);
  process.exit(1);
});
