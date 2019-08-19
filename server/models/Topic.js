const mongoose = require('mongoose');

let counter = 0;
let CountedId = { type: Number, default: () => counter++ };

const schema = new mongoose.Schema({
  id: CountedId,
  title: { type: String },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  body: { type: String },
});

module.exports = mongoose.model('Topic', schema);

mongoose.model('Topic', schema).find({ id: { $gt: 0 } }).sort({ id: -1 })
  .then((arr) => {
    console.log(arr)
  });