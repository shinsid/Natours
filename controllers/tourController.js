const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
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
