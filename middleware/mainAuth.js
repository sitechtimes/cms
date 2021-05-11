export default function (context) {
  if (!context.$auth.user){
    context.redirect('/auth/signup')
  }
  else if(!context.$auth.user.verified){
    context.redirect('/auth/verify')
  }
}

