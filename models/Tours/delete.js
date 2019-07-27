module.exports = (knex, Tour) => {
  return params => {
    const { tourName } = params;

    return knex("Tours")
      .where("tour_name", tourName.toLowerCase())
      .del()
      .then(() => {
        return knex("Tours").select();
      })
      .then(tours => new Tour(tours.pop())) // create a tour model out of the plain database response
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
