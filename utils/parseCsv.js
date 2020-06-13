import fs from "fs";
import parse from "csv-parse";
import createDocument from "./createDocument";
import insertDocuments from "./bulkInsert";

const parseCsv = (path, user, business) => {
  const documents = [];
  fs.createReadStream(path)
    .pipe(parse({delimiter: ':'}))
    .on('data', (csvRow) => {
      const formatedRow = csvRow[0].split(',');
      const mongoDocument = createDocument(formatedRow, business, user);
      documents.push(mongoDocument)
    })
    .on('end',function() {
      // remove header row
      documents.splice(0, 1);
      // console.log(documents)
      insertDocuments(documents)
    });
};
export default parseCsv;
