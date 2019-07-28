module.exports = (knex, Tour) => {
  return params => {
    /* Add more params later on */

    const { tourName } = params;

    return knex("Tours")
      .where({ tour_name: tourName })
      .then(row => {
        console.log("params", params);
        return Object.assign(row[0], params);
      })
      .then(row => {
        // Remove "bad naming conventions" fields from original object:
        let { tour_name, id, description, address, photo } = row;
        console.log(tour_name);
        const update = { tour_name, description, address, photo };
        return knex("Tours")
          .where({ tour_name: tourName })
          .update(update, [
            "tour_name",
            "id",
            "description",
            "address",
            "photo",
            "created_at"
          ])
          .then(tours => {
            if (tours.length) {
              return new Tour(tours.pop());
            }
            throw new Error(`Error finding tour ${tourName}`);
          });
      });
  };
};
