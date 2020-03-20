import { Router } from 'express';

const movieRouter = Router();
movieRouter.get('/getAll', (req, res, next) => {
  res.send('hello');
});

export default movieRouter;
