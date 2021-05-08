export default function (context) {
  console.log(context.$auth.user)
  if (!context.$auth.loggedIn){
    context.redirect('/auth/signup')
  }
  else if(context.$auth.user.verified !== true){
    context.redirect('/auth/verify')
  }
}

