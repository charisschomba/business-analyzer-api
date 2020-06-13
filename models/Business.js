import mongoose, {Schema} from 'mongoose';

const businessSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true
  },
  entity: {
    type: String,
    required: true
  },
  annualSales: {
    type: String,
    required: true
  },
  countriesOfOperations: {
    type: [String],
    required: true
  },
  businessAbbreviation: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true
  }

})

export default mongoose.model('Business', businessSchema);
