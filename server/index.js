import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/post", postRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", async (req, res) => {
  res.send("Hello AI");
});

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
  } catch (err) {
    console.log("ERROR : ", err);
  }
  app.listen(8080, () =>
    console.log("Server has started on port http://localhost:8080 ")
  );
};

startServer();
