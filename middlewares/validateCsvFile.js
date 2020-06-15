const createDocument =  require("../utils/createDocument");
const {getBusiness} = require("../controllers")
const insertDocuments =   require("../utils/bulkInsert");
const header = require('../utils/rowHeader');
const moment = require('moment');

const validateHeader = (csvHeaderRow) => {
 return (JSON.stringify(csvHeaderRow)===JSON.stringify(header))
};

const validateCsvData = async (req, res, next) => {
  const business = await getBusiness({user: req.user._id})
  const csvData = req.csvRows;
  let currentRow = [];
  const documents = [];
  const validateHeaderRow = validateHeader(csvData[0])
  // remove headerRow
  csvData.splice(0, 1)
  if(!validateHeaderRow) {
    return res.status(400).json({error: "All header fields  are required", header})
  }
  csvData.forEach(row => {
    currentRow = row;
    const transactionDate = currentRow[3];
    const dueDate = currentRow[4];
    const verifyDateFormat = (moment(transactionDate, 'DD-MM-YYYY').isValid() &&
      moment(dueDate, 'DD-MM-YYYY').isValid());
    row.forEach(column => {
      if(column.length <= 0){
        return  res.status(400).json({error: "All columns entries are required"})
      }
      else if (!verifyDateFormat) {
        return res.status(400).json({error: "Use correct date format", format: 'MM-DD-YYYY'})
      }
    })
    const mongoDocument = createDocument(currentRow, business, req.user);
    documents.push(mongoDocument)
  })
  req.documents = documents;
  insertDocuments(documents)
  next();
};

module.exports = {
  validateHeader,
  validateCsvData
};
