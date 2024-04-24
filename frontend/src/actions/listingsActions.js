import axios from "axios";
import {
  LISTINGS_REQUEST,
  LISTINGS_SUCCESS,
  LISTINGS_FAIL,
  LISTING_REQUEST,
  LISTING_SUCCESS,
  LISTING_FAIL,
} from "../constants/listingsConstants";

export const fetchListings = () => async (dispatch) => {
  try {
    dispatch({ type: LISTINGS_REQUEST });
    const response = await fetch("api/listings/");
    const data = await response.json();

    dispatch({
      type: LISTINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTINGS_FAIL,
      payload: error.message,
    });
  }
};

export const fetchListing = (pk) => async (dispatch) => {
  try {
    dispatch({ type: LISTING_REQUEST });
    const response = await fetch(`api/listings/${pk}/`);
    const data = await response.json();

    dispatch({
      type: LISTING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_FAIL,
      payload: error.message,
    });
  }
};
