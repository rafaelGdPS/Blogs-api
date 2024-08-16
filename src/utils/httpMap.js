const httpCode = {
  SUCCESSFUL: 200,
  CREATED: 201,
  DELETED: 204,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};

const statusCode = (statusText) => httpCode[statusText];

module.exports = statusCode;