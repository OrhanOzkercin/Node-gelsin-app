const express = require("express");
const { index, create, login } = require("../controllers/Users");
const { createUser, userLogin } = require("../validations/Users");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.route("/").get(authenticate, index);
router.route("/").post(validate(createUser, "body"), create);
router.route("/login").post(validate(userLogin, "body"), login);
// router.route("/:typeId").post(validate(userQuery, "query"),validate(createUser, "body"), create);

module.exports = router;
