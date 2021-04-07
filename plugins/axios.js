// export default function (context, { store }) {
//   context.$axios.onRequest( (config) => {
//
//     console.log(context.$auth.loggedIn);
//     if (context.$auth.loggedIn) {
//       console.log("inside")
//     //   console.log(context.$auth.strategy.token.get())
//       config.headers.common['Authorization'] = `Bearer ${context.$auth.strategy.token.get()}`
//     }
//   });
// }
