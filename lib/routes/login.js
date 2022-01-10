"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateToken = authenticateToken;
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/web.url.to-json.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const router = _express.default.Router();

router.post('/', async (req, res) => {
  const users = await _user.default.find();
  const user = users.find(user => user.name === req.body.name);

  if (user == null) {
    return res.status(400).send('Cannot find user');
  }

  try {
    if (await _bcrypt.default.compare(req.body.password, user.password)) {
      const accessToken = _jsonwebtoken.default.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
      });

      res.status(200).json({
        accessToken: accessToken
      });
    } else {
      res.status(401).send('Not allowed');
    }
  } catch (err) {
    res.status(500).send('' + err);
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  _jsonwebtoken.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

var _default = router;
exports.default = _default;