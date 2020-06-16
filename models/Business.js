const  mongoose  = require('mongoose');
const Schema = mongoose.Schema;

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
    type: [],
    required: true
  },
  businessAbbreviation: {
    type: String
  },
  accountingSoftware: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true
  }

})

module.exports = mongoose.model('Business', businessSchema);
