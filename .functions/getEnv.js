

exports.handler = async (event, context) => {
  let env = process.env.REACT_APP_API_KEY
  return {
    statusCode: 200,
    body: JSON.stringify(env)
  };
};