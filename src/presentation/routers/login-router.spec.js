const LoginRouter = require("./login-router");
const MissingParamError = require("../helpers/missing-param-error");
const LOGIN_FIELDS = require("../enuns/login-parans");

const makeSut = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email;
      this.password = password;
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy();
  const sut = new LoginRouter(authUseCaseSpy);
  return {
    authUseCaseSpy,
    sut,
  };
};

describe("Login router", () => {
  test("Should be 400 if email is null", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "any_Thing",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError(LOGIN_FIELDS.EMAIL)
    );
  });
  test("Should be 400 if password is null", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_Thing",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError(LOGIN_FIELDS.PASSWORD)
    );
  });
  test("Should be 500 if httpRequest is null", () => {
    const { sut } = makeSut();
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  });
  test("Should be 500 if httpRequest.body is no provider", () => {
    const { sut } = makeSut();
    const httpResponse = sut.route({});
    expect(httpResponse.statusCode).toBe(500);
  });
  test("Should Call AuthUseCase with correct parameter", () => {
    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: "david@gamial.com",
        password: "any_Thing",
        repeatPassword: "any_Thing",
      },
    };
    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });
});
