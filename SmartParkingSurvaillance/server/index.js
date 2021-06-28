const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");
const mqtt = require("mqtt");
const { testConnection } = require("./database/connection");
const middleware = require("./middleware/sessionauth.middleware");
const apiRoutes = require("./routes/api.route");
const authRoutes = require("./routes/auth.route");
const webRoutes = require("./routes/web.route");
const unprotectedRoutes = require("./routes/unprotected.route");

const app = express();
const port = config.web.port || 3000;

const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "main",
  // helpers
  helpers: {
    count: function (array) {
      return array ? array.length : 0;
    },
  },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: config.web.sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static("public"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.use(middleware.clearCookie);

// ROUTES
app.use(unprotectedRoutes);
app.use(authRoutes);
app.use("/api", apiRoutes);
app.use("/admin", webRoutes);
app.get("/", (req, res) => res.redirect("/admin"));

// MQTT & WEBSOCKET INIT
const client = mqtt.connect("mqtt://localhost");

client.on("connect", function () {
  client.subscribe("#", function (err) {
    // todo : handle error case
  });
});

client.on("message", function (topic, message) {
  console.log(message.toString());
  console.log(topic);
  console.log(`[MQTT]: topic : ${topic} , message: ${message.toString()}`);
  client.end();
});

app.listen(port, () => {
  testConnection();
  console.log(`App is running on http://localhost:${port}`);
});
