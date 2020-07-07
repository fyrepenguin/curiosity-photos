

exports.handler = async (event, context) => {
  let env = process.env
  console.log(env)
  return {
    statusCode: 200,
    body: JSON.stringify(env)
  };
};