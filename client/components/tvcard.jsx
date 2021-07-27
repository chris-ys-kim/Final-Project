import React from 'react';
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

export default function TVCard(props) {
  const classes = useStyles();
  const movieImage = 'https://image.tmdb.org/t/p/w200' + props.movie.poster_path;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={movieImage}
          title={props.movie.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.movie.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.movie.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add To Favorites
        </Button>
        <Button size="small" color="primary">
          Add To Dislike
        </Button>
      </CardActions>
    </Card>
  );
}
