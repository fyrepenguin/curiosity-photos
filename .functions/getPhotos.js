/* url https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=1&camera=${camera}&api_key=DEMO_KEY` */


import fetch from 'node-fetch';

const key = process.env.REACT_APP_API_KEY;
exports.handler = async (event, context) => {
  const sol = event.queryStringParameters.sol;
  const camera = event.queryStringParameters.camera;
  console.log(process.env);
  let API_ENDPOINT = ''
  if (camera === 'all') {
    API_ENDPOINT = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=1&api_key=${key}`;
  } else {
    API_ENDPOINT = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=1&camera=${camera}&api_key=${key}`;

  }

  return fetch(API_ENDPOINT, {
    'Content-Type': 'application/json'
  })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};