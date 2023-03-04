/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, _val) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours: tours },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: { tour: tour },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (_err) => {
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
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
