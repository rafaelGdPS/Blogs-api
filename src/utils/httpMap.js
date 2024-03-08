const httpCode = {
  SUCCESSFUL: 200,
  CREATED: 201,
  UNAUTHORIZED: 400,
  CONFLICT: 409,
};

const statusCode = (statusText) => httpCode[statusText];

module.exports = statusCode;