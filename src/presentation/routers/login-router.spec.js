const LoginRouter = require("./login-router");
const MissingParamError = require("../helpers/missing-param-error");
const LOGIN_FIELDS = require("../enuns/login-parans");

const makeSut = () => {
     new LoginRouter();
}

describe("Login router", () => {
  test("Should be 400 if email is null", () => {
    const sut = makeSut()
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
    const sut = makeSut()
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
    const sut = makeSut()
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  });
  test("Should be 500 if httpRequest.body is no provider", () => {
    const sut = makeSut()
    const httpResponse = sut.route({});
    expect(httpResponse.statusCode).toBe(500);
  });


});
