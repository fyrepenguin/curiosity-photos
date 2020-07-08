
import axios from 'axios'

const key = process.env.REACT_APP_API_KEY || 'DEMO_KEY';
const API_ENDPOINT = `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?&api_key=${key}`;

exports.handler = async (event, context) => {
  return axios.get(API_ENDPOINT, {
    timeout: 5000,
  }).then(({ data }) => {
    return ({
      statusCode: 200,
      body: JSON.stringify(data)
    })
  }).catch(err => ({ statusCode: 422, body: String(err) }))
}; 