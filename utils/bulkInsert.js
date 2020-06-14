const Order = require("../models/Order");
const Bill = require("../models/Bill");
const BillPayment = require("../models/BillPayment");
const OrderPayment = require("../models/OrderPayment");

// inserts to a specific table  depending on transaction type
const insertToTable = (type, mongoDocument) => {
  switch (type) {
    case "Order":
      new Order(mongoDocument).save();
      break;
    case "Bill":
      new Bill(mongoDocument).save();
      break;
    case "Bill Payment":
      new BillPayment(mongoDocument).save();
      break;
    case "Order Payment":
      new OrderPayment(mongoDocument).save();
      break;
    default:
      return
  }
}

// bulk inserts data in the database
const insertDocuments = (documents) => {
  // console.log(documents, 'fuck')
  documents.forEach(document => {
    insertToTable(document.transactionType,document)
  })
}

module.exports =  insertDocuments;
