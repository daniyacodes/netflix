import { Router } from "express";
import { getMovies, getTrailer } from "../controllers/movie.controller.js";

const router = Router();

router.get("/:type", getMovies);
router.get("/:mediaType/:id/trailer", getTrailer); 

export default router;
