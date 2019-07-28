const faker = require("faker");
const createFakeTour = () => {
  const city = faker.address.city();
  return {
    tour_name: city,
    description: city + faker.company.bs() + faker.company.catchPhrase(),
    address: faker.address.streetAddress(),
    photo: faker.image.imageUrl()
  };
};
exports.seed = async function(knex) {
  const tours = [];
  const desired_tours = 100;
  // Deletes ALL existing entries
  for (let i = 0; i < desired_tours; i++) {
    tours.push(createFakeTour());
  }

  await knex("Tours").del();
  await knex("Tours").insert(tours);
};
