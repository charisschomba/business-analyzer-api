import mongoose, {Schema} from 'mongoose';

const billSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  transaction: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  transactionDate: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  customer: {
    type: [String],
    required: true
  },
  item: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  unitAmount: {
    type: String,
    required: true
  },
  totalTransaction: {
    type: String,
    required: true
  },
  amount: {
    type: String,
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

export default mongoose.model('Bill', billSchema);
