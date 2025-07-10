const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const dbConnect = require("./config/db");

require("dotenv").config();

const app = express();
const http = require("http");
const server = http.createServer(app);

const { setupSocket } = require("./config/socket"); // 👈 Modular socket setup
setupSocket(server); // Pass the HTTP server

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(
  session({
    name: 'connect.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());

app.use((req, res, next) => {
  if (req.session.token) req.headers["token"] = req.session.token;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/user.route"));
app.use(require("./routes/dashboard.route"));
app.use("/api/messages", require("./routes/message.route"));

server.listen(process.env.PORT, () => {
  console.log(`✅ Server running at http://127.0.0.1:${process.env.PORT}`);
  dbConnect.connectDb();
});
