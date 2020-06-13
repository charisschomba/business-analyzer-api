import Order from "../models/Order";
import Bill from "../models/Bill";
import billPayment from "../models/BillPayment";
import orderPayment from "../models/OrderPayment";

const bulkInsert = (type, mongoDocument) => {
  // console.log(type)
  switch (type) {
    case "Order":
      new Order(mongoDocument).save();
      break;
    case "Bill":
      new Bill(mongoDocument).save();
      break;
    case "Bill Payment":
      new billPayment(mongoDocument).save();
      break;
    case "Order Payment":
      new orderPayment(mongoDocument).save();
      break;
    default:
      return
  }
}

const insertDocuments = (documents) => {
  // console.log(documents, 'fuck')
  documents.forEach(document => {
    bulkInsert(document.transactionType,document)
  })
}

export default insertDocuments;
