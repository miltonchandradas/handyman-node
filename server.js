const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");

// Route files
const projects = require("./routes/projects");
const posts = require("./routes/posts");
const users = require("./routes/users");
const subscription = require("./routes/subscription");

// Load environment variables
dotenv.config({
   path: "./config/config.env",
});

// Connect to database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Enable cors
app.use(cors());

// DEV logging middleware
if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1/projects", projects);
app.use("/api/v1/posts", posts);
app.use("/api/v1/users", users);
app.use("/api/v1/subscription", subscription);

const PORT = process.env.PORT || 8080;
console.log("PORT: ", PORT);

const server = app.listen(
   PORT,
   console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
   )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
   console.log(`Error: ${err.message}`.red);

   server.close(() => process.exit(1));
});
