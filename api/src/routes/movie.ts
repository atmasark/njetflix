import { Router } from 'express';
import movieData from '../utils/convertData';
import Movie from '../interfaces/movie';

const movieRouter = Router();

movieRouter.get('/getAll', (req, res) => {
  // Keys needed for the list view
  const listKeys = ['id', 'title', 'poster'];
  try {
    const listData = movieData.map((movie: Movie) => Object.keys(movie)
      .filter((key) => listKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = movie[key];
        return obj;
      }, {}));
    return res.status(200).json({
      success: true,
      msg: 'Movie list fetch successful',
      data: listData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Error occurred while fetching movie list',
    });
  }
});


movieRouter.get('/getSingle', (req, res) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        msg: 'Id is required',
      });
    }
    const queriedMovie = movieData.find((asd: Movie) => asd.id === parseInt(id));
    if (!queriedMovie) {
      return res.status(404).json({
        success: false,
        msg: 'Incorrect id',
      });
    }
    return res.status(200).json({
      success: true,
      msg: 'Single movie fetch successful',
      data: queriedMovie,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: 'Error occurred while fetching a movie',
    });
  }
});

export default movieRouter;
