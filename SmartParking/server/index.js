const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const exphbs = require("express-handlebars");
const { testConnection } = require("./database/connection");
const middleware = require("./middleware/sessionauth.middleware");
const apiRoutes = require("./routes/api.route");
const authRoutes = require("./routes/auth.route");
const webRoutes = require("./routes/web.route");

const app = express();
const port = config.web.port || 3000;

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
app.engine("hbs", exphbs({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");

app.use(middleware.clearCookie);

// ROUTES
app.use(authRoutes);
app.use("/api", apiRoutes);
app.use("/admin", webRoutes);
app.get("/", (req, res) => res.redirect("/admin"));

app.listen(port, () => {
  testConnection();
  console.log(`App is running on http://localhost:${port}`);
});
