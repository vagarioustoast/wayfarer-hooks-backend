const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;

// Controllers
const controllers = require("./controllers");

// MIDDLEWARE //

// Protect Headers
app.use(helmet());

// Express Session Config
app.use(
  session({
    secret: "ron swanson",
    resave: false,
    saveUninitialized: false
  })
);

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// HTML ENDPOINT //

app.get("/", (req, res) => res.send("<h1>Wayfarer API</h1>"));

// API ENDPOINTS //

// Auth Routes

app.use("/api/v1/auth", controllers.auth);
app.use("/api/v1/users", controllers.users);
app.use("/api/v1/posts", controllers.posts);

// START SERVER //

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
