import moment from 'moment';
const createDocument = (row, business, user) => {
  const [transactionType, id, status, transactionDate, dueDate, customer, item, quantity, amount, transactionAmount ] = row;
  return ({
    transactionType,
    id,
    status,
    transactionDate: moment(transactionDate, 'DD-MM-YYYY').valueOf(),
    dueDate: moment(dueDate, 'DD-MM-YYYY').valueOf(),
    customer,
    item,
    quantity,
    amount,
    transactionAmount,
    user: user._id,
    business: business._id
  })

}

export default createDocument;
