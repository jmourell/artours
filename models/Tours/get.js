module.exports = (knex, Tour) => {
  return params => {
    /* Add more params later on */
    const { tourName } = params;

    return knex("Tours")
      .where({ tour_name: tourName.toLowerCase() })
      .select()
      .then(tours => {
        if (tours.length) return new Tour(tours.pop());

        throw new Error(`Error finding tour ${tourName}`);
      });
  };
};
