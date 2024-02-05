const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const authRoutes = require("./routes/auth");
const { authenticate } = require("./middleware/authMiddleware");
const routes = require("./routes/router");
const app = express();

app.use(express.json());

// React Integration
var allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
}));

// Swagger endpoint
const swaggerDocument = YAML.load('swagger.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// DB Connection
const conn = require("./db/conn");
conn();

// Public Routes
app.use(authRoutes);


// Private Routes
app.use("/api", authenticate, routes);

app.listen(3000, function() {
    console.log("Server running...");
});


module.exports = app;