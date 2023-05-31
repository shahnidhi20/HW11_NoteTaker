const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const PORT = process.env.PORT || 3001;



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
