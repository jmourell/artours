const express = require("express");

module.exports = models => {
  /**
   * Controller Logic
   */
  const createTour = (req, res) =>
    models.tours
      .create({
        tourName: req.body.tourName,
        description: req.body.description,
        address: req.body.address,
        photo: req.body.photo
      })
      .then(tours => res.status(201).json(tours.serialize()))
      .catch(err => res.status(400).send(err.message));

  const listTours = (req, res) =>
    models.tours
      .list()
      .then(tours => tours.map(tour => tour.serialize()))
      .then(tours => res.status(200).json(tours))
      .catch(err => res.status(400).send(err.message));

  const getTour = (req, res) =>
    models.tours
      .get({ tourName: req.params.tourName })
      .then(tour => res.status(200).json(tour.serialize()))
      .catch(err => res.status(400).send(err.message));

  const editTour = (req, res) =>
    models.tours
      .edit({
        /*CLEARLY DOCUMENT THAT THE PARAM IS HOW YOU FIND IT AND THEN YOU SET WITH THE BODY*/
        tourName: req.params.tourName,
        tour_name: req.body.tourName,
        description: req.body.description,
        address: req.body.address,
        photo: req.body.photo
      })
      .then(tour => res.status(200).json(tour.serialize()))
      .catch(err => res.status(400).send(err.message));

  const deleteTour = (req, res) =>
    models.tours
      .delete({ tourName: req.params.tourName })
      .then(tours => tours.map(tour => tour.serialize()))
      .then(tours => res.status(200).json(tours))
      .catch(err => res.status(400).send(err.message));

  /**
   * Routes
   */
  const router = express.Router();
  router.post("", createTour);
  router.get("", listTours);
  router.get("/:tourName", getTour);
  router.patch("", editTour);
  router.delete("/:tourName", deleteTour);

  return router;
};
