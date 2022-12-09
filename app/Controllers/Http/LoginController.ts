import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = {
        dataUser:email,
        log:await auth.use('api').attempt(email, password, {
          expiresIn: '120 mins'
        }),
        session:auth.use('api').isLoggedIn
      }
      return token
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
