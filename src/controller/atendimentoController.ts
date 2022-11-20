import Atendimento from '../models/Atendimento'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express';

export const atendimentoController = {
  async cadastrarAtendimento(req: Request, res: Response) {
    const { id_paciente, data_atendimento, observacao } = req.body
    const auth = req.headers.authorization
    const token = auth.substr(7, auth.length - 1)
    const user = jwt.decode(token)

    const novoAtendimento = await Atendimento.create({
      data_atendimento: data_atendimento,
      observacao: observacao,
      id_psicologo: user.idpsicologo,
      id_paciente: id_paciente
    })

    res.status(201).json(novoAtendimento)
  },

  async listarAtendimento(req: Request, res: Response) {
    const listaDeAtendimento = await Atendimento.findAll(
      {
        include: { association: 'psicologos' }
      },
      {
        include: { association: 'pacientes' }
      }
    )
    res.status(200).json(listaDeAtendimento)
  },

  async listarAtendimentoPorID(req: Request, res: Response) {
    const idatendimento = req.params.id
    const resposta = await atendimentoController.localizaIdatendimento(
      idatendimento
    )
    if (resposta === false) {
      res.status(404).json('Id não encontrado')
    } else {
      res.status(201).json(resposta)
    }
  },

  localizaIdatendimento: async idatendimento => {
    const localizaAtendimento = await Atendimento.findByPk(idatendimento, {
      include: { association: 'psicologos' }
    })
    return localizaAtendimento !== null ? localizaAtendimento : false
  }
};


