import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import ArtistChip from "./ArtistChip";
import { GenreChip } from "./GenreChip";
import { selectRecommendationSeed } from "../redux/actions";
import { isArtistSeed, isGenreSeed } from "../redux/reducers/helpers";
import { PlaceholderText } from "./PlaceholderText";

const useStylesSelection = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0, 0.5)
  }
}));

const Selection = ({ onDeleteClick, seed }) => {
  const classes = useStylesSelection();
  let isArtist = isArtistSeed(seed);
  let isGenre = isGenreSeed(seed);

  if (isArtist) {
    return (
      <ArtistChip
        avatar={null}
        artist={seed}
        handleDelete={onDeleteClick(seed)}
        className={classes.chip}
      />
    );
  } else if (isGenre) {
    return (
      <GenreChip
        avatar={null}
        genre={seed}
        handleDelete={onDeleteClick(seed)}
        className={classes.chip}
      />
    );
  } else {
    throw new Error("Selected seed item of unknown type");
  }
};

const useStylesSelections = makeStyles(theme => ({
  container: {
    height: theme.spacing(4)
  }
}));

export const Selections = props => {
  const classes = useStylesSelections();
  const dispatch = useDispatch();
  const { selectedSeeds } = useSelector(state => {
    return {
      selectedSeeds: state.recommendations.recommendationSeeds
    };
  });

  const removeChip = item => () => {
    dispatch(selectRecommendationSeed(item));
  };

  return (
    <div className={classes.container}>
      {selectedSeeds.length > 0 ? (
        selectedSeeds.map(seed => {
          return (
            <Selection key={seed.name} seed={seed} onDeleteClick={removeChip} />
          );
        })
      ) : (
        <PlaceholderText>
          Select an artist or genre to see recommended tracks
        </PlaceholderText>
      )}
    </div>
  );
};
