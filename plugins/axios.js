export default function (context) {
  context.$axios.onRequest( (config) => {

    if (context.$auth.loggedIn) {
      config.headers.common['Authorization'] = `Bearer ${context.$auth.strategy.token.get()}`
    }
  });
}
