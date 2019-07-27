module.exports = (knex, Tour) => {
  return () => {
    return Promise.resolve(
      knex("Tours")
        .select()
        .then(tours => {
          return tours.map(tour => new Tour(tour));
          //return users;
        })
    ); // fix me!
  };
};
