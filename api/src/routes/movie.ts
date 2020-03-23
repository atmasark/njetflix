import { Router } from 'express';
import movieData from '../utils/convertData';
import Movie from '../interfaces/movie';
import validateQuery from '../validations/validateQuery';

const movieRouter = Router();

// @route   GET api/movie/getAll
// @desc    Get a list of available movies
// @access  Public
movieRouter.get('/getAll', (req, res) => {
  // Filter only some of the keys for the list
  const keysForList = ['id', 'title', 'poster', 'genre', 'imdbRating', 'year', 'rated'];
  try {
    const listData = movieData.map((movie: Movie) => Object.keys(movie)
      .filter((key) => keysForList.includes(key))
      .reduce((obj, key) => {
        obj[key] = movie[key];
        return obj;
      }, {}));
    return res.status(200).json({
      success: true,
      msg: 'Movie list fetch successful',
      list: listData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Error occurred while fetching movie list',
    });
  }
});

// @route   GET api/movie/getSingle
// @desc    Get data of a movie
// @access  Public
movieRouter.get('/getSingle', (req, res) => {
  const { error, isValid } = validateQuery(req.query.id);
  if (!isValid) {
    return res.status(400).json({
      success: false,
      msg: error,
    });
  }
  try {
    const queriedMovie = movieData.find((movie: Movie) => movie.id === Number(req.query.id));
    if (!queriedMovie) {
      return res.status(404).json({
        success: false,
        msg: 'Id does not exist',
      });
    }
    return res.status(200).json({
      success: true,
      msg: 'Single movie fetch successful',
      current: queriedMovie,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Error occurred while fetching a movie',
    });
  }
});

export default movieRouter;
