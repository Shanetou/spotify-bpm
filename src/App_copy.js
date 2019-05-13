import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import queryString from "query-string";

import { TARGET_ENERGY, TARGET_DANCEABILITY, TEMPO_OPTIONS } from "./constants";
import {
  createPlaylist,
  fetchRecommendedTracks,
  selectArtist
} from "redux/actions";
import {
  accessTokenSelector,
  recommendedTracksSelector,
  userSelector,
  selectedArtistsSelector,
  selectedTempoSelector
} from "selectors";

import { postToSpotify } from "./api/fetchFromSpotify";
import { Stepper } from "./stepper";
import {
  RecTracksStep,
  TempoSelectorStep,
  TopArtistsStep,
  PlaylistSavedStep
} from "./stepper/steps";
import { Login } from "./Login";

// this.fetchSongFeatures()

class App extends Component {
  state = {
    recGenres: []
  };

  // fetchRecGenres = () => {
  //   fetchFromSpotify(
  //     this.props.accessToken,
  //     'recommendations/available-genre-seeds',
  //     data => this.setState({ recGenres: data.genres })
  //   )
  // }

  createPlaylistWithTracks = () => {
    this.createPlaylist();
    // .then((playlist) => {
    //   const trackURIs = this.state.tracks.map(t => t.uri)

    //   this.addTracksToPlaylist(playlist.id, trackURIs)
    // })
  };

  createPlaylist = () => {
    const { createPlaylist, selectedTempo, user } = this.props;
    const tempo = TEMPO_OPTIONS[selectedTempo];
    const currentDateTime = new Date().toLocaleString();
    const data = { name: `${tempo.bpm} BPM: ${currentDateTime}` };

    createPlaylist({
      userId: user.id,
      data
    });

    // return postToSpotify(
    //   this.props.accessToken,
    //   `users/${this.props.user.id}/playlists`,
    //   data => data,
    //   { name: `Reel Jams: ${tempo.bpm} BPM` },
    // )
  };

  addTracksToPlaylist = (playlistId, trackURIs) => {
    postToSpotify(
      this.props.accessToken,
      `playlists/${playlistId}/tracks`,
      data => data,
      { uris: trackURIs }
    );
  };

  fetchRecTracksForArtists = () => {
    const {
      selectedTempo,
      selectedArtists,
      fetchRecommendedTracks
    } = this.props;
    const tempo = TEMPO_OPTIONS[selectedTempo];
    const artistsIdsList = selectedArtists.join(",");

    const queryParams = queryString.stringify({
      seed_artists: artistsIdsList,
      target_energy: TARGET_ENERGY,
      target_danceability: TARGET_DANCEABILITY,
      target_tempo: tempo.bpm
    });

    fetchRecommendedTracks(queryParams);
  };

  render() {
    const { accessToken, tracks } = this.props;

    return (
      <div className="App">
        <Grid>
          <Row>
            <Col>
              <header className="App-header">
                <h1>Spotify BPM</h1>
              </header>

              <div className="App-body">
                {!accessToken ? (
                  <Login />
                ) : (
                  <Stepper>
                    <TempoSelectorStep />
                    <TopArtistsStep
                      handleSubmitClick={this.fetchRecTracksForArtists}
                    />
                    <RecTracksStep
                      tracks={tracks}
                      handleAddClick={this.createPlaylistWithTracks}
                    />
                    <PlaylistSavedStep />
                  </Stepper>
                )}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    accessToken: accessTokenSelector(state),
    tracks: recommendedTracksSelector(state),
    selectedArtists: selectedArtistsSelector(state),
    selectedTempo: selectedTempoSelector(state),
    user: userSelector(state)
  };
};

const mapDispatchToProps = {
  createPlaylist,
  selectArtist,
  fetchRecommendedTracks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);