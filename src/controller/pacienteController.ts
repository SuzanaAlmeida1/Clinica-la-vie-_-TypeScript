import { Request, Response } from 'express';
import {Pacientes} from '../models';

const pacienteController = {
  async cadastrarPaciente(req: Request, res:Response) {
    const { nome, email, idade } = req.body

    const novoPaciente = await Pacientes.create({
      nome: nome,
      email: email,
      idade: idade
    })
    if (!novoPaciente) {
      return res.status(400).json(error)
    }
    res.status(201).json(novoPaciente)
  },

  async listarPacientes(req: Request, res: Response) {
    const listaDePacientes = await Pacientes.findAll()
    res.status(200).json(listaDePacientes)
  },

  async listarPacientesPorID(req:Request, res: Response) {
    const resposta = await pacienteController.localizaIdPaciente(req.params.id)

    if (resposta === false) {
      return res.status(404).json('Id não encontrado')
    }
    res.status(201).json(resposta)
  },

  async atualizarPacientes(req: Request, res: Response) {
    const id = req.params.id
    const { nome, email, idade } = req.body

    const resposta = await pacienteController.localizaIdPaciente(id)
    if (resposta === false) {
      return res.status(404).json('Id não encontrado')
    }

    const status = await Pacientes.update(
      {
        nome: nome,
        email: email,
        idade: idade
      },
      {
        where: {
          idpaciente: id
        }
      }
    )
    if (!status) {
      return res.status(400).json(error)
    }
    res.status(200).json('Atualizado com sucesso!')
  },

  async removerPacientes(req: Request, res: Response) {
    const id = req.params.id
    const resposta = await pacienteController.localizaIdPaciente(id)
    if (resposta === false) {
      return res.status(404).json('Id não encontrado')
    }

    const status = await Pacientes.destroy({
      where: {
        idpaciente: id
      }
    })
    if (!status) {
      return res.status(400).json(error)
    }
    res.status(204).json('Removido com sucesso!')
  },

  localizaIdPaciente: async (id) => {
    const localizaIdPaciente = await Pacientes.findByPk(id)
    return localizaIdPaciente !== null ? localizaIdPaciente : false
  }
}

export default pacienteController
