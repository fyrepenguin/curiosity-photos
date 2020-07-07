/* 
const { REACT_APP_API_KEY } = process.env

const API_ENDPOINT = `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=${REACT_APP_API_KEY}`;
 */

import fetch from "node-fetch";

const API_ENDPOINT = "https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=DEMO_KEY";

exports.handler = async (event, context) => {
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