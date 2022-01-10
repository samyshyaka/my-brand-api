"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _express = _interopRequireDefault(require("express"));

var _profile = _interopRequireDefault(require("../models/profile.js"));

var _login = require("./login.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

//Get Method
router.get('/', _login.authenticateToken, async (req, res) => {
  try {
    const profiles = await _profile.default.find();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).send('Error ' + err);
  }
}); //Get Method - Display one single object

router.get('/:id', _login.authenticateToken, async (req, res) => {
  try {
    const profiles = await _profile.default.findById(req.params.id);
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).send('Error ' + err);
  }
}); //Post Method

router.post('/', _login.authenticateToken, async (req, res) => {
  const profile = new _profile.default({
    name: req.body.name,
    whatIDo: req.body.whatIDo,
    email: req.body.email
  });

  try {
    const p1 = await profile.save();
    res.status(201).json(p1);
  } catch (err) {
    res.status(500).send('error' + err);
  }
}); //Patch Method

router.patch("/:id", _login.authenticateToken, async (req, res) => {
  try {
    const profile = await _profile.default.findById(req.params.id);
    profile.name = req.body.name;
    profile.whatIDo = req.body.whatIDo;
    profile.email = req.body.email;
    const p1 = await profile.save();
    res.status(200).json(p1);
  } catch (err) {
    res.status(304).send('Error ' + err);
  }
}); // Delete Method

router.delete("/:id", _login.authenticateToken, async (req, res) => {
  try {
    const profile = await _profile.default.findById(req.params.id);
    const p1 = await profile.remove();
    res.status(200).json(p1);
  } catch (err) {
    res.status(500).send('error ' + err);
  }
});
var _default = router;
exports.default = _default;