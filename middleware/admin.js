// TODO: refactor middleware

export default function (context) {
    if (!context.$auth.user || context.$auth.user.role !== 'admin') {
      context.redirect('/')
    }
}
