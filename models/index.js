module.exports = function(knex) {
  return {
    tours: require("./tours")(knex),
    ratings: require("./ratings")(knex),
    sites: require("./sites")(knex),
  };
};
