class LoginRouter {
  route(httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError();
    }
    const { email, password } = httpRequest.body;
    if (!email || !password) {
      return HttpResponse.badRequest();
    }
  }
}

class HttpResponse {
  static badRequest() {
    return {
      statusCode: 400,
    };
  }
  static serverError() {
    return {
      statusCode: 500,
    };
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
  test("Should be 500 if httpRequest is null", () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  });
  test("Should be 500 if httpRequest.body is no provider", () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route({});
    expect(httpResponse.statusCode).toBe(500);
  });
});
