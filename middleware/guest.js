export default function (context) {
  if (context.$auth.loggedIn && context.$auth.user) {
    if (context.$auth.user.verified === true) {
      context.redirect("/");
    }
  }
}
