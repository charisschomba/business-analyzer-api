const  mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const billSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  transactionType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  transactionDate: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  transactionAmount: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true
  },
  business: {
    type: Schema.Types.ObjectID,
    ref: 'Business',
    required: true
  }

})

module.exports = mongoose.model('Bill', billSchema);
