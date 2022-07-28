export default {
  getCurrentUserDetails(state) {
    console.log("state", state);
    return state.user;
  },
};
