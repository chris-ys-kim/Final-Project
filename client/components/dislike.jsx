import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
export default class Dislike extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dislikeMovies: [] };

    this.getDislike = this.getDislike.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.mapDislikeMovies = this.mapDislikeMovies.bind(this);
  }

  getDislike() {
    fetch('/api/movies/dislikes')
      .then(res => res.json())
      .then(dislike => {
        this.setState({ dislikeMovies: dislike });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  deleteMovie(dislikeID) {
    const data = {};
    data.dislikeID = dislikeID;

    fetch('/api/movies/dislikes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(result => {
        this.getDislike();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  mapDislikeMovies() {
    const movies = this.state.dislikeMovies;
    const movieList = movies.map(movie =>
      <Card key={ movie.dislikeID } className="root">
        <CardMedia
          className="media"
          image={ movie.posterUrl }
          title={ movie.title }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { movie.title }
          </Typography>
          <Typography onClick={ () => this.deleteMovie(movie.dislikeID) } className="delete-button" variant="body2" component="p">
              Delete
            </Typography>
        </CardContent>
      </Card>
    );

    return movieList;
  }



  render(){
  return (
    <>
      { this.mapDislikeMovies() }
    </>
    );
  }
}
