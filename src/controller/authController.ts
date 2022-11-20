import {Psicologos} from '../models/index'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import secret from '../middlewares/secret'
import { Request } from 'express'

const authController = {
  async login(req: Request, res: Response) {
    const { email, senha } = req.body

    const user = await Psicologos.findOne({
      where: {
        email
      }
    })

    if (!user) {
      res
        .status(401)
        .json('E-mail ou senha inválido, verifique e tente novamente')
    } else if (!bcrypt.compareSync(senha, user.senha)) {
      res
        .status(401)
        .json('E-mail ou senha inválido, verifique e tente novamente')
    } else {
      const token = jwt.sign(
        {
          idpsicologo: user.idpsicologo,
          nome: user.nome,
          email: user.email
        },
        secret.key
      )
      console.log(user.idpsicologo, user.nome, token)
      return res.status(200).json(token)
    }
  }
}

export default authController
