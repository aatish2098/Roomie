import axios from "axios";
import { getState } from "react";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
  USER_GET_PETS_REQUEST,
  USER_GET_PETS_SUCCESS,
  USER_GET_PETS_FAIL,
  USER_ADD_PET_REQUEST,
  USER_ADD_PET_SUCCESS,
  USER_ADD_PET_FAIL,
  USER_EDIT_PET_REQUEST,
  USER_EDIT_PET_SUCCESS,
  USER_EDIT_PET_FAIL,
  USER_DELETE_PET_REQUEST,
  USER_DELETE_PET_SUCCESS,
  USER_DELETE_PET_FAIL,
  USER_FAV_REQUEST,
  USER_FAV_SUCCESS,
  USER_FAV_FAIL,
  USER_GET_FAVS_REQUEST,
  USER_GET_FAVS_SUCCESS,
  USER_GET_FAVS_FAIL,
  USER_CHECK_FAV_REQUEST,
  USER_CHECK_FAV_SUCCESS,
  USER_CHECK_FAV_FAIL,
  USER_DEL_FAV_REQUEST,
  USER_DEL_FAV_SUCCESS,
  USER_DEL_FAV_FAIL,
  USER_POST_INT_REQUEST,
  USER_POST_INT_SUCCESS,
  USER_POST_INT_FAIL,
} from "../constants/userConstants";

// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export const signup =
  (username, fname, lname, email, password, password2, dob, gender, phone) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_SIGNUP_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://127.0.0.1:8000/register/",
        {
          username: username,
          first_name: fname,
          last_name: lname,
          email: email,
          phone: phone,
          password: password,
          password2: password2,
          dob: dob,
          gender: gender,
        },
        config
      );

      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
      });
    }
  };

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("Function working");
    const { data } = await axios.post(
      "http://127.0.0.1:8000/login/",
      {
        username: username,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const getPets = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_GET_PETS_REQUEST,
    });

    const { data } = await axios.get(
      `http://127.0.0.1:8000/${username}/getPets`
    );

    dispatch({
      type: USER_GET_PETS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_GET_PETS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addPet =
  (username, petName, petType, petSize) => async (dispatch) => {
    try {
      dispatch({
        type: USER_ADD_PET_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(username, petName, petType, petSize);
      const { data } = await axios.post(
        `http://127.0.0.1:8000/${username}/addPet/`,
        {
          username: username,
          petName: petName,
          petType: petType,
          petSize: petSize,
        },
        config
      );

      dispatch({
        type: USER_ADD_PET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADD_PET_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// Implement the updateProfile action
export const editPet =
  (username, petName, petType, petSize, oldPetName, oldPetType) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_EDIT_PET_REQUEST,
      });
      // const {
      //   userLogin: { userInfo },
      // } = getState(); // Assuming you store logged-in user info in state
      console.log([username, petName, petType, petSize]);
      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.token}`, // Assuming your backend uses token-based auth
        },
      };
      console.log(username, petName, petType, petSize, oldPetName, oldPetType);
      const { data } = await axios.post(
        `http://127.0.0.1:8000/${username}/editPet/`,
        {
          username: username,
          petName: petName,
          petType: petType,
          petSize: petSize,
          oldPetName: oldPetName,
          oldPetType: oldPetType,
        },
        config
      );
      dispatch({
        type: USER_EDIT_PET_SUCCESS,
        payload: data,
      });

      // Optionally update user info in local state if profile update affects user info
    } catch (error) {
      dispatch({
        type: USER_EDIT_PET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deletePet = (username, petName, petType) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_PET_REQUEST });
    console.log(username);
    console.log(petName);
    console.log(petType);
    const { data } = await axios.delete(
      `http://127.0.0.1:8000/${username}/${petName}/${petType}/`
    );

    dispatch({
      type: USER_DELETE_PET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_PET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addFav = (username, unitRentID) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FAV_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(username, unitRentID);
    const { data } = await axios.post(
      `http://127.0.0.1:8000/addFavourite/`,
      {
        username: username,
        unitRentID: unitRentID,
      },
      config
    );

    dispatch({
      type: USER_FAV_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_FAV_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getFavs = (username) => async (dispatch) => {
  try {
    dispatch({
      type: USER_GET_FAVS_REQUEST,
    });

    // console.log(username);
    const { data } = await axios.get(
      `http://127.0.0.1:8000/${username}/getFavourites/`
    );

    dispatch({
      type: USER_GET_FAVS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_GET_FAVS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const checkFav = (username, unitRentID) => async (dispatch) => {
  try {
    dispatch({
      type: USER_CHECK_FAV_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(username);
    const { data } = await axios.post(
      `http://127.0.0.1:8000/checkFav/`,
      {
        username: username,
        unitRentID: unitRentID,
      },
      config
    );

    dispatch({
      type: USER_CHECK_FAV_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_CHECK_FAV_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const delFav = (username, unitRentID) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DEL_FAV_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(username);
    const { data } = await axios.post(
      `http://127.0.0.1:8000/delFavourite/`,
      {
        username: username,
        unitRentID: unitRentID,
      },
      config
    );

    dispatch({
      type: USER_DEL_FAV_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DEL_FAV_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const postInterest =
  (username, unitRentID, roommateCount, MoveInDate) => async (dispatch) => {
    try {
      dispatch({
        type: USER_POST_INT_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log(username, unitRentID, roommateCount, MoveInDate);

      const { data } = await axios.post(
        "http://127.0.0.1:8000/interests/",
        {
          username: username,
          unitRentID: unitRentID,
          roommateCount: roommateCount,
          MoveInDate: MoveInDate,
        },
        config
      );

      dispatch({
        type: USER_POST_INT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_POST_INT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
