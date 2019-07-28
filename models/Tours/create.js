const validateTourname = tourName => typeof tourName === "string";

module.exports = (knex, Tour) => {
  return params => {
    const { tourName, description, address, photo } = params;

    if (!validateTourname(tourName)) {
      return Promise.reject(
        new Error("tourname must be provided, and be at least two characters")
      );
    }

    return knex("Tours")
      .insert({
        tour_name: tourName,
        address: address,
        photo: photo,
        description: description
      })
      .then(() => {
        return knex("Tours")
          .where({ tour_name: tourName })
          .select();
      })
      .then(tours => new Tour(tours.pop())) // create a user model out of the plain database response
      .catch(err => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That tour already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
