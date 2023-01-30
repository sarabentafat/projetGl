import ENDPOINTS from "./endPoints";
import axios from "../api/Axios";
const addToFav = async (annonce_id) => {
  try {
    const response = await axios.post(ENDPOINTS.FAVORITES + annonce_id);
    if (response.data) {
      window.alert("Added Succ To Fav");
    }
  } catch (err) {
    console.log(err);
  }
};

const removeFromFav = async (favId) => {
  try {
    const response = await axios.delete(ENDPOINTS.FAVORITES + favId);
    if (response.data) {
      window.alert("removed succ from Fav");
    }
  } catch (err) {
    console.log(err);
  }
};

const addComment = async (annonce_id, comment) => {
  try {
    const response = await axios.post(
      ENDPOINTS.ANNONCES + annonce_id + ENDPOINTS.COMMENTS,
      {
        text: comment,
      }
    );
    if (response.data) {
      window.alert("Comment added succ");
    }
  } catch (err) {
    console.log(err);
  }
};

export default {
  addToFav,
  removeFromFav,
  addComment,
};
