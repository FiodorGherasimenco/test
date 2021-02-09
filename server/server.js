const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const APIError = require("./errors/api");
const topicsRouter = require("./routes/topics");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/topics", topicsRouter);
app.use((req, res, next) => next(new APIError(404, "API Not Found")));
app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({
    message: error.message,
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
