import { Router, type Response } from 'express';
import { movies, toSummary } from '../movies.js';

const movieRouter = Router();

const sendMovie = (res: Response, id: unknown) => {
  if (typeof id !== 'string' || !/^\d+$/.test(id)) {
    return res.status(400).json({ success: false, msg: 'Id must be a non-negative integer' });
  }
  const movie = movies.find((m) => m.id === Number(id));
  if (!movie) {
    return res.status(404).json({ success: false, msg: 'Id does not exist' });
  }
  return res.json({ success: true, msg: 'Single movie fetch successful', current: movie });
};

// @route   GET api/movies
// @desc    Get a list of available movies
movieRouter.get('/movies', (_req, res) => {
  res.json({ success: true, msg: 'Movie list fetch successful', list: movies.map(toSummary) });
});

// @route   GET api/movies/:id
// @desc    Get data of a movie
movieRouter.get('/movies/:id', (req, res) => sendMovie(res, req.params.id));

// Legacy routes from v1, kept so old clients keep working
movieRouter.get('/movie/getAll', (_req, res) => res.redirect(308, '/api/movies'));
movieRouter.get('/movie/getSingle', (req, res) => sendMovie(res, req.query.id));

export default movieRouter;
