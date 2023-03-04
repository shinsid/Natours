const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    //results: tours.length,
    //data: { tours: tours },
  });
};

exports.getTour = (req, res) => {
  //const id = req.params.id * 1;
  //const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    //data: { tour: tour },
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.updateTour = (_req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: 'Updated tour here...' },
  });
};

exports.deleteTour = (_req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
