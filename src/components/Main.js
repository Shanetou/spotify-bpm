import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';

import { SearchOrFilter } from './SearchOrFilter';
import { ArtistResults } from './ArtistResults';
import { SearchResults } from './SearchResults';
import { TrackResults } from './TrackResults';
import { Selections } from './Selections';
import { CategoryButtons } from './CategoryButtons';
import { Attributes } from './Attributes';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const Main = props => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <SearchOrFilter />
        </Grid>
        <Grid item xs={6}>
          {/* <GenreSearch /> */}
          <CategoryButtons />
        </Grid>
      </Grid>

      <div className={classes.root}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Paper className={classes.paper} sm={6}>
              <SearchResults />
            </Paper>
          </Grid>
          <Selections />
          <Grid item xs={8}>
            <Paper className={classes.paper} sm={6}>
              <TrackResults />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper} sm={6}>
              {/* <Attributes /> */}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Main;
