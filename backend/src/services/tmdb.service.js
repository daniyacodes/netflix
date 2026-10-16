import axios from "axios";

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3"
  // timeout: 10000,
});

const requests = {
  trending: {
    path: "/trending/all/week",
    params: { language: "en-US" },
  },
  netflixOriginals: {
    path: "/discover/tv",
    params: { with_networks: 213, language: "en-US" },
  },
  topRated: {
    path: "/movie/top_rated",
    params: { language: "en-US" },
  },
  action: {
    path: "/discover/movie",
    params: { with_genres: 28, language: "en-US" },
  },
  comedy: {
    path: "/discover/movie",
    params: { with_genres: 35, language: "en-US" },
  },
  horror: {
    path: "/discover/movie",
    params: { with_genres: 27, language: "en-US" },
  },
  romance: {
    path: "/discover/movie",
    params: { with_genres: 10749, language: "en-US" },
  },
  documentaries: {
    path: "/discover/movie",
    params: { with_genres: 99, language: "en-US" },
  },
};

export async function getMovieList(type) {
  const request = requests[type];

  if (!request) {
    const error = new Error("Unknown movie category");
    error.status = 404;
    throw error;
  }

  const response = await tmdb.get(request.path, {
    params: {
      ...request.params,
      api_key: process.env.TMDB_API_KEY,
    },
  });

  return response.data;
}

export async function getTrailerVideos(mediaType, id) {
  if (!['movie', 'tv'].includes(mediaType)) {
    const error = new Error("mediaType must be movie or tv");
    error.status = 400;
    throw error;
  }

  if (!/^\d+$/.test(String(id))) {
    const error = new Error("Invalid movie or TV id");
    error.status = 400;
    throw error;
  }

  const response = await tmdb.get(`/${mediaType}/${id}/videos`, {
    params: {
      api_key: process.env.TMDB_API_KEY,
      language: "en-US",
    },
  });

  return response.data;
}
