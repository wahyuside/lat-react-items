import "dotenv/config";
import express from "express";
import route from "./routes/route.js";
// import models, { sequelize } from "./model/init-models.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 7200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(route);

app.get("/", (req, res) => {
  res.json("Hello World Backend Nodejs"); //res.send kirim dgn tipe string, res.json bisa kirim dgn beragam tipe data
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
