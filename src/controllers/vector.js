const Vector = require('../models/vector');

const add = async (req, res) => {
  const {
    name, description, coordinates, className, region
  } = req.body;

  const location = { type: 'Polygon', coordinates };

  let vector;
  try {
    vector = new Vector({
      name, description, location, owner: req.decoded.id, className
    });
    vector.setUid();
    vector.setClassId(className);
    await vector.setVector(region);
    await vector.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: 'Vector Successfully created',
    data: {
      name,
      description,
      uid: vector.uid,
      className,
      region
    }
  });
};

const getAll = async (req, res) => {
  let vectors;
  const projections = {
    name: 1,
    description: 1,
    location: 1,
    uid: 1,
    region: 1,
    className: 1
  };

  try {
    vectors = await Vector.find({}, projections);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(200).json({
    message: 'List of all vectors',
    data: {
      vectors
    }
  });
};

module.exports = {
  add,
  getAll
};
