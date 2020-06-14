const fs =  require("fs");
const parse =  require("csv-parse");
const createDocument =  require("./createDocument");
const insertDocuments =   require("./bulkInsert");

// Reads csv file and parses it
const parseCsv = (path, user, business) => {
  const documents = [];
  fs.createReadStream(path)
    .pipe(parse({delimiter: ':'}))
    .on('data', (csvRow) => {
      const formatedRow = csvRow[0].split(',');
      // creating mongo documents
      const mongoDocument = createDocument(formatedRow, business, user);
      documents.push(mongoDocument)
    })
    .on('end',function() {
      // remove header row
      documents.splice(0, 1);
      insertDocuments(documents)
    });
};
module.exports = parseCsv;
