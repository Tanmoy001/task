import {
    GENERATE_SUMMARY_REQUEST,
    GENERATE_SUMMARY_SUCCESS,
    GENERATE_SUMMARY_FAILURE,

  } from '../actionTypes';
  
  const initialState = {
    summary: null,
    history: [],
    loading: false,
    error: null,
  };
  
  const summaryReducer = (state = initialState, action) => {
    switch (action.type) {
      case GENERATE_SUMMARY_REQUEST:

        return { ...state, loading: true, error: null };
      
        case GENERATE_SUMMARY_SUCCESS:
        return { ...state, loading: false, summary: action.payload, error: null };
      


      case GENERATE_SUMMARY_FAILURE:

          return { ...state, loading: false, error: action.payload };
        default:
          return state;
      }
  };
  
  export default summaryReducer;