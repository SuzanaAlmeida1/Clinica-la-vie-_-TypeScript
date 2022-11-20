import {Psicologos} from '../models'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'

const psicologoController = {
  async cadastrarPsicologo(req: Request, res: Response) {
    const { nome, email, senha, apresentacao } = req.body
    const bcryptSenha = bcrypt.hashSync(senha, 10)

    const novoPsicologo = await Psicologos.create({
      nome: nome,
      email: email,
      senha: bcryptSenha,
      apresentacao: apresentacao
    })

    res.status(201).json(novoPsicologo)
  },

  async listarPsicologos(req: Request, res: Response) {
    const listaDePsi = await Psicologos.findAll()
    res.status(200).json(listaDePsi)
  },

  async listarPsicologosPorID(req: Request, res: Response) {
    const resposta = await psicologoController.localizaIdPsicologo(
      req.params.id
    )

    if (resposta === false) {
      return res.status(404).json('Id não encontrado')
    }

    res.status(201).json(teste)
  },

  async atualizarPsicologo(req: Request, res: Response) {
    const id = req.params.id
    const { nome, email, senha, apresentacao } = req.body
    const bcryptSenha = bcrypt.hashSync(senha, 10)

    const resposta = await psicologoController.localizaIdPsicologo(id)
    if (resposta === false) {
      return res.status(404).json('Id não encontrado')
    }

    const status = await Psicologos.update(
      {
        nome: nome,
        email: email,
        senha: bcryptSenha,
        apresentacao: apresentacao
      },
      {
        where: {
          idpsicologo: id
        }
      }
    )
    if (!status) {
      return res.status(400).json(error)
    }
    res.status(200).json('Atualizado com sucesso!')
  },

  async removerPsicologo(req: Request, res: Response) {
    const id = req.params.id
    const resposta = await psicologoController.localizaIdPsicologo(id)
    if (resposta === false) {
      return res.status(404).json('Id não encontrado')
    }
    const status = await Psicologos.destroy({
      where: {
        idpsicologo: id
      }
    })
    if (!status) {
      return res.status(400).json(error)
    }
    res.status(204).json('Removido com sucesso!')
  },

  localizaIdPsicologo: async id => {
    const localizaIdPsi = await Psicologos.findByPk(id)
    return localizaIdPsi !== null ? localizaIdPsi : false
  }
}

export default psicologoController;
