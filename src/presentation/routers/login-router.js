const  HttpResponse = require("../helpers/http-response")
const  LOGIN_FIELDS = require("../enuns/login-parans")

module.exports =  class LoginRouter {
    route(httpRequest) {
      if (!httpRequest || !httpRequest.body) {
        return HttpResponse.serverError();
      }
      
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(LOGIN_FIELDS.EMAIL);
      }
      if (!password) {
        return HttpResponse.badRequest(LOGIN_FIELDS.PASSWORD);
      }

    }
  }