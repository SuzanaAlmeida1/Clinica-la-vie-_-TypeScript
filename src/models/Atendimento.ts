import db from '../database/index';
import { DataTypes } from 'sequelize';
import Psicologos from '../models/Psicologos';
import Pacientes from '../models/Pacientes';

const Atendimento = db.define(
        "Atendimento",
        {
        idatendimento: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        data_atendimento: {
            type: DataTypes.DATE,
        },
        observacao: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        id_psicologo: {
            type: DataTypes.INTEGER,
            references: {
                model: Psicologos,
                key: "idpsicologo",
            },
        },
        id_paciente: {
            type: DataTypes.INTEGER,
            references: {
                model: Pacientes,
                key: "idpaciente",
            },
        }
    },
    {
        tableName: "atendimento",
    }

);

 export default Atendimento;