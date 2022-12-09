import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const body = request.body()

    const moment = await User.create(body)

    response.status(201)

    return {
      message: 'Se ha registrado su usuario con exito!',
      data: moment,
    }

  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
