// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");
const dotenv = require("dotenv");
let cors = require("cors");
require("dotenv").config();
const dbUrl = process.env.MONGO_URI;

// Swagger config
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Initialize the app
let app = express();

// Enables CORS
app.use(cors());

// Import routes
let apiRoutes = require("./api-routes");

// Configure body-parser to handle POST requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
mongoose.connection
  .on("connected", () => {
    console.log(`Mongoose connection open on ${dbUrl}`);
  })
  .on("error", (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my Express.js app",
    },
  },
  apis: ["./api-routes.js"], // Points to your API route file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs
app.use("/api-docs", swaggerUi.serve, (req, res, next) => {
  req.url = req.url === "/" ? "/index.html" : req.url; 
  swaggerUi.setup(swaggerSpec)(req, res, next);
});

// Setup server port
let port = process.env.PORT || 8080;

// Default route
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use API routes
app.use("/api", apiRoutes);

// Launch app
app.listen(port, function () {
  console.log("Running server on port " + port);
  console.log(`Swagger Docs: http://localhost:${port}/api-docs`);
});
