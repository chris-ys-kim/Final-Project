import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

function onClickFav(props) {
  // add data to database
  // call POST data
}
// function onClickCard(props) {
//   // add data to database
//   // call POST data
//   setIsOpen(!isOpen);
// }

export default function MediaCard(props) {

  const [isOpen, setIsOpen] = useState(false);
  function onClickCard(props) {
    setIsOpen(!isOpen);
  }
  const classes = useStyles();
  const movieImage = 'https://image.tmdb.org/t/p/w200' + props.movie.poster_path;
  return (
      <Card className={classes.root}>
        <CardActionArea onClick={() => onClickCard(props)}>
          <CardMedia
            className={classes.media}
            image={movieImage}
            title={props.movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.movie.title}
            </Typography>
            { isOpen &&
            <React.Fragment>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.movie.overview}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
                Popularity {props.movie.popularity}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Vote Average {props.movie.vote_average}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Air Date {props.movie.release_date}
              </Typography>
              </React.Fragment>
            }
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={() => onClickFav(props)} size="small" color="primary">
            Add To Favorites
          </Button>
          <Button size="small" color="primary">
            Add To Dislike
          </Button>
        </CardActions>
      </Card>
  );

}
