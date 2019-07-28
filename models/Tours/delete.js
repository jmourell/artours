module.exports = (knex, Tour) => {
  return params => {
    const { tourName } = params;

    return knex("Tours")
      .where("tour_name", tourName)
      .del()
      .then(() => {
        return knex("Tours")
          .select()
          .then(tours => tours.map(tour => new Tour(tour)));
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
