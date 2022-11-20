import db from '../database/index';
import { DataTypes } from 'sequelize';

const Pacientes = db.define(
        "Pacientes",
        {
        idpaciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        idade: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "pacientes",
    }
    
);

export default Pacientes;