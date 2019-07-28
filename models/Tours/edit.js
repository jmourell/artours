module.exports = (knex, Tour) => {
  return params => {
    /* Add more params later on */

    const { tourName } = params;

    knex("Tours")
      .where({ tour_name: tourName })
      .then(row => {
        return Object.assign(row, params);
      })
      .update(row)
      .then(tours => {
        console.log(tours);
        if (tours.length) return new Tour(tours.pop());

        throw new Error(`Error finding tour ${tourName}`);
      });
  };
};
