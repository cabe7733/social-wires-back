import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MessagesController {
  public async index({response }: HttpContextContract) {
    const message = await Message.all()
    console.log({...message.map((user) => user.toJSON())});


    return response.ok({...message.map((user) => user.toJSON())})

  }

  public async store({request, response}: HttpContextContract) {
    const body = request.body()

    const message = await Message.create(body)

    response.status(201)

    return {
      message: 'Se ha creado el mensaje con exito!',
      data: message,
    }
  }

  public async show({params, response}: HttpContextContract) {
    /* const iduser = params.id
    const user = await Message.findBy('idUser', iduser)
    return response.ok(user) */

    return response.ok(params)
  }

}
