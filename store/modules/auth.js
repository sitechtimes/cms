const state = {
  token: null
};

const getters = {
  isSignedIn: (state) => !!state.token
};

const actions = {
  signUp: () => {
    console.log("Signup");
  }
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
}
export default {  state, getters, actions, mutations, namespaced: true };
