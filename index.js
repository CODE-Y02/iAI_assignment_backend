const express = require("express");
const cors = require("cors");
const middlewares = require("./middlewares");
const routes = require("./routes");
const config = require("./config");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger setup
config.swagger(app);

// API Routes
app.use(routes);

console.log("HI ");

// Global Error Handler
app.use(middlewares.errorHandler);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
