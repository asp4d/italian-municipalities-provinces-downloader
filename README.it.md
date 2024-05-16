# Downloader di comuni e province italiane

Uno script nodejs per scaricare csv aggiornati con la lista dei comuni e delle province italiane.

Questo script genera due file csv:

- Un csv contenente una  lista delle privince italiane col loro nome per intero e le sigle delle province
- Un csv contenente una lista dei comuni italiani col loro nome per intero e le sigle delle province di cui fanno parte

Questi due file sono generati usando un link permanente dell' [Istituto nazionale di statistica (Istat)](https://it.wikipedia.org/wiki/Istituto_nazionale_di_statistica) contenente la lista "ufficiale" dei comuni italiani con un sacco di altre informazioni non necessarie.

------

## Installazione

Bisogna aver installato Nodejs, se non avete installato ancora Nodejs, seguite [questa guida](https://nodejs.dev/learn/how-to-install-nodejs)

Poi lanciate i seguenti comandi:

```bash
git clone
cd italian-municipalities-provinces-downloader
npm install
```

------

## Esecuzione

Lanciate semplicemente:

```bash
npm start
```

per eseguire lo script.
