import React from 'react';
import { useSelector } from 'react-redux';

import { ArtistResults } from './ArtistResults';
import { categorySelector } from '../selectors';
import { CATEGORIES } from '../constants';
import { GenreResults } from './GenreResults';

export const SearchResults = () => {
  const category = useSelector(categorySelector);

  if (category.value === CATEGORIES.ARTIST.value) {
    return <ArtistResults />;
  }

  if (category.value === CATEGORIES.GENRE.value) {
    return <GenreResults />;
  }

  if (category.value === CATEGORIES.FAV_ARTISTS.value) {
    return 'Fav Artists';
  }

  throw new Error('Unrecognized category');
};
