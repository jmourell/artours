# artours
## Setup
 yarn install
## Create a database called artours in pgsql
CREATE DATABASE artours
## To Migrate the database
yarn migrate
## To Seed the database
yarn seed



# Tours Api

## Welcome to Tours Api

- To get a list of avaliable tours, send a get request to (/tours)
- To get a single tour, send a get request to (/tours/:tourName)
- To erase a tour, send a delete request with the tour name (/tours/:tourName)
- To create a new tour send a post request to (/tours) make sure to include a tourName, description, location and a photo field
- To edit a single tour, send an patch request to (/tours/:tourName), the tourName in the url will be updated you can change the tourName, description, location and a photo field.
