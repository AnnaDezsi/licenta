import { REMOVE_AUTH_PROFILE, SET_AUTH_PROFILE } from "./action";

const initialState = {
    email: "",
    firstName: "",
    lastName: ""
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case  SET_AUTH_PROFILE:
        return action.payload;
      case REMOVE_AUTH_PROFILE:
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;
  