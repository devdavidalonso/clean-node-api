const MissingParamError = require("./missing-param-error");
const deniedAuthorization = require("./denied-authorization");

module.exports = class HttpResponse {
  static badRequest(paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }
  static serverError() {
    return {
      statusCode: 500,
    };
  }
  static deniedAuthorization() {
    return {
      statusCode: 401,
      body: new deniedAuthorization(),
    };
  }
};
