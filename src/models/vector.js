const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const { Schema } = mongoose;

const PolygonSchema = new Schema({
  uid: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  classId: {
    type: Number,
    required: true
  },
  className: {
    type: String
  },
  polygon: {
    type: {
      type: String,
      enum: ['Polygon'],
      required: true
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Region'
  }
});

PolygonSchema.methods.setUid = function () {
  this.uid = uuidv1();
};

module.exports = mongoose.model('Region', PolygonSchema);
