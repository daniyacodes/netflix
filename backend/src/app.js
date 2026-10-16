import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movie.routes.js";

const app = express();

const origin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
  origin: origin,
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/movies", movieRoutes);

app.use((error, req, res, next) => {
  console.error(error.message);

  if (error.response) {
    return res.status(error.response.status || 502).json({
      message: "TMDB request failed",
    });
  }

  res.status(error.status || 500).json({
    message: error.message || "Internal server error",
  });
});

export default app;
