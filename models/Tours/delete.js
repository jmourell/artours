module.exports = (knex, Tour) => {
  return params => {
    const { tourName } = params;

    return knex("Tours")
      .where("tour_name", tourName.toLowerCase())
      .del()
      .then(() => {
        return knex("Tours").select();
      })
      .then(tours => new Tour(tours.pop())) // create a user model out of the plain database response
      .catch(err => {
        // IF delete entry doesn't exist customize error messaage
        // if (
        //   err.message.match("duplicate key value") ||
        //   err.message.match("UNIQUE constraint failed")
        // )
        //   return Promise.reject(new Error("That tour doesn't exist"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
