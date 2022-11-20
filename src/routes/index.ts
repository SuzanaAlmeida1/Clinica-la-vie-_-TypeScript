import express from 'express'
const routes = express.Router()

import authController from '../controller/authController'
import atendimentoController from '../controller/atendimentoController'
import dashboardController from '../controller/dashboardController'
import psicologoController from '../controller/psicologoController'
import pacienteController from '../controller/pacienteController'
import authCadastroPsicologo from '../validations/auth/cadastroPsi'
import authLogin from '../validations/auth/login'
import auth from '../middlewares/auth'

routes.get('/atendimentos', atendimentoController.listarAtendimento)
routes.get('/atendimentos/:id', atendimentoController.listarAtendimentoPorID)
routes.post('/atendimentos', auth, atendimentoController.cadastrarAtendimento)

routes.post(
  '/psicologos',
  authCadastroPsicologo,
  psicologoController.cadastrarPsicologo
)
routes.get('/psicologos', psicologoController.listarPsicologos)
routes.get('/psicologos/:id', psicologoController.listarPsicologosPorID)
routes.put('/psicologos/:id', psicologoController.atualizarPsicologo)
routes.delete('/psicologos/:id', psicologoController.removerPsicologo)

routes.post('/pacientes', pacienteController.cadastrarPaciente)
routes.get('/pacientes', pacienteController.listarPacientes)
routes.get('/pacientes/:id', pacienteController.listarPacientesPorID)
routes.put('/pacientes/:id', pacienteController.atualizarPacientes)
routes.delete('/pacientes/:id', pacienteController.removerPacientes)

routes.get(
  '/dashboard/numero-atendimento',
  dashboardController.numeroAtendimentos
)
routes.get('/dashboard/numero-paciente', dashboardController.numeroPacientes)
routes.get('/dashboard/numero-psicologo', dashboardController.numeroPsicologos)
routes.get('/dashboard/media-psicolog', dashboardController.mediaPorPsicologo)

routes.post('/login', authLogin, authController.login)

export default routes
