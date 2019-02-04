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
    await vector.setRegion(region);
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

module.exports = {
  add
};
