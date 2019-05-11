# Nearby Restaurants with Google Map

## Installation

1. Clone Project From Github (https://github.com/carsenchan/react-google-map-restaurants)

   ```
   git clone https://github.com/carsenchan/react-google-map-restaurants
   ```

2. Since we would use google place service, the API is a must environment variable. To create project based environment variable, need to create `.env` file in the project root path.

   ```
   touch .env
   ```

   Edit `.env`, set environment variable call `REACT_APP_GOOGLE_API_KEY`, like the following:

   ```javascript
   REACT_APP_GOOGLE_API_KEY=// key here
   ```

3. Install packages

   ```
   yarn
   ```

4. Run directly as development or run after building production
   - If want to run as `development`
     ```
     yarn start
     ```
   - If want to run as `production`
     ```
     yarn build
     yarn global add serve
     ```
     after finish installing `serve`, then
     ```
     serve -s build
     ```

## Project Detail

- Use React.js as front-end framework
- Use google-map-react library to impletement core map component
- Use google place API to fetch nearby restaurants' data and restaurant detail informaiton
- Since meet a CORS problem while calling google place api, use https://cors-anywhere.herokuapp.com/ as proxy to fetch data

## Requirement

Basic features:

- ~~Restaurant listing~~
- ~~Restaurant detail~~
- ~~Re-order items by distance and others (eg. cost or name etc.)~~
- ~~Refreshing listing when map boundary is updated~~

Bonus features:

- Responsive UI
- Filtering by distance, cost, opening hours etc.
- ~~Show the restaurant in the map as pins~~
- ~~Map pin and restaurant listing panel interaction~~
- Direction to the restaurant
- Any other things you think are important

## Wakatime Link

Document (Readme.md) used about 30min
https://wakatime.com/@Carsen/projects/irigshjwos?start=2019-05-05&end=2019-05-11
