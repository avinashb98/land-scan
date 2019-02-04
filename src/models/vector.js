const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const Region = require('./region');

const { Schema } = mongoose;

const polygonSchema = new Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true
  },
  coordinates: {
    type: Array,
    required: true
  }
});

const VectorSchema = new Schema({
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
  location: polygonSchema,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: 'Region'
  }
});

VectorSchema.methods.setUid = function () {
  this.uid = uuidv1();
};

VectorSchema.methods.setClassId = function (className) {
  let classId;
  switch (className) {
    case 'house':
      classId = 101;
      break;

    case 'mall':
      classId = 102;
      break;

    case 'park':
      classId = 103;
      break;

    case 'monumet':
      classId = 104;
      break;

    default:
      classId = 0;
      break;
  }

  this.classId = classId;
};

VectorSchema.methods.setRegion = async function (uid) {
  let region;
  try {
    region = await Region.findOne({ uid });
  } catch (error) {
    throw new Error('Region not found');
  }
  this.region = region._id;
};

module.exports = mongoose.model('Vector', VectorSchema);
