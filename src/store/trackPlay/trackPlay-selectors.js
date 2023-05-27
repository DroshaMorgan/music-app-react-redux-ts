export const selectTracks = (state) => state.tracksAPIReducer.results[0].tracks;
export const selectTracksBcgTitle = (state) => state.tracksAPIReducer.results[0];