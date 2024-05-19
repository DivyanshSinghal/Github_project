import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Container } from '@material-ui/core';
import RepositoryCard from './components/RepositoryCard';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import CircularProgressIndicator from './components/CircularProgressIndicator';
import NotificationSnackbar from './components/NotificationSnackbar';

const App = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    axios.get('https://api.github.com/users/visionmedia/repos')
      .then(response => {
        setRepos(response.data.slice(0, 12));
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  const handleShowMore = (index) => {
    setShowMore({ ...showMore, [index]: !showMore[index] });
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    const newRepos = [...repos];
    newRepos.splice(deleteIndex, 1);
    setRepos(newRepos);
    setDeleteIndex(null);
    setConfirmDialogOpen(false);
    setSnackbarOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteIndex(null);
    setConfirmDialogOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      {loading ? (
        <CircularProgressIndicator />
      ) : (
        <Container>
          <Grid container spacing={3}>
            {repos.map((repo, index) => (
              <RepositoryCard
                key={index}
                repo={repo}
                onDeleteClick={() => handleDeleteClick(index)}
                onShowMoreClick={() => handleShowMore(index)}
                showMore={showMore[index]}
              />
            ))}
          </Grid>
        </Container>
      )}
      <DeleteConfirmationDialog
        open={confirmDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      <NotificationSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Repo deleted successfully"
        severity="success"
      />
    </div>
  );
};

export default App;
