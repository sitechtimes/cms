export default function (context) {
  context.$axios.onRequest( (config) => {

    if (context.$auth.strategy.token.get()) {
      config.headers.common['Authorization'] = `Bearer ${context.$auth.strategy.token.get()}`
    }
  });
}
