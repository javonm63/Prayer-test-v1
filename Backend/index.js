import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.js";
import dashboardRoutes from "./Routes/dashboard.js";

dotenv.config();


const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS ||
  "http://localhost:5174,http://localhost:5173").split(",").map(origin => origin.trim());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json());
let totalCount = 0;
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("mogno atlas  connetced")
})
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend working fine ");
});

app.use("/api/auth", authRoutes);
app.get("/api/count", (req, res) => {

  res.json({ totalCount });
})

app.post("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.json({ message: "Server working fine" });
});

app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});