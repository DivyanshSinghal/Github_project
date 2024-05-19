import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 'auto',
  },
  media: {
    height: 135,
  },
  boldText: {
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 'auto',
    marginBottom: 3,
    height: 15,
  },
});

const RepositoryCard = ({ repo, onDeleteClick, onShowMoreClick, showMore }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={repo.owner.avatar_url}
          title="Owner Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {repo.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {repo.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <span className={classes.boldText}>Created:</span> {new Date(repo.created_at).toDateString()}
          </Typography>
          {showMore && (
            <div>
              <Typography variant="body2" color="textSecondary" component="p">
                <span className={classes.boldText}>Watchers:</span> {repo.watchers}{' '}
                <span className={classes.boldText}>Forks:</span> {repo.forks}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <span className={classes.boldText}>Language:</span> {repo.language}
              </Typography>
            </div>
          )}
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={onShowMoreClick}>
            {showMore ? 'Hide' : 'Show More'}
            {showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
          <Button size="small" color="secondary" onClick={onDeleteClick}>
            Delete <DeleteIcon className={classes.icon} />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default RepositoryCard;
