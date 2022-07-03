class LoginRouter {
  route(httpRequest) {
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
      };
    }
    if (!httpRequest.body.password) {
      return {
        statusCode: 400,
      };
    }
  }
}

describe("Login router", () => {
  test("Should be 400 if email is null", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: "any_Thing",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
  test("Should be 400 if password is null", () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: "any_Thing",
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
