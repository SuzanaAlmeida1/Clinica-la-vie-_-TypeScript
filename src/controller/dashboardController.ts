import { Request } from 'express';
import { Psicologos, Atendimento, Pacientes } from '../models/index';

export const dashboardController = {
  async numeroPacientes(req: Request, res: Request) {
    const { count } = await Pacientes.findAndCountAll()

    return res.status(201).send(count)
  },

  async numeroAtendimentos(req: Request, res: Response) {
    const { count } = await Atendimento.findAndCountAll()

    return res.status(201).send(count)
  },
  async numeroPsicologos(req: Request, res: Response) {
    const { count } = await Psicologos.findAndCountAll()

    return res.status(201).send(count)
  },
  async mediaPorPsicologo(req, res) {
    const { count: quantAtendimentos } = await Atendimento.findAndCountAll()

    const { count: quantPsicologos } = await Psicologos.findAndCountAll()

    res.status(201).send(quantAtendimentos / quantPsicologos)
  }
};


