import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

const app = createApp();

describe('GET /api/movies', () => {
  it('lists every movie with summary fields only', async () => {
    const res = await request(app).get('/api/movies').expect(200);
    expect(res.body.list).toHaveLength(20);
    expect(Object.keys(res.body.list[0]).sort()).toEqual(
      ['genre', 'id', 'imdbRating', 'plot', 'poster', 'rated', 'title', 'year'],
    );
  });

  it('splits comma-separated genres into arrays', async () => {
    const res = await request(app).get('/api/movies').expect(200);
    expect(res.body.list[0].genre).toEqual(['Animation', 'Adventure', 'Drama', 'Family', 'Musical']);
  });
});

describe('GET /api/movies/:id', () => {
  it('returns the full movie', async () => {
    const res = await request(app).get('/api/movies/0').expect(200);
    expect(res.body.current).toMatchObject({
      id: 0,
      title: 'The Lion King',
      director: ['Roger Allers', 'Rob Minkoff'],
    });
  });

  it('rejects ids that are not non-negative integers', async () => {
    await request(app).get('/api/movies/abc').expect(400);
    await request(app).get('/api/movies/1.5').expect(400);
    await request(app).get('/api/movies/-1').expect(400);
  });

  it('returns 404 for unknown ids', async () => {
    await request(app).get('/api/movies/999').expect(404);
  });
});

describe('legacy routes', () => {
  it('redirects getAll to the new list route', async () => {
    await request(app).get('/api/movie/getAll').expect(308).expect('location', '/api/movies');
  });

  it('still serves getSingle', async () => {
    const res = await request(app).get('/api/movie/getSingle?id=5').expect(200);
    expect(res.body.current.title).toBe('Coco');
  });

  it('validates the getSingle query', async () => {
    await request(app).get('/api/movie/getSingle').expect(400);
  });
});

it('returns JSON 404 for unknown API routes', async () => {
  const res = await request(app).get('/api/nope').expect(404);
  expect(res.body.success).toBe(false);
});
