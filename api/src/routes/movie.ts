import { Router } from 'express';
import movieData from '../utils/convertData';

const movieRouter = Router();

movieRouter.get('/getAll', (req, res) => {
  // Keys needed for the list view
  const listKeys = ['id', 'title', 'poster'];

  const listData = movieData.map((movie) => Object.keys(movie)
    .filter((key) => listKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = movie[key];
      return obj;
    }, {}));

  res.json(listData);
});

export default movieRouter;
