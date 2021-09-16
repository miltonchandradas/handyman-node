const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const Project = require("./models/Project");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

// Read JSON files
const projects = JSON.parse(
   fs.readFileSync(`${__dirname}/_data/projects.json`, "utf-8")
);

// Import into DB
const importData = async () => {
   try {
      await Project.create(projects);
      console.log("Data imported...".green.inverse);
      process.exit();
   } catch (err) {
      console.error(err);
   }
};

// Delete data
const deleteData = async () => {
   try {
      await Project.deleteMany;
      console.log("Data destroyed...".red.inverse);
      process.exit();
   } catch (err) {
      console.error(err);
   }
};

if (process.argv[2] === "-i") {
   importData();
} else if (process.argv[2] === "-d") {
   deleteData();
}
