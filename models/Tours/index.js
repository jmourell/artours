const moment = require("moment");

const Tour = function(dbTour) {
  this.id = dbTour.id;
  this.tourName = dbTour.tour_name;
  this.createdAt = new Date(dbTour.created_at);
  this.description = dbTour.description;
  this.address = dbTour.address;
  this.photo = dbTour.photo;
};

Tour.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    tourName: this.tourName,
    description: this.description,
    address: this.address,
    photo: this.photo,
    createdAt: moment(this.createdAt).format("hh:mm:ss")
  };
};

module.exports = knex => {
  return {
    create: require("./create")(knex, Tour),
    list: require("./list")(knex, Tour),
    get: require("./get")(knex, Tour),
    edit: require("./edit")(knex, Tour),
    delete: require("./delete.js")(knex, Tour)
  };
};
