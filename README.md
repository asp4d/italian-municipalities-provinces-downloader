# Italian municipalities and provinces downloader

A nodejs script to download updated csv of Italian cities and provinces.

This script generates two csv files:

- A csv containing a list of Italian provinces with full names and province codes
- A csv containing a list of Italian municipalities with full names and the respective province codes

These two files are generated using a permalink from [Italian National Institute of Statistics (Istat)](https://en.wikipedia.org/wiki/Italian_National_Institute_of_Statistics) containing the "official" list of Italian municipalities and a lot of other unnecessary information.

------

## Installation

Nodejs has to be installed on your PC, if you have not yet installed Nodejs, follow [this guide](https://nodejs.org/en/download).

Then run the following commands:

```bash
git clone
cd italian-municipalities-provinces-downloader
npm install
```

------

## Running

Simply launch:

```bash
npm start
```

to run the script.
