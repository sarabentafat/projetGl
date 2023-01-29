import ActionsTypes from "./ActionsTypes";

const Reducer = (
  state,
  action //depending on the action.stype he will return a defferent state
) => {
  switch (action.type) {
    case ActionsTypes.LOGIN_START:
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case ActionsTypes.LOGIN_SUCESS:
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case ActionsTypes.LOGIN_FAILURE:
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case ActionsTypes.UPDATE_START:
      return {
        ...state,
        isFetching: true,
      };
    case ActionsTypes.UPDATE_SUCCESS:
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case ActionsTypes.UPDATE_FAILURE:
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };
    case ActionsTypes.LOGOUT:
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};
export default Reducer;
