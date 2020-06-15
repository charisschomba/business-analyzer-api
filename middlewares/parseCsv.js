const fs =  require("fs");
const parse =  require("csv-parse");

// Reads csv file and parses it
const parseCsv = async (req, res, next) => {
  const documents = [];
  const csvRows = []
  fs.createReadStream(req.filePath)
    .pipe(parse({delimiter: ':'}))
    .on('data', (csvRow) => {
      const formatedRow = csvRow[0].split(',');
      csvRows.push(formatedRow)
    })
    .on('end',function() {
      req.csvRows = csvRows
      next();
      return csvRows;
    });
};
module.exports = parseCsv;
