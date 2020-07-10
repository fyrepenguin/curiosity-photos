
import axios from 'axios'

const key = process.env.API_KEY || 'DEMO_KEY';
exports.handler = async (event, context) => {
  const sol = event.queryStringParameters.sol;
  const camera = event.queryStringParameters.camera;
  let API_ENDPOINT = ``
  if (camera === 'all') {
    API_ENDPOINT = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=1&api_key=${key}`;
  } else {
    API_ENDPOINT = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=1&camera=${camera}&api_key=${key}`;
  }

  return axios(API_ENDPOINT, {
    timeout: 5000
  })
    .then(({ data }) => ({
      statusCode: 200,
      body: JSON.stringify(data)
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
