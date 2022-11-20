import db from '../database/index'
import { DataTypes } from 'sequelize'

const Psicologos = db.define(
  'Psicologos',
  {
    idpsicologo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    senha: {
      type: DataTypes.STRING
    },
    apresentacao: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  },
  {
    tableName: 'psicologos'
  }
)

export default Psicologos
