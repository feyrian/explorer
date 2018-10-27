var mongoose = require('mongoose')
  , Schema = mongoose.Schema;
 
var StatsSchema = new Schema({
  coin: { type: String },
  count: { type: Number, default: 1 },
  last: { type: Number, default: 1 },
  supply: { type: Number, default: 0 },
  // last_txs: { type: Array, default: [] },
  connections: { type: Number, default: 0 },
});

module.exports = mongoose.model('coinstats', StatsSchema);