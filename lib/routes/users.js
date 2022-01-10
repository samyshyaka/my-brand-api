"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _user = _interopRequireDefault(require("../models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get('/', async (req, res) => {
  try {
    const users = await _user.default.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send('Error ' + err);
  }
});
router.post('/', async (req, res) => {
  const hashedPassword = await _bcrypt.default.hash(req.body.password, 10);
  const user = new _user.default({
    name: req.body.name,
    password: hashedPassword
  });

  try {
    const u1 = await user.save();
    res.status(201).send(u1);
  } catch (err) {
    res.status(500).send('' + err);
  }
});
var _default = router;
exports.default = _default;