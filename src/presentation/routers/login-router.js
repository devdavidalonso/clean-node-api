const HttpResponse = require("../helpers/http-response");
const LOGIN_FIELDS = require("../enuns/login-parans");

module.exports = class LoginRouter {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  route(httpRequest) {
    if (
      !httpRequest ||
      !httpRequest.body ||
      !this.authUseCase ||
      !this.authUseCase.auth
    ) {
      return HttpResponse.serverError();
    }

    const { email, password } = httpRequest.body;
    if (!email) {
      return HttpResponse.badRequest(LOGIN_FIELDS.EMAIL);
    }
    if (!password) {
      return HttpResponse.badRequest(LOGIN_FIELDS.PASSWORD);
    }

    this.authUseCase.auth(email, password);
    return HttpResponse.deniedAuthorization();
  }
};
