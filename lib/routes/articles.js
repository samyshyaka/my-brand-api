"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _express = _interopRequireDefault(require("express"));

var _article = _interopRequireDefault(require("../models/article.js"));

var _login = require("./login.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

//Get Method
router.get('/', _login.authenticateToken, async (req, res) => {
  try {
    const articles = await _article.default.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).send('Error ' + err);
  }
}); //Get Method - Display one single object

router.get('/:id', _login.authenticateToken, async (req, res) => {
  try {
    const articles = await _article.default.findById(req.params.id);
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).send('Error ' + err);
  }
}); //Post Method

router.post('/', _login.authenticateToken, async (req, res) => {
  const article = new _article.default({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  });

  try {
    const a1 = await article.save();
    res.status(201).json(a1);
  } catch (err) {
    res.status(500).send('error' + err);
  }
}); //Patch Method

router.patch("/:id", _login.authenticateToken, async (req, res) => {
  try {
    const article = await _article.default.findById(req.params.id);
    article.title = req.body.title;
    article.author = req.body.author;
    article.content = req.body.content;
    const a1 = await article.save();
    res.status(200).json(a1);
  } catch (err) {
    res.status(304).send('Error ' + err);
  }
}); // Delete Method

router.delete("/:id", _login.authenticateToken, async (req, res) => {
  try {
    const article = await _article.default.findById(req.params.id);
    const a1 = await article.remove();
    res.status(200).json(a1);
  } catch (err) {
    res.status(500).send('error ' + err);
  }
});
var _default = router;
exports.default = _default;