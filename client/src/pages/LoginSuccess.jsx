import React from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ActionsTypes from "../context/ActionsTypes";
import ENDPOINTS from "../api/endPoints";
import axios from "../api/Axios";
import { Context } from "../context/Context.js";
import suscess from "../assets/s.png"

function LoginSuccess() {
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);
  useEffect(() => {
    const getProfile = async () => {
      dispatch({ type: ActionsTypes.LOGIN_START });
      try {
        const response = await axios.get(ENDPOINTS.PROFILE);
        if (response.data) {
          dispatch({
            type: ActionsTypes.LOGIN_SUCESS,
            payload: response.data,
          });
          navigate("/home", { replace: true });
        }
      } catch (err) {
        console.log(err);
        dispatch({ type: ActionsTypes.LOGIN_FAILURE });
      }
    };

    setTimeout(() => {
      getProfile();
    }, 3000);
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div> <img src={suscess} alt="sucess" className="w-[60%] h-[60%]" />
      <h1 className="font-bold text-center text-2xl">LoginSuccess</h1></div>
    </div>
  );
}

export default LoginSuccess;
