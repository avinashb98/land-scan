const Region = require('../models/region');

const add = async (req, res) => {
  const { name, description, coordinates } = req.body;

  const location = { type: 'Point', coordinates };
  let region;
  try {
    region = new Region({
      name, description, location, owner: req.decoded.id
    });
    region.setUid();
    await region.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: 'Region Successfully created',
    data: {
      name,
      description,
      uid: region.uid
    }
  });
};

module.exports = {
  add
};
