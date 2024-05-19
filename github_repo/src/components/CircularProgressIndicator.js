// CircularProgressIndicator.js
import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  circularProgressContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  circularProgressText: {
    marginTop: 10,
  },
});

const CircularProgressIndicator = () => {
  const classes = useStyles();

  return (
    <div className={classes.circularProgressContainer}>
      <CircularProgress />
      <Typography variant="body1" className={classes.circularProgressText}>
        Please wait...
      </Typography>
    </div>
  );
};

export default CircularProgressIndicator;
