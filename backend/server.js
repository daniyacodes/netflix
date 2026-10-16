import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT || 5000;

if (!process.env.TMDB_API_KEY) {
  console.error("TMDB_API_KEY is missing. Add it to backend/.env");
  process.exit(1);
} 

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
