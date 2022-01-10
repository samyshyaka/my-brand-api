"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _express = _interopRequireDefault(require("express"));

var _query = _interopRequireDefault(require("../models/query.js"));

var _login = require("./login.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

//Get Method
router.get('/', _login.authenticateToken, async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).send('Error ' + err);
  }
}); //Get Method - Display one single object

router.get('/:id', _login.authenticateToken, async (req, res) => {
  try {
    const profiles = await Profile.findById(req.params.id);
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).send('Error ' + err);
  }
}); // Delete Method

router.delete("/:id", _login.authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    const q1 = await profile.remove();
    res.status(200).json(q1);
  } catch (err) {
    res.status(500).send('error ' + err);
  }
});
var _default = router;
exports.default = _default;