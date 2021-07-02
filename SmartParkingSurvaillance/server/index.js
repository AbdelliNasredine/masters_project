const config = require("./config");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require('handlebars-helpers')();
const mqtt = require("mqtt");
const WebSocket = require('ws');
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
  helpers: {
    count: function (array) {
      return array ? array.length : 0;
    },
    eq: function(val1, val2) {
      return val1 === val2;
    }
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

let ws_client;

// MQTT & WEBSOCKET INIT
const client = mqtt.connect("mqtt://localhost");

client.on("connect", function () {
  console.log("[MQTT]: connected")
  client.subscribe("parking/#", function (err) {
    if(err) {
      console.log(`[MQTT]: ${err}`);
    }else {
      console.log("[MQTT]: subcribed sucessfull")
    }
  });
  client.subscribe("auth/#", function (err) {
    if(err) {
      console.log(`[MQTT]: ${err}`);
    }else {
      console.log("[MQTT]: subcribed sucessfull")
    }
  });
});

client.on("message", function (topic, message) {
  console.log(`[MQTT]: topic : ${topic} , message: ${message.toString()}`);
  const topic_name = topic.split("/")[0];
  if(topic_name == "parking") {
    if(ws_client) {
      ws_client.send(`${topic}$${message.toString()}`);
    }
  }
  if(topic_name == "auth") {
    // send to web app
    if(ws_client) {
      ws_client.send(`${topic}$${message.toString()}`);
    }
    // Todo: verifiy licence plate
  }
});

// HTTP SERVER & WEBSOCKETS SERVER CONFIGURATION
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log("[WS]: client connected");
  ws.on('message', function incoming(message) {
    console.log('[WS] received: %s', message);
  });
  ws_client = ws;
  ws.send('websockets: hello');
});


server.listen(port, () => {

  if(config.env == "DEV") testConnection();
  console.log(`App is running on http://localhost:${port}`);
});
