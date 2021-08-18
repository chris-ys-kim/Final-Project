require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const app = express();
const ClientError = require('./client-error');

const db = new pg.Pool({ // eslint-disable-line
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/movies/favorites', (req, res, next) => {
  const sql = `
  select "favoriteID", "posterUrl", "title"
  from "favorites"
  `;

  db.query(sql)
    .then(result => {
      const favorites = result.rows;
      res.json(favorites);
    })
    .catch(err => next(err));
});

app.post('/api/movies/favorites', (req, res, next) => {
  const sql = `
    insert into "favorites" ("userID", "posterUrl", "title")
    values (1, $1, $2)
    returning *
  `;

  const { poster_path, title, name } = req.body;
  const posterUrl = 'https://image.tmdb.org/t/p/w200' + poster_path;

  let params;
  if(title === undefined) {
    params = [posterUrl, name];
  } else {
    params = [posterUrl, title]
  }


  db.query(sql, params)
    .then(result => {
      const [newMovie] = result.rows;
      res.status(201).json(newMovie);
    })
    .catch(err => next(err));
});

app.delete('/api/movies/favorites', (req, res, next) => {
  const { favoriteID } = req.body;
  const sql = `
    delete from "favorites"
    where "favoriteID" = $1
    returning *
  `;

  const params = [favoriteID];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.get('/api/movies/dislikes', (req, res, next) => {
  const sql = `
  select "dislikeID", "posterUrl", "title"
  from "dislikes"
  `;

  db.query(sql)
    .then(result => {
      const dislike = result.rows;
      res.json(dislike);
    })
    .catch(err => next(err));
});

app.post('/api/movies/dislikes', (req, res, next) => {
  const sql = `
    insert into "dislikes" ("userID", "posterUrl", "title")
    values (1, $1, $2)
    returning *
  `;

  const { poster_path, title, name} = req.body;
  const posterUrl = 'https://image.tmdb.org/t/p/w200' + poster_path;
  let params;
  if(title === undefined) {
    params = [posterUrl, name];
  } else {
    params = [posterUrl, title]
  }


  db.query(sql, params)
    .then(result => {
      const [newMovie] = result.rows;
      res.status(201).json(newMovie);
    })
    .catch(err => next(err));
});

app.delete('/api/movies/dislikes', (req, res, next) => {
  const { dislikeID } = req.body;
  const sql = `
    delete from "dislikes"
    where "dislikeID" = $1
    returning *
  `;

  const params = [dislikeID];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
