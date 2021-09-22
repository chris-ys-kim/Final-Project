import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoriteMovies: [] };

    this.getFavorite = this.getFavorite.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.mapFavoriteMovies = this.mapFavoriteMovies.bind(this);
  }

  getFavorite() {
    fetch('/api/movies/favorites')
      .then(res => res.json())
      .then(favorites => {
        this.setState({ favoriteMovies: favorites });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  deleteMovie(favoriteID) {
    const data = {};
    data.favoriteID = favoriteID;

    fetch('/api/movies/favorites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(result => {
        this.getFavorite();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  mapFavoriteMovies() {
    const movies = this.state.favoriteMovies;
    const movieList = movies.map(movie =>
      <Card key={ movie.favoriteID } className="root">
        <CardMedia
          className="media"
          image={ movie.posterUrl }
          title={ movie.title }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { movie.title }
          </Typography>
          <Typography onClick={ () => this.deleteMovie(movie.favoriteID) } className="delete-button" variant="body2" component="p">
              Delete
            </Typography>
        </CardContent>
      </Card>
    );

    return movieList;
  }

  componentDidMount() {
    this.getFavorite();
  }

  render() {
    return (
      <>
        { this.mapFavoriteMovies() }
      </>
    );
  }
}
