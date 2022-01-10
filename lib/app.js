"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _articles = _interopRequireDefault(require("./routes/articles.js"));

var _profiles = _interopRequireDefault(require("./routes/profiles.js"));

var _queries = _interopRequireDefault(require("./routes/queries.js"));

var _users = _interopRequireDefault(require("./routes/users.js"));

var _login = _interopRequireDefault(require("./routes/login.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const url = "mongodb://localhost/ArticlesDBex";
const app = (0, _express.default)();

_mongoose.default.connect(url);

const con = _mongoose.default.connection;
con.on("open", () => {
  console.log("connected..");
});
app.use(_express.default.json());
app.use("/Articles", _articles.default);
app.use("/Profiles", _profiles.default);
app.use("/Queries", _queries.default);
app.use("/Users", _users.default);
app.use("/Login", _login.default);
app.listen(9000, () => {
  console.log("server started");
});