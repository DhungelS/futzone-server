const initialState = {
  highlightVidURL: [],
  thumbnails: [],
  highlightVids: []
};

export default function(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case 'GET_HIGHLIGHTS_SUCCESS':
      return {
        ...state,
        highlightVids: action.payload
      };
    default:
      return state;
  }
}
