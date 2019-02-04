const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const { Schema } = mongoose;
const RegionSchema = new Schema({
  uid: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

RegionSchema.methods.setUid = function () {
  this.uid = uuidv1();
};

module.exports = mongoose.model('Region', RegionSchema);
