import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({response}: HttpContextContract) {
    const user = await User.all()

    return response.ok(user)

  }

  public async store({request, response}: HttpContextContract) {
    const body = request.body()

    const users = await User.create(body)

    response.status(201)

    return {
      message: 'Se ha registrado su usuario con exito!',
      data: users,
    }

  }

  public async show({params, response}: HttpContextContract) {
    const iduser = params.id
    const user = await User.findBy('id', iduser)
    return response.ok(user)

  }
}
