const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const AcountModel = mongoose.model("Account");

module.exports = () => {
  router.post("/signup", new SingUpRouter().router);
};

class SingUpRoute {
  async router(req, res) {
    const { email, password, repeatPassword } = req.body;
    new SingUpUseCase.singup(email, password, repeatPassword);
    res.status(400).json({ error: "password must be equal repeatPassword! " });
  }
}

class SingUpUseCase {
  async singup(email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = await AcountModel.create({ email, password });
      return user;
    }
  }
}
