import { Router } from 'express';
import movieData from '../utils/convertData';
import Movie from '../interfaces/movie';

const movieRouter = Router();

movieRouter.get('/getAll', (req, res) => {
  // Keys needed for the list view
  const listKeys = ['id', 'title', 'poster'];

  const listData = movieData.map((movie: Movie) => Object.keys(movie)
    .filter((key) => listKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = movie[key];
      return obj;
    }, {}));

  res.json(listData);
});


movieRouter.get('/getSingle', (req, res) => {
  const { id } = req.query;
  const queriedMovie = movieData.find((asd: Movie) => asd.id === parseInt(id));
  if (queriedMovie) res.json(queriedMovie);
  else res.json({ success: 'false', message: 'id not found' });
});

export default movieRouter;
