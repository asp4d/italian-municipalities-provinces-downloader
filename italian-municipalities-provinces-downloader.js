const csvParse = require('csv-parse/sync');
const fs = require('fs');
const https = require('https');
const objectsToCsv = require('objects-to-csv');

let italian_municipalities = [];
let italian_provinces = [];

const istat_permalink = "https://www.istat.it/storage/codici-unita-amministrative/Elenco-comuni-italiani.csv";
const csv_path = "Elenco-comuni-italiani.csv";

// Download csv from Istat permalink
https.get(istat_permalink, (res) => {
  const writeStream = fs.createWriteStream(csv_path);
  res.pipe(writeStream);

  writeStream.on("finish", () => {
    writeStream.close();

    // Read from csv only functional data: municipality name, province name and province code
    const csvData = fs.readFileSync(csv_path, 'latin1'); // decodifica latin1 (ISO 8859), il csv dell' Istat non usa UTF-8
    const records = csvParse.parse(csvData, { delimiter: ';' });

    records.forEach((csvRow, index) => {
      if (index > 0) { // Skip header
        italian_municipalities.push({
          name: csvRow[6],
          province_name: csvRow[11],
          province_code: csvRow[14]
        });
      }
    });

    console.log("Download completed");

    fs.unlinkSync(csv_path); // Delete original istat csv

    // Find provinces unique names in italian_municipalities
    italian_provinces.push({
      code: italian_municipalities[0].province_code,
      province_name: italian_municipalities[0].province_name
    });

    for (let i = 1; i < italian_municipalities.length; i++) {
      if (italian_municipalities[i].province_code !== italian_municipalities[i - 1].province_code) {
        italian_provinces.push({
          code: italian_municipalities[i].province_code,
          province_name: italian_municipalities[i].province_name
        });
      }
    }

    italian_municipalities = italian_municipalities.map(({ province_name, ...item }) => item); // remove the province_name column leaving just the province code

    // Order alphabetically the municipalities
    italian_municipalities.sort((a, b) => a.name.toString().localeCompare(b.name));

    // Order alphabetically the provinces codes
    italian_provinces.sort((a, b) => a.code.toString().localeCompare(b.code));

    // Save csv files
    (async () => {
      const italian_municipalities_csv = new objectsToCsv(italian_municipalities);
      const italian_provinces_csv = new objectsToCsv(italian_provinces);

      await italian_provinces_csv.toDisk('./italian_provinces.csv', { bom: true }); // now using utf-8 and correctly display accented characters
      console.log("italian_provinces.csv created");
      await italian_municipalities_csv.toDisk('./italian_municipalities.csv', { bom: true });
      console.log("italian_municipalities.csv created");
    })();
  });
});