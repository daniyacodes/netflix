import { getMovieList, getTrailerVideos } from "../services/tmdb.service.js";

export async function getMovies(req, res, next) {
  try {
    const data = await getMovieList(req.params.type);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getTrailer(req, res, next) {
  try {
    const data = await getTrailerVideos(req.params.mediaType, req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
