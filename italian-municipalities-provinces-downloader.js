const csvParse = require('csv-parse');
const fs = require('fs');
const https = require('https');
const objectsToCsv = require('objects-to-csv');

var italian_municipalities = [];
var italian_provinces = [];

var istat_permalink="https://www.istat.it/storage/codici-unita-amministrative/Elenco-comuni-italiani.csv";
var csv_path="Elenco-comuni-italiani.csv";

//Download csv from Istat permalink
//Scarica il csv dal permalink dell'Istat

https.get(istat_permalink, (res) => {
    
    const writeStream = fs.createWriteStream(csv_path);
    res.pipe(writeStream);

    writeStream.on("finish", () => {
        writeStream.close();

        //Read from csv only functional data: municipality name, province name and province code
        //Leggi dal csv solo i dati che interessano: nome del comune, nome delle province e sigle delle province

        fs.createReadStream(csv_path, 'latin1') //decodifica latin1 (ISO 8859), il csv dell'Istat non usa UTF-8
            .pipe(csvParse({delimiter: ';'}))
            .on('data', function(csvRow) {
                italian_municipalities.push(
                    {
                        name: csvRow[6],
                        province_name: csvRow[11],
                        province_code: csvRow[14]
                    }
                );

            })
            .on('end', function() {

                console.log("Download completed");

                fs.unlinkSync(csv_path); //Delete original istat csv //Elimina il csv scaricato dall'Istat

                italian_municipalities.splice(0, 1); //Delete header from italian_municipalities list //Elimina l'intestazione da italian_municipalities
                
                //Find provinces unique names in italian_municipalities
                //Trova nomi univoci delle province in italian_municipalities
                
                //The for cycle identifies the unique provinces names using the differences with the previous ones, so the province of the first element is inserted here
                //Il ciclo for identifica i nomi univoci delle province confrontandoli con quelli precedenti, quindi la provincia del primo elemento viene inserita qui
                italian_provinces.push({
                    code: italian_municipalities[0].province_code,
                    province_name: italian_municipalities[0].province_name
                })

                for(i=1; i<italian_municipalities.length; i++) { //Start from 1 to skip the header //Parte da 1 per saltare l'header
                    
                    if(italian_municipalities[i].province_code!==italian_municipalities[i-1].province_code) {

                        italian_provinces.push({        
                                code: italian_municipalities[i].province_code,
                                province_name: italian_municipalities[i].province_name
                        });
                    
                    }

                }

                italian_municipalities = italian_municipalities.map(({ province_name, ...item }) => item); //remove the province_name column leaving just the province code//rimuove la colonna province_name lasciando solo il province_code
                
                //Caution! The alphabetical order of municipalities has to be done at this point of the code, not before!
                //Attenzione! L'ordinamento alfabetico dei comuni deve necessariamente avvenire in questo punto del codice, non prima!
                italian_municipalities.sort((a, b) => a.name.toString().localeCompare(b.name)); //Order alphabetically the municipalities //Ordina alfabeticamente i comuni

                italian_provinces.sort((a, b) => a.code.toString().localeCompare(b.code)); //Order alphabetically the provinces codes //Ordina alfabeticamente i codici delle province
                
                // Save csv files:
                // Salva i file csv:

                (async () => {
                    const italian_municipalities_csv = new objectsToCsv(italian_municipalities);
                    const italian_provinces_csv = new objectsToCsv(italian_provinces);

                    await italian_provinces_csv.toDisk('./italian_provinces.csv', {bom: true}); //now using utf-8 and correctly display accented characters //adesso usa la codifica utf-8 e fa vedere correttamente le lettere accentate
                    console.log("italian_provinces.csv created");
                    await italian_municipalities_csv.toDisk('./italian_municipalities.csv', {bom: true});
                    console.log("italian_municipalities.csv created");
                  })();
            })

    })
});
