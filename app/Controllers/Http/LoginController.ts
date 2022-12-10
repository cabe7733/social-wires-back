import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class LoginController {
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    console.log(email, password);


    try {
      const infoUser={
        'token': await auth.use('api').attempt(email, password),
        'user':await User.findBy('email', email),
      }
      return infoUser
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }


  public async logout({ auth }) {

    await auth.use('api').revoke()
    auth.use('api').isLoggedIn
    return {
      revoked: true,
      isLoggedIn:auth.use('api').isLoggedIn,
      isLoggedOut:auth.use('api').isLoggedOut
    }
  }

}
