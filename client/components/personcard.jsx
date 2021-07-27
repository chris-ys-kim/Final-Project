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

export default function PersonCard(props) {
  const classes = useStyles();
  const personImage = 'https://image.tmdb.org/t/p/w200' + props.person.profile_path;
  return (
    <Card className={classes.root}>
      <CardActionArea >
        <CardMedia
          className={classes.media}
          image={personImage}
          title={props.person.name}
        />
        <CardContent>
          <React.Fragment>
          <Typography gutterBottom variant="h5" component="h2">
            {props.person.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.person.popularity}
          </Typography>
          </React.Fragment>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
