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

const getAll = async (req, res) => {
  let regions;
  const projections = {
    name: 1,
    description: 1,
    location: 1,
    uid: 1
  };

  try {
    regions = await Region.find({}, projections);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(200).json({
    message: 'List of all regions',
    data: {
      regions
    }
  });
};

const remove = async (req, res) => {
  const { uid } = req.body;
  const user = req.decoded.id;

  try {
    await Region.deleteOne({ uid, owner: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(200).json({
    message: 'Region successfully deleted',
    data: {}
  });
};

const update = async (req, res) => {
  const {
    uid, name, description, coordinates
  } = req.body;

  const updatedFields = {
    ...(name && { name }),
    ...(description && { description }),
    ...(coordinates && { location: { type: 'Point', coordinates } }),
  };

  let updatedRegion;
  try {
    updatedRegion = await Region.findOneAndUpdate(
      { uid, owner: req.decoded.id },
      updatedFields,
      { new: true }
    );
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
      location: updatedRegion.location
    }
  });
};

module.exports = {
  getAll,
  add,
  remove,
  update
};
