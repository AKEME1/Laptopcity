const express = require("express");
const userControllers = require("../controllers/userController");
const authControllers = require("../controllers/authController");
const router = express.Router();

router.post("/signin", authControllers.signin);
router.post("/login", authControllers.login);

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createOne);

router
  .route("/:userID")
  .get(userControllers.getOne)
  .patch(userControllers.updateone)
  .delete(userControllers.deleteOne);
module.exports = router;
